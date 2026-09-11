"use client"

import type React from "react"
import { useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "@/components/icons"

interface ProjectCarouselProps {
  images: string[]
  imageTitles?: string[]
  projectName: string
  isOpen: boolean
  onClose: () => void
}

export function ProjectCarousel({ images, imageTitles = [], projectName, isOpen, onClose }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  if (!isOpen) return null

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (isZoomed) {
        setIsZoomed(false)
      } else {
        onClose()
      }
    }
  }

  const currentImageTitle = imageTitles[currentIndex] || `Screenshot ${currentIndex + 1}`

  const modalContent = (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999]" onClick={handleOverlayClick}>
      {isZoomed && (
        <div className="fixed inset-0 bg-black/98 flex flex-col items-center justify-center z-[10000]">
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-lg z-10 transition-colors"
          >
            <X className="w-6 h-6 text-accent" />
          </button>

          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={currentImageTitle}
            className="max-w-[95vw] max-h-[95vh] object-contain"
          />

          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold text-accent">{currentImageTitle}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}

      {!isZoomed && (
        <div className="bg-card border border-accent/30 rounded-lg w-full max-w-5xl h-auto mx-4 flex flex-col relative shadow-2xl shadow-accent/20">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-lg z-10 transition-colors"
          >
            <X className="w-6 h-6 text-accent" />
          </button>

          <div className="relative bg-black/40 flex items-center justify-center overflow-hidden rounded-t-lg h-80 cursor-pointer group">
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={currentImageTitle}
              className="w-full h-full object-contain group-hover:brightness-110 transition-all duration-300"
              onClick={() => setIsZoomed(true)}
            />

            {/* Zoom indicator */}
            <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
              Cliquer pour zoomer
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 p-3 bg-accent/20 hover:bg-accent/40 rounded-lg transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-8 h-8 text-accent" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 p-3 bg-accent/20 hover:bg-accent/40 rounded-lg transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-8 h-8 text-accent" />
                </button>
              </>
            )}
          </div>

          <div className="p-6 flex flex-col gap-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-accent">{projectName}</h3>
                <p className="text-sm text-muted-foreground">{currentImageTitle}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Thumbnail carousel */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition-all ${
                      currentIndex === index ? "border-accent scale-105" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={imageTitles[index] || `Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )

  return createPortal(modalContent, document.body)
}
