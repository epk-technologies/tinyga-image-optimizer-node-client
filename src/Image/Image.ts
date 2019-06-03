import { ImageParameters } from './ImageParameters';
import { ImageParametersResolver } from './ImageParametersResolver';

export class Image {
  protected imageParameters?: ImageParameters;
  protected content?: Buffer;

  constructor(content?: Buffer) {
    if (content) {
      this.setContent(content);
    }
  }

  public getImageParameters(): ImageParameters | undefined {
    return this.imageParameters;
  }

  public getContent(): Buffer | undefined {
    return this.content;
  }

  public setContent(content: Buffer): void {
    this.imageParameters = ImageParametersResolver.resolveParametersFromContent(content);
    this.content = content;
  }
}
