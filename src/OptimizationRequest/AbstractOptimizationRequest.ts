import { IOptimizationRequest, OptimizationRequest } from './IOptimizationRequest';
import { OptimizationRequestValidator } from './OptimizationRequestValidator';

export abstract class AbstractOptimizationRequest implements IOptimizationRequest {
  protected quality: number = OptimizationRequest.LOSSLESS_QUALITY;
  protected keepMetadata: string[] = [OptimizationRequest.KEEP_META_ALL];
  protected postResultToUrl: string = '';
  protected asyncResult: boolean = false;
  protected testMode: string = '';

  protected constructor(quality?: number, keepMetadata?: string[], postResultToUrl?: string, testMode?: string) {
    if (quality) {
      this.setQuality(quality);
    }
    if (keepMetadata) {
      this.setKeepMetadata(keepMetadata);
    }
    if (postResultToUrl) {
      this.setPostResultToUrl(postResultToUrl);
    }
    if (testMode) {
      this.setTestMode(testMode);
    }
  }

  public getQuality(): number {
    return this.quality;
  }

  public setQuality(quality: number) {
    OptimizationRequestValidator.checkQuality(quality);
    this.quality = quality;
  }

  public getKeepMetadata(): string[] {
    return this.keepMetadata;
  }

  public setKeepMetadata(keepMetadata: string[]): void {
    OptimizationRequestValidator.checkKeepMetadata(keepMetadata);
    this.keepMetadata = keepMetadata;
  }

  public getPostResultToUrl(): string {
    return this.postResultToUrl;
  }

  public setPostResultToUrl(postResultToUrl: string): void {
    this.postResultToUrl = postResultToUrl;
    this.asyncResult = true;
  }

  public isAsyncResult(): boolean {
    return this.asyncResult;
  }

  public isTestMode(): boolean {
    return this.testMode !== '';
  }

  public getTestMode(): string {
    return this.testMode;
  }

  public setTestMode(testMode: string) {
    this.testMode = testMode;
  }

  public abstract getImageFileName(): string;
  public abstract getImageContent(): Buffer;
}
