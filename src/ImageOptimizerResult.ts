import { ImageWithFileName } from './Image/ImageWithFileName';

export class ImageOptimizerResult {
  protected taskId?: string;
  protected exportedImage?: ImageWithFileName;

  constructor(taskId?: string, exportedImage?: ImageWithFileName) {
    if (taskId != null) {
      this.setTaskId(taskId);
    }
    if (exportedImage != null) {
      this.setExportedImage(exportedImage);
    }
  }

  public getTaskId(): string | undefined {
    return this.taskId;
  }
  public setTaskId(taskId: string) {
    this.taskId = taskId;
  }

  public getExportedImage(): ImageWithFileName | undefined {
    return this.exportedImage;
  }

  public setExportedImage(exportedImage: ImageWithFileName) {
    this.exportedImage = exportedImage;
  }
}
