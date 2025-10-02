import { useEffect, useState } from 'react'

import { Loader2Icon } from 'lucide-react'

import type { IImageResultProps } from '@/app/common/components/test-image-result/interface'

import { DataTable } from '@/app/ui/components/data-table'
import { useDetectionColumns } from '@/app/modules/test-many-images/case/list/table/columns'
import { AspectRatio } from '@/app/ui/components/aspect-ratio'

const ImageResult = ({ image, result, index }: IImageResultProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState<string>('')
  const columns = useDetectionColumns()

  useEffect(() => {
    const url = URL.createObjectURL(image)
    setImageUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [image])

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <h3 className="w-full truncate text-lg font-medium">
        Изображение {index + 1}: {image.name}
      </h3>

      <div className="grid grid-cols-[35%_65%] space-x-4">
        <div className="w-[full]">
          <div className="relative size-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center rounded bg-gradient-to-br from-[#ffd0c2] to-[#3d3d3d]">
                <Loader2Icon className="size-12 animate-spin" />
              </div>
            )}
            <AspectRatio ratio={3 / 2}>
              <img
                src={imageUrl}
                alt={`Загруженное изображение ${index + 1}`}
                className={`size-full rounded object-cover transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => {
                  setIsLoading(false)
                }}
              />
            </AspectRatio>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-neutral-500">
              Обнаружено объектов: <span className="font-medium">{result.total_detections}</span>
            </span>
          </div>

          {result.detections.length > 0 ? (
            <DataTable columns={columns} data={result.detections} isLoading={false} />
          ) : (
            <div className="flex h-32 items-center justify-center rounded text-neutral-500">Объекты не обнаружены</div>
          )}
        </div>
      </div>
    </div>
  )
}

export { ImageResult }
