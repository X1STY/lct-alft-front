interface IDetection {
  class_id: string
  class_name: string
  confidence: number
}

interface IDetectedImage {
  success: boolean
  detections: Array<IDetection>
  image: string
  total_detections: number
}

type ITestManyImagesDto = Array<IDetectedImage>

export type { ITestManyImagesDto, IDetectedImage, IDetection }
