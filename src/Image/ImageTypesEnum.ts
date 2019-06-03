export class ImageTypesEnum {
  public static readonly TYPE_JPEG: string = 'image/jpeg';
  public static readonly TYPE_PNG: string = 'image/png';
  public static readonly TYPE_GIF: string = 'image/gif';
  public static readonly TYPE_WEBP: string = 'image/webp';

  public static getFileExtensionsForTypes(): any {
    return {
      [this.TYPE_JPEG]: 'jpg',
      [this.TYPE_PNG]: 'png',
      [this.TYPE_GIF]: 'gif',
      [this.TYPE_WEBP]: 'webp',
    };
  }

  public static getFileExtensionByType(type: string): string {
    this.checkValue(type);

    return this.getFileExtensionsForTypes()[type];
  }

  public static getSupportedInputTypes(): string[] {
    return [this.TYPE_JPEG, this.TYPE_PNG, this.TYPE_GIF, this.TYPE_WEBP];
  }

  public static isSupportedInputType(type: string): boolean {
    return type in this.getSupportedInputTypes();
  }

  public static getSupportedOutputTypes(): string[] {
    return [this.TYPE_JPEG, this.TYPE_PNG, this.TYPE_GIF];
  }

  public static isSupportedOutputType(type: string): boolean {
    return type in this.getSupportedOutputTypes();
  }

  public static getAvailableTypes(): string[] {
    return [this.TYPE_JPEG, this.TYPE_PNG, this.TYPE_GIF, this.TYPE_WEBP];
  }

  public static isAvailableType(type: string): boolean {
    return this.getAvailableTypes().includes(type);
  }

  public static checkValue(value: string) {
    if (!this.isAvailableType(value)) {
      throw new Error(`${value} is not a valid type`);
    }
  }
}
