import { isExiftoolLoadedAtom } from '~/atoms/app'

import { jotaiStore } from './jotai'

class ExifToolManagerStatic {
  private isLoaded = false
  private loadPromise: Promise<void> | null = null

  private exifTool: typeof import('@uswriting/exiftool') | null = null

  async load() {
    if (this.isLoaded) return
    // Return existing in-flight promise to avoid concurrent loads
    if (this.loadPromise) return this.loadPromise

    this.loadPromise = (async () => {
      try {
        const exiftool = await import('@uswriting/exiftool')
        console.info('ExifTool loaded...')
        this.exifTool = exiftool
        this.isLoaded = true
        jotaiStore.set(isExiftoolLoadedAtom, true)
      } catch (error) {
        console.error('Failed to load ExifTool WASM module:', error)
        this.loadPromise = null // Allow retry on next call
        throw error
      }
    })()

    return this.loadPromise
  }

  constructor() {
    this.load()
  }

  async parse(buffer: Blob, filename?: string) {
    if (!this.exifTool) {
      await this.load()
    }

    if (!this.exifTool) {
      throw new Error('ExifTool not loaded')
    }
    const metadata = await this.exifTool.parseMetadata(new File([buffer], `/afilmory/${filename}`))

    if (!metadata.success) {
      throw new Error(metadata.error)
    }

    return metadata.data
  }
}
export const ExifToolManager = new ExifToolManagerStatic()
