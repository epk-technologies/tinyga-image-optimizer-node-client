import { AbstractOptimizationRequest } from './AbstractOptimizationRequest';

export class SimpleOptimizationRequest extends AbstractOptimizationRequest {
  protected imageFileName: string = '';
  protected imageContent: string = '';

  constructor(
    imageContent?: string,
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

  public setImageFileName(imageFileName: string) {
    this.imageFileName = imageFileName;
  }

  public getImageContent(): string {
    return this.imageContent;
  }

  public setImageContent(imageContent: string) {
    this.imageContent = imageContent;
  }
}
