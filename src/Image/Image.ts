import { ImageParameters } from './ImageParameters';
import { ImageParametersResolver } from './ImageParametersResolver';

export class Image {
  protected imageParameters?: ImageParameters;
  protected content?: string;

  constructor(content?: string) {
    if (content) {
      this.setContent(content);
    }
  }

  public getImageParameters(): ImageParameters | undefined {
    return this.imageParameters;
  }

  public getContent(): string | undefined {
    return this.content;
  }

  public setContent(content: string): void {
    this.imageParameters = ImageParametersResolver.resolveParametersFromContent(content);
    this.content = content;
  }

  public __toString(): string | undefined {
    return this.getContent();
  }
}
