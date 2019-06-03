import { AbstractOptimizationRequest } from './AbstractOptimizationRequest';

export class SimpleOptimizationRequest extends AbstractOptimizationRequest {
  protected imageFileName: string = '';
  protected imageContent: Buffer = new Buffer('', 'binary');

  constructor(
    imageContent?: Buffer,
    fileName?: string,
    quality?: number,
    keepMetadata?: string[],
    postResultToUrl?: string,
    testMode?: string,
  ) {
    super(quality, keepMetadata, postResultToUrl, testMode);

    if (imageContent != null) {
      this.setImageContent(imageContent);
    }

    if (fileName != null) {
      this.setImageFileName(fileName);
    }
  }

  public getImageFileName(): string {
    return this.imageFileName;
  }

  public setImageFileName(imageFileName: string): void {
    this.imageFileName = imageFileName;
  }

  public getImageContent(): Buffer {
    return this.imageContent;
  }

  public setImageContent(imageContent: Buffer): void {
    this.imageContent = imageContent;
  }
}
