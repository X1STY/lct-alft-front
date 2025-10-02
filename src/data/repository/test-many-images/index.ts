import type { ITestManyImagesPort } from '@/domain/test-many-images/port'
import type { ITestManyImagesDto } from '@/domain/test-many-images/dto'

import { api } from '@/app/common/providers/http/service'

const testManyImages = async (port: ITestManyImagesPort): Promise<ITestManyImagesDto> => {
  return api.postForm('/recognize/', port)
}

export { testManyImages }
