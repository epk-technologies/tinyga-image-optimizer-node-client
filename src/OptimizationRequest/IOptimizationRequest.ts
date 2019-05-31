export interface IOptimizationRequest {
  getQuality(): number;
  getKeepMetadata(): any[];
  getImageFileName(): string;
  getImageContent(): string;
  getPostResultToUrl(): string | undefined;
  isAsyncResult(): boolean;
  isTestMode(): boolean;
  getTestMode(): string | undefined;
}

export class OptimizationRequest {
  public static readonly LOSSLESS_QUALITY: number = 100;

  public static readonly MIN_QUALITY = 1;
  public static readonly MAX_QUALITY = OptimizationRequest.LOSSLESS_QUALITY;

  public static readonly KEEP_META_ALL = 'all';

  public static readonly KEEP_META_PROFILE = 'profile';
  public static readonly KEEP_META_DATE = 'date';
  public static readonly KEEP_META_COPYRIGHT = 'copyright';
  public static readonly KEEP_META_GEOTAG = 'geotag';
  public static readonly KEEP_META_ORIENTATION = 'orientation';

  public static readonly TEST_MODE_SUCCESS = 'SUCCESS';
  public static readonly TEST_MODE_INVALID_API_KEY = 'INVALID_API_KEY';
  public static readonly TEST_MODE_INSUFFICIENT_CREDIT = 'INSUFFICIENT_CREDIT';
  public static readonly TEST_MODE_INVALID_IMAGE = 'INVALID_IMAGE';
  public static readonly TEST_MODE_INVALID_PROCESSING_PARAMETERS = 'INVALID_PROCESSING_PARAMETERS';
  public static readonly TEST_MODE_INVALID_POST_URL = 'INVALID_POST_URL';
  public static readonly TEST_MODE_INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
  public static readonly TEST_MODE_PROCESSING_ERROR = 'PROCESSING_ERROR';
  public static readonly TEST_MODE_REJECTED_BY_PROCESSOR = 'REJECTED_BY_PROCESSOR';
  public static readonly TEST_MODE_DELIVERY_ERROR = 'DELIVERY_ERROR';

  public static readonly IMAGE_JPEG = 'image/jpeg';
  public static readonly IMAGE_PNG = 'image/png';
  public static readonly IMAGE_GIF = 'image/gif';

  public static readonly PARAM_QUALITY = 'quality';
  public static readonly PARAM_KEEP_METADATA = 'keep_metadata';
  public static readonly PARAM_POST_RESULT_TO_URL = 'post_result_to_url';
  public static readonly PARAM_TEST_MODE = 'test_mode';

  public static readonly KEEP_METADATA_SEPARATOR = ',';
}
