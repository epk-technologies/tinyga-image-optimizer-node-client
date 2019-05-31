import sizeOf from 'image-size';
import typeOf from 'image-type';
import md5 from 'md5';
import { ImageParameters } from './ImageParameters';

export class ImageParametersResolver {
  public static resolveParametersFromContent(imageContent: string): ImageParameters {
    const buffer = Buffer.from(imageContent);
    const imageSize = sizeOf(buffer);
    const imageType = typeOf(buffer);

    if (!imageSize || !imageType) {
      throw new Error('Content is not valid image');
    }

    const imageParameters = new ImageParameters();
    imageParameters.setResolution(imageSize.width, imageSize.height);
    imageParameters.setFileSize(imageContent.length);
    imageParameters.setMimeType(imageType.mime);
    imageParameters.setMD5Checksum(md5(imageContent));

    return imageParameters;
  }
}
