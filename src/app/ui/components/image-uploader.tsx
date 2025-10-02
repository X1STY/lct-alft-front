import { useEffect, useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'

import { isNotNil } from 'es-toolkit'

import { Button } from './button'

import type { ChangeEvent, DragEvent } from 'react'

import { cn } from '@/app/utils/cn'

interface IImageUploaderProps {
  value?: File | null
  onChange: (file: File | null) => void
  maxSize?: number
  acceptedTypes?: Array<string>
  className?: string
  disabled?: boolean
  error?: string
}

export function ImageUploader({
  value,
  onChange,
  maxSize = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
  disabled = false,
  error,
}: IImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [internalError, setInternalError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value)
      setPreviewUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    } else {
      setPreviewUrl(null)
    }
    return () => {}
  }, [value])

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      setInternalError(`Тип файла ${file.type} не поддерживается`)
      return false
    }

    if (file.size > maxSize * 1024 * 1024) {
      setInternalError(`Размер файла не должен превышать ${maxSize}MB`)
      return false
    }

    setInternalError(null)
    return true
  }

  const handleFileSelect = (files: FileList) => {
    const file = files[0]
    if (isNotNil(file) && validateFile(file)) {
      onChange(file)
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    if (disabled) return

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files)
    }
    e.target.value = ''
  }

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const removeImage = () => {
    onChange(null)
  }

  const displayError = error ?? internalError

  return (
    <div className={cn('space-y-4', className)}>
      {isNotNil(previewUrl) ? (
        <div className="group relative">
          <div
            className={cn(
              'relative min-h-[172px] cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-colors',
              'hover:border-primary/50 hover:bg-accent/50',
              isDragOver && 'border-primary bg-primary/5',
              disabled && 'cursor-not-allowed opacity-50',
              Boolean(displayError) && 'border-destructive',
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={handleInputChange}
              className="hidden"
              disabled={disabled}
            />
            <img src={previewUrl} alt="Selected image" className="h-[172px] w-full rounded-md object-cover" />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              removeImage()
            }}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            'relative cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors',
            'hover:border-primary/50 hover:bg-accent/50',
            isDragOver && 'border-primary bg-primary/5',
            disabled && 'cursor-not-allowed opacity-50',
            Boolean(displayError) && 'border-destructive',
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="text-muted-foreground mb-4 h-10 w-10" />
            <p className="mb-2 text-sm font-medium">
              {isDragOver
                ? 'Отпустите изображение внутри окна'
                : 'Нажмите для выбора изображения или переместите его в окно'}
            </p>
            <p className="text-muted-foreground text-xs">
              {acceptedTypes
                .map((type) => type.split('/')[1])
                .join(', ')
                .toUpperCase()}{' '}
              до {maxSize}MB
            </p>
          </div>
        </div>
      )}

      {isNotNil(displayError) && (
        <div className="text-destructive bg-destructive/10 rounded-md p-3 text-sm">{displayError}</div>
      )}
    </div>
  )
}
