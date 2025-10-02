import type { IDetectedImage } from '@/domain/test-many-images/dto'

interface IImageResultProps {
  image: File
  result: IDetectedImage
  index: number
}

export type { IImageResultProps }
