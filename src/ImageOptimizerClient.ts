import querystring from 'querystring';
import request, { Response } from 'request';
import validUrl from 'valid-url';
import { ImageWithFileName } from './Image/ImageWithFileName';
import { ImageOptimizerClientException } from './ImageOptimizerClientException';
import { ImageOptimizerResult } from './ImageOptimizerResult';
import { IOptimizationRequest, OptimizationRequest } from './OptimizationRequest/IOptimizationRequest';
import { OptimizationRequestValidator } from './OptimizationRequest/OptimizationRequestValidator';

export class ImageOptimizerClient {
  public static readonly IMAGE_POST_FIELD_NAME = 'image';
  public static readonly API_KEY_PARAM_NAME = 'api-key';
  public static readonly DEFAULT_ENDPOINT = 'https://image-optimizer.tinyga.com/api/v1/';
  public static readonly API_METHOD_OPTIMIZE_IMAGE = 'optimize?XDEBUG_SESSION_START=PHPSTORM';
  public static readonly API_RESPONSE_HEADER_TASK_ID = 'task-id'; // response headers are lower case

  protected apiEndpointUrl: string = ImageOptimizerClient.DEFAULT_ENDPOINT;
  protected apiKey?: string;

  constructor(apiKey?: string, apiEndpoint?: string) {
    if (apiKey != null) {
      this.setApiKey(apiKey);
    }
    if (apiEndpoint != null) {
      this.setApiEndpointUrl(apiEndpoint);
    }
  }

  public getApiEndpointUrl(apiMethod: string = '', withParameters: any = {}): string {
    let url = this.apiEndpointUrl;
    if (apiMethod) {
      url += apiMethod;
    }
    if (!withParameters) {
      return url;
    }

    return url + '?' + querystring.stringify(withParameters);
  }

  public setApiEndpointUrl(apiEndpointUrl: string) {
    if (!validUrl.isUri(apiEndpointUrl)) {
      throw new ImageOptimizerClientException(
        'Invalid API endpoint URL',
        ImageOptimizerClientException.CODE_INVALID_ENDPOINT,
      );
    }
    if (apiEndpointUrl.substring(apiEndpointUrl.length - 1) !== '/') {
      apiEndpointUrl += '/';
    }
    this.apiEndpointUrl = apiEndpointUrl;
  }

  public getApiKey(): string | undefined {
    return this.apiKey;
  }

  public setApiKey(apiKey: string) {
    if (!apiKey.match(/^[\w\-]+/)) {
      throw new ImageOptimizerClientException(
        'Invalid API key format',
        ImageOptimizerClientException.CODE_INVALID_API_KEY,
      );
    }
    this.apiKey = apiKey;
  }

  public async optimizeImage(optimizationRequest: IOptimizationRequest): Promise<ImageOptimizerResult> {
    this.validateRequest(optimizationRequest);

    const url = this.getApiEndpointUrl(ImageOptimizerClient.API_METHOD_OPTIMIZE_IMAGE);

    const options: any = {
      encoding: null, // returns binary body (Buffer)
      formData: {
        [ImageOptimizerClient.API_KEY_PARAM_NAME]: this.getApiKey(),
        [ImageOptimizerClient.IMAGE_POST_FIELD_NAME]: {
          options: {
            filename: optimizationRequest.getImageFileName(),
          },
          value: optimizationRequest.getImageContent(),
        },
        [OptimizationRequest.PARAM_QUALITY]: optimizationRequest.getQuality(),
        [OptimizationRequest.PARAM_KEEP_METADATA]: optimizationRequest.getKeepMetadata(),
        [OptimizationRequest.PARAM_POST_RESULT_TO_URL]: optimizationRequest.getPostResultToUrl(),
        [OptimizationRequest.PARAM_TEST_MODE]: optimizationRequest.getTestMode(),
      },
    };

    try {
      const optimizationResponse: Response = await new Promise((resolve, reject) => {
        request.post(url, options, (error, response) => {
          if (error) {
            reject(error);
          }
          if (response.statusCode !== 200) {
            reject('Invalid status code <' + response.statusCode + '>');
          }
          resolve(response);
        });
      });

      return optimizationRequest.isAsyncResult()
        ? this.getImageOptimizerAsyncResult(optimizationResponse)
        : this.getImageOptimizerSyncResult(optimizationRequest, optimizationResponse);
    } catch (e) {
      throw new ImageOptimizerClientException(
        `Optimization failed - ${e.message}`,
        ImageOptimizerClientException.CODE_API_CALL_FAILED,
        e,
      );
    }
  }

  protected validateRequest(optimizationRequest: IOptimizationRequest) {
    this.validateApiKey();
    OptimizationRequestValidator.checkOptimizationRequest(optimizationRequest);
  }

  protected validateApiKey() {
    const apiKey = this.getApiKey();
    if (apiKey === '') {
      throw new ImageOptimizerClientException('Missing API key', ImageOptimizerClientException.CODE_INVALID_API_KEY);
    }
  }

  protected getImageOptimizerAsyncResult(response: Response): ImageOptimizerResult {
    const taskId = this.resolveTaskIdFromResponse(response);

    return new ImageOptimizerResult(taskId);
  }

  protected getImageOptimizerSyncResult(
    optimizationRequest: IOptimizationRequest,
    response: Response,
  ): ImageOptimizerResult {
    const taskId = this.resolveTaskIdFromResponse(response);
    const image = this.getImageWithFileName(optimizationRequest.getImageFileName(), response.body);

    return new ImageOptimizerResult(taskId, image);
  }

  protected resolveTaskIdFromResponse(response: Response): string {
    const taskId = response.headers[ImageOptimizerClient.API_RESPONSE_HEADER_TASK_ID];

    if (!taskId || typeof taskId !== 'string') {
      throw new ImageOptimizerClientException(
        'Optimization failed - task id not present',
        ImageOptimizerClientException.CODE_API_CALL_FAILED,
      );
    }

    return taskId;
  }

  protected getImageWithFileName(sourcePath: string, content: Buffer): ImageWithFileName {
    try {
      return new ImageWithFileName(sourcePath, content);
    } catch (e) {
      throw new ImageOptimizerClientException(
        `Optimization failed - invalid image in API response: ${e.message}`,
        ImageOptimizerClientException.CODE_API_CALL_FAILED,
      );
    }
  }
}
