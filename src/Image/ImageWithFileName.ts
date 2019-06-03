import { Image } from './Image';

export class ImageWithFileName extends Image {
  protected fileName?: string;

  constructor(sourcePath?: string, content?: Buffer) {
    super(content);

    if (sourcePath) {
      this.setFileName(sourcePath);
    }
  }

  public getFileName(): string | undefined {
    return this.fileName;
  }

  public setFileName(fileNames: string): void {
    this.fileName = fileNames;
  }
}
