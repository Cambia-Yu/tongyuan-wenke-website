import { Maximize2, X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type ZoomableImageProps = {
  src: string
  alt: string
  title: string
  caption?: string
}

export default function ZoomableImage({ src, alt, title, caption }: ZoomableImageProps) {
  return (
    <figure className="mt-10">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[22px] bg-[#f4f1ea] text-left shadow-[0_18px_55px_rgba(43,51,46,0.08)] focus-ring"
            aria-label={`放大查看：${title}`}
          >
            <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/72 px-3 py-2 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 size={14} aria-hidden="true" />
              点击放大
            </span>
          </button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          overlayClassName="!z-[599]"
          className="!z-[600] h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-none overflow-auto rounded-[18px] border-0 bg-[#f4f1ea] p-2 shadow-2xl sm:h-[calc(100dvh-2rem)] sm:w-[calc(100vw-2rem)] sm:max-w-none sm:p-4"
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">放大的项目流程图，可滚动或缩放查看细节</DialogDescription>
          <div className="flex min-h-full min-w-full items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="block h-auto max-h-[calc(100dvh-2rem)] w-auto max-w-full object-contain sm:max-h-[calc(100dvh-4rem)] [touch-action:pinch-zoom]"
            />
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="fixed right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black focus-ring sm:right-7 sm:top-7"
              aria-label="关闭大图"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {(title || caption) && (
        <figcaption className="mt-4 max-w-[46rem] text-sm leading-6 text-label-tertiary">
          <span className="font-medium text-label-primary">{title}</span>
          {caption ? ` ${caption}` : null}
        </figcaption>
      )}
    </figure>
  )
}
