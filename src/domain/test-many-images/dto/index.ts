interface IDetection {
  class_id: string
  class_name: string
  confidence: number
}
interface IDetectedImage {
  success: boolean
  detections: Array<IDetection>
  total_detections: number
}

type ITestManyImagesDto = Array<IDetectedImage>

export type { ITestManyImagesDto, IDetectedImage, IDetection }
