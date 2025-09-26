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
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
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
      setInternalError(`File type ${file.type} is not supported`)
      return false
    }

    if (file.size > maxSize * 1024 * 1024) {
      setInternalError(`File size must be less than ${maxSize}MB`)
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
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer',
          'hover:border-primary/50 hover:bg-accent/50',
          isDragOver && 'border-primary bg-primary/5',
          disabled && 'opacity-50 cursor-not-allowed',
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
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm font-medium mb-2">
            {isDragOver ? 'Drop image here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-muted-foreground">
            {acceptedTypes
              .map((type) => type.split('/')[1])
              .join(', ')
              .toUpperCase()}{' '}
            up to {maxSize}MB
          </p>
        </div>
      </div>

      {isNotNil(displayError) && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{displayError}</div>
      )}

      {isNotNil(previewUrl) && (
        <div className="relative group max-w-xs">
          <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
            <img src={previewUrl} alt="Selected image" className="w-full h-full object-cover" />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              removeImage()
            }}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}
