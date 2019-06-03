export class ImageOptimizerClientException extends Error {
  public static readonly CODE_INVALID_API_KEY = 10;
  public static readonly CODE_INVALID_ENDPOINT = 20;
  public static readonly CODE_INVALID_QUALITY = 30;
  public static readonly CODE_INVALID_METADATA = 40;
  public static readonly CODE_INVALID_FILE_NAME = 50;
  public static readonly CODE_INVALID_IMAGE = 60;
  public static readonly CODE_INVALID_RESULT_URL = 70;
  public static readonly CODE_INVALID_TEST_MODE = 80;

  public static readonly CODE_API_CALL_FAILED = 90;
  public static readonly CODE_API_ERROR = 99;

  public static readonly CODE_INSUFFICIENT_CREDIT = 100;
  public static readonly CODE_OPTIMIZATION_FAILED = 200;

  protected code?: number;
  protected previous?: Error;

  constructor(message?: string, code?: number, previous?: Error) {
    super(message);
    this.code = code;
    this.previous = previous;
  }
}
