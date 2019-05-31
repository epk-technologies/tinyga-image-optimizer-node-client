import { ImageTypesEnum } from './ImageTypesEnum';

export class ImageParameters {
  protected mimeType: string = '';
  protected fileSize: number = 0;
  protected width: number = 0;
  protected height: number = 0;
  protected md5Checksum: string = '';

  public getMimeType(): string {
    return this.mimeType;
  }

  public setMimeType(mimeType: string): void {
    ImageTypesEnum.checkValue(mimeType);
    this.mimeType = mimeType;
  }

  public getFileSize(): number {
    return this.fileSize;
  }

  public setFileSize(fileSize: number) {
    if (fileSize <= 0) {
      throw new Error('Invalid size');
    }
    this.fileSize = fileSize;
  }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): void {
    if (width <= 0) {
      throw new Error('Invalid width');
    }
    this.width = width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(height: number): void {
    if (height <= 0) {
      throw new Error('Invalid height');
    }
    this.height = height;
  }

  public getKilopixels(): number {
    return (this.width * this.height) / 1000.0;
  }

  public getMd5Checksum(): string {
    return this.md5Checksum;
  }

  public setMD5Checksum(md5Checksum: string): void {
    if (!md5Checksum.match('~^[0-9a-f]{32}~')) {
      throw new Error('Invalid MD5 checksum format');
    }
    this.md5Checksum = md5Checksum;
  }

  public getResolution(): number[] {
    return [this.width, this.height];
  }

  public setResolution(width: number, height: number): void {
    this.setWidth(width);
    this.setHeight(height);
  }

  public getFileExtensionByType(): string {
    return ImageTypesEnum.getFileExtensionByType(this.mimeType);
  }

  public isJPEG(): boolean {
    return this.mimeType === ImageTypesEnum.TYPE_JPEG;
  }

  public isPNG(): boolean {
    return this.mimeType === ImageTypesEnum.TYPE_PNG;
  }

  public isGIF(): boolean {
    return this.mimeType === ImageTypesEnum.TYPE_GIF;
  }

  public isWebP(): boolean {
    return this.mimeType === ImageTypesEnum.TYPE_WEBP;
  }
}
