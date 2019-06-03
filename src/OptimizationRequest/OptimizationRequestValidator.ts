import typeOf from 'image-type';
import validUrl from 'valid-url';
import { ImageOptimizerClientException } from '../ImageOptimizerClientException';
import { IOptimizationRequest, OptimizationRequest } from './IOptimizationRequest';

export class OptimizationRequestValidator {
  public static checkQuality(quality: number): void {
    const minQuality = OptimizationRequest.MIN_QUALITY;
    const maxQuality = OptimizationRequest.MAX_QUALITY;

    if (quality < minQuality || quality > maxQuality) {
      throw new ImageOptimizerClientException(
        `Invalid quality - must be number between ${minQuality} and ${maxQuality}`,
        ImageOptimizerClientException.CODE_INVALID_QUALITY,
      );
    }
  }

  public static checkKeepMetadata(metadata?: string[]): void {
    if (!metadata) {
      return;
    }

    const supported = [
      OptimizationRequest.KEEP_META_ALL,

      OptimizationRequest.KEEP_META_PROFILE,
      OptimizationRequest.KEEP_META_DATE,
      OptimizationRequest.KEEP_META_COPYRIGHT,
      OptimizationRequest.KEEP_META_GEOTAG,
      OptimizationRequest.KEEP_META_ORIENTATION,
    ];

    for (const meta in metadata) {
      if (supported.includes(meta)) {
        throw new ImageOptimizerClientException(
          `Keep metadata value '${meta}' is not supported.`,
          ImageOptimizerClientException.CODE_INVALID_METADATA,
        );
      }
    }
  }

  public static checkImageFileName(imageFileName: string): void {
    if (imageFileName.trim() === '') {
      throw new ImageOptimizerClientException(
        'Missing image file name in request',
        ImageOptimizerClientException.CODE_INVALID_FILE_NAME,
      );
    }
  }

  public static checkImageContent(imageContent: Buffer): void {
    if (!imageContent.length) {
      throw new ImageOptimizerClientException(
        'Missing image content',
        ImageOptimizerClientException.CODE_INVALID_FILE_NAME,
      );
    }
    const supportedTypes = [
      OptimizationRequest.IMAGE_JPEG,
      OptimizationRequest.IMAGE_GIF,
      OptimizationRequest.IMAGE_PNG,
    ];

    const imageType = typeOf(imageContent);
    if (!imageType) {
      throw new ImageOptimizerClientException(
        'Invalid image content',
        ImageOptimizerClientException.CODE_INVALID_FILE_NAME,
      );
    }

    if (!supportedTypes.includes(imageType.mime)) {
      throw new ImageOptimizerClientException(
        `Image format '${imageType.mime}' is not supported yet`,
        ImageOptimizerClientException.CODE_INVALID_FILE_NAME,
      );
    }
  }

  public static checkPostResultToUrl(postResultToUrl?: string) {
    if (postResultToUrl !== '' && !validUrl.isUri(postResultToUrl)) {
      throw new ImageOptimizerClientException(
        'Invalid URL format',
        ImageOptimizerClientException.CODE_INVALID_RESULT_URL,
      );
    }
  }

  public static checkTestMode(mode?: string) {
    if (!mode) {
      return;
    }

    const supported = [
      OptimizationRequest.TEST_MODE_SUCCESS,
      OptimizationRequest.TEST_MODE_INVALID_API_KEY,
      OptimizationRequest.TEST_MODE_INSUFFICIENT_CREDIT,
      OptimizationRequest.TEST_MODE_INVALID_IMAGE,
      OptimizationRequest.TEST_MODE_INVALID_PROCESSING_PARAMETERS,
      OptimizationRequest.TEST_MODE_INVALID_POST_URL,
      OptimizationRequest.TEST_MODE_INTERNAL_SERVER_ERROR,
      OptimizationRequest.TEST_MODE_PROCESSING_ERROR,
      OptimizationRequest.TEST_MODE_REJECTED_BY_PROCESSOR,
      OptimizationRequest.TEST_MODE_DELIVERY_ERROR,
    ];

    if (!supported.includes(mode)) {
      throw new ImageOptimizerClientException(
        `Test mode value '${mode}' is not supported.`,
        ImageOptimizerClientException.CODE_INVALID_METADATA,
      );
    }
  }

  public static checkOptimizationRequest(optimizationRequest: IOptimizationRequest) {
    OptimizationRequestValidator.checkQuality(optimizationRequest.getQuality());
    OptimizationRequestValidator.checkKeepMetadata(optimizationRequest.getKeepMetadata());
    OptimizationRequestValidator.checkImageFileName(optimizationRequest.getImageFileName());
    OptimizationRequestValidator.checkImageContent(optimizationRequest.getImageContent());
    OptimizationRequestValidator.checkPostResultToUrl(optimizationRequest.getPostResultToUrl());
    OptimizationRequestValidator.checkTestMode(optimizationRequest.getTestMode());
  }
}
