import { isNotNil } from 'es-toolkit'

import { useState } from 'react'

import { Loader2Icon } from 'lucide-react'

import type { ISessopnImageProps } from '@/app/common/components/session-image/interface'

import { AspectRatio } from '@/app/ui/components/aspect-ratio'

const SessionImage = ({ imageUrl }: ISessopnImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="h-[360px] w-full">
      {isNotNil(imageUrl) ? (
        <AspectRatio ratio={3 / 2}>
          <div className="relative size-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#ffd0c2] to-[#3d3d3d]">
                <Loader2Icon className="size-12 animate-spin" />
              </div>
            )}
            <img
              src={imageUrl}
              alt="Фото выданных инструментов"
              className={`size-full object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => {
                setIsLoading(false)
              }}
            />
          </div>
        </AspectRatio>
      ) : (
        <div className="size-full bg-gradient-to-br from-[#ffd0c2] to-[#3d3d3d]" />
      )}
    </div>
  )
}

export { SessionImage }
