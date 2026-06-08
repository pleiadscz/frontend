"use client"

import { useRef, useState, useEffect } from "react"
import { Square, Globe } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Dialog from "@radix-ui/react-dialog"

const CAMERA_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4C10.8908 4 9.92091 4.60141 9.40069 5.50073C9.22194 5.80972 8.89205 6 8.53508 6H7.8C6.94342 6 6.36113 6.00078 5.91104 6.03755C5.47262 6.07337 5.24842 6.1383 5.09202 6.21799C4.7157 6.40973 4.40973 6.71569 4.21799 7.09202C4.1383 7.24842 4.07337 7.47262 4.03755 7.91104C4.00078 8.36113 4 8.94342 4 9.8V15.2C4 16.0566 4.00078 16.6389 4.03755 17.089C4.07337 17.5274 4.1383 17.7516 4.21799 17.908C4.40973 18.2843 4.7157 18.5903 5.09202 18.782C5.24842 18.8617 5.47262 18.9266 5.91104 18.9624C6.36113 18.9992 6.94342 19 7.8 19H16.2C17.0566 19 17.6389 18.9992 18.089 18.9624C18.5274 18.9266 18.7516 18.8617 18.908 18.782C19.2843 18.5903 19.5903 18.2843 19.782 17.908C19.8617 17.7516 19.9266 17.5274 19.9624 17.089C19.9992 16.6389 20 16.0566 20 15.2V9.8C20 8.94342 19.9992 8.36113 19.9624 7.91104C19.9266 7.47262 19.8617 7.24842 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.7516 6.1383 18.5274 6.07337 18.089 6.03755C17.6389 6.00078 17.0566 6 16.2 6H15.4648C15.1079 6 14.778 5.80972 14.5992 5.50073C14.079 4.60141 13.1091 4 12 4ZM7.99973 4C8.91084 2.78702 10.363 2 12 2C13.6369 2 15.0891 2.78702 16.0002 4L16.2413 4C17.0463 3.99999 17.7106 3.99998 18.2518 4.04419C18.8139 4.09012 19.3306 4.18868 19.816 4.43597C20.5686 4.81947 21.1805 5.43139 21.564 6.18404C21.8113 6.66937 21.9099 7.18608 21.9558 7.74817C22 8.28936 22 8.95372 22 9.75868V15.2413C22 16.0463 22 16.7106 21.9558 17.2518C21.9099 17.8139 21.8113 18.3306 21.564 18.816C21.1805 19.5686 20.5686 20.1805 19.816 20.564C19.3306 20.8113 18.8139 20.9099 18.2518 20.9558C17.7106 21 17.0463 21 16.2413 21H7.75868C6.95372 21 6.28936 21 5.74817 20.9558C5.18608 20.9099 4.66937 20.8113 4.18404 20.564C3.43139 20.1805 2.81947 19.5686 2.43597 18.816C2.18868 18.3306 2.09012 17.8139 2.04419 17.2518C1.99998 16.7106 1.99999 16.0463 2 15.2413V9.7587C1.99999 8.95373 1.99998 8.28937 2.04419 7.74817C2.09012 7.18608 2.18868 6.66937 2.43597 6.18404C2.81947 5.43139 3.43139 4.81947 4.18404 4.43597C4.66937 4.18868 5.18608 4.09012 5.74817 4.04419C6.28937 3.99998 6.95373 3.99999 7.7587 4L7.99973 4ZM12 10C10.7573 10 9.74995 11.0074 9.74995 12.25C9.74995 13.4926 10.7573 14.5 12 14.5C13.2426 14.5 14.25 13.4926 14.25 12.25C14.25 11.0074 13.2426 10 12 10ZM7.74995 12.25C7.74995 9.90279 9.65274 8 12 8C14.3472 8 16.25 9.90279 16.25 12.25C16.25 14.5972 14.3472 16.5 12 16.5C9.65274 16.5 7.74995 14.5972 7.74995 12.25Z" />
  </svg>
)

const PHOTO_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.7587 3H15.2413C16.0463 2.99999 16.7106 2.99998 17.2518 3.04419C17.8139 3.09012 18.3306 3.18868 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C20.8113 5.66937 20.9099 6.18608 20.9558 6.74817C21 7.28936 21 7.95372 21 8.75868V15.2413C21 16.0463 21 16.7106 20.9558 17.2518C20.9099 17.8139 20.8113 18.3306 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C18.3306 20.8113 17.8139 20.9099 17.2518 20.9558C16.7106 21 16.0463 21 15.2413 21H8.75868C7.95372 21 7.28936 21 6.74817 20.9558C6.18608 20.9099 5.66937 20.8113 5.18404 20.564C4.43139 20.1805 3.81947 19.5686 3.43597 18.816C3.18868 18.3306 3.09012 17.8139 3.04419 17.2518C2.99998 16.7106 2.99999 16.0463 3 15.2413V8.7587C2.99999 7.95373 2.99998 7.28937 3.04419 6.74817C3.09012 6.18608 3.18868 5.66937 3.43597 5.18404C3.81947 4.43139 4.43139 3.81947 5.18404 3.43597C5.66937 3.18868 6.18608 3.09012 6.74817 3.04419C7.28937 2.99998 7.95373 2.99999 8.7587 3ZM6.91104 5.03755C6.47262 5.07337 6.24842 5.1383 6.09202 5.21799C5.7157 5.40973 5.40973 5.7157 5.21799 6.09202C5.1383 6.24842 5.07337 6.47262 5.03755 6.91104C5.00078 7.36113 5 7.94342 5 8.8V13.5857L5.87868 12.707C7.05026 11.5355 8.94975 11.5355 10.1213 12.7071L16.4073 18.9931C16.6681 18.9878 16.8913 18.9786 17.089 18.9624C17.5274 18.9266 17.7516 18.8617 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C18.8617 17.7516 18.9266 17.5274 18.9624 17.089C18.9992 16.6389 19 16.0566 19 15.2V8.8C19 7.94342 18.9992 7.36113 18.9624 6.91104C18.9266 6.47262 18.8617 6.24842 18.782 6.09202C18.5903 5.7157 18.2843 5.40973 17.908 5.21799C17.7516 5.1383 17.5274 5.07337 17.089 5.03755C16.6389 5.00078 16.0566 5 15.2 5H8.8C7.94342 5 7.36113 5.00078 6.91104 5.03755ZM13.5858 19L8.70711 14.1213C8.31658 13.7307 7.68342 13.7307 7.2929 14.1213L5.00694 16.4072C5.01219 16.668 5.0214 16.8912 5.03755 17.089C5.07337 17.5274 5.1383 17.7516 5.21799 17.908C5.40973 18.2843 5.7157 18.5903 6.09202 18.782C6.24842 18.8617 6.47262 18.9266 6.91104 18.9624C7.36113 18.9992 7.94342 19 8.8 19H13.5858ZM14.5 8.5C13.9477 8.5 13.5 8.94772 13.5 9.5C13.5 10.0523 13.9477 10.5 14.5 10.5C15.0523 10.5 15.5 10.0523 15.5 9.5C15.5 8.94772 15.0523 8.5 14.5 8.5ZM11.5 9.5C11.5 7.84315 12.8431 6.5 14.5 6.5C16.1569 6.5 17.5 7.84315 17.5 9.5C17.5 11.1569 16.1569 12.5 14.5 12.5C12.8431 12.5 11.5 11.1569 11.5 9.5Z" />
  </svg>
)

const FILE_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0V7Z" clipRule="evenodd" />
  </svg>
)

const MENU_ITEMS = [
  { icon: CAMERA_ICON, label: "Aparat" },
  { icon: PHOTO_ICON, label: "Zdjęcia" },
  { icon: FILE_ICON, label: "Pliki" },
]

const DESKTOP_MENU_ITEMS = [
  { icon: CAMERA_ICON, label: "Aparat" },
  { icon: PHOTO_ICON, label: "Zdjęcia" },
  { icon: FILE_ICON, label: "Pliki" },
  { icon: <Globe className="h-5 w-5" strokeWidth={1.75} />, label: "Web search" },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isMobile
}

interface ChatInputProps {
  value: string
  onValueChange: (value: string) => void
  onSubmit: () => void
  onStop?: () => void
  isLoading?: boolean
  placeholder?: string
  onFilesPick?: (files: FileList) => void
}

export function ChatInput({
  value,
  onValueChange,
  onSubmit,
  onStop,
  isLoading = false,
  placeholder = "Zapytaj o cokolwiek",
  onFilesPick,
}: ChatInputProps) {
  const [open, setOpen] = useState(false)
  const [isMultiline, setIsMultiline] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const isMobile = useIsMobile()
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const photosInputRef = useRef<HTMLInputElement>(null)
  const filesInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    const next = Math.min(el.scrollHeight, 240)
    el.style.height = `${next}px`
    setIsMultiline(el.scrollHeight > 40 || value.includes("\n"))
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !isLoading) onSubmit()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) {
      onStop?.()
    } else if (value.trim()) {
      onSubmit()
    }
  }

  const handlePick = (kind: "camera" | "photos" | "files") => {
    setOpen(false)
    if (kind === "camera") {
      cameraInputRef.current?.click()
      return
    }
    if (kind === "photos") {
      photosInputRef.current?.click()
      return
    }
    filesInputRef.current?.click()
  }

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) onFilesPick?.(files)
    e.currentTarget.value = ""
  }

  const submitButton = (
    <button
      type="submit"
      aria-label={isLoading ? "Zatrzymaj" : "Wyślij"}
      className="flex h-[36px] w-[36px] md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
    >
      {isLoading ? (
        <Square className="h-4 w-4 md:h-4 md:w-4" fill="currentColor" strokeWidth={0} />
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-[26px] w-[26px] md:h-7 md:w-7"><path d="M11.293 5.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L13 8.414V18a1 1 0 1 1-2 0V8.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l5-5Z" fill="currentColor"/></svg>
      )}
    </button>
  )

  return (
    <form onSubmit={handleSubmit} className={`w-full ${isMobile && isFocused ? "flex flex-row items-end gap-2" : ""}`}>

      {/* Mobile + focused: separate plus button */}
      {isMobile && isFocused && (
        <button
          type="button"
          aria-label="Dodaj"
          onClick={() => setOpen(true)}
          className="flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-black dark:text-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M9.335 16.5v-5.835H3.5a.665.665 0 1 1 0-1.33h5.835V3.5a.665.665 0 0 1 1.33 0v5.835H16.5l.134.014a.665.665 0 0 1 0 1.302l-.134.014h-5.835V16.5a.665.665 0 1 1-1.33 0Z"></path></svg>
        </button>
      )}

      <div className={`flex flex-row gap-2 bg-white dark:bg-neutral-900 px-2 md:px-3 py-1.5 md:py-2 border-[0.5px] border-neutral-200 dark:border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] ${isMultiline ? "rounded-3xl items-end" : "rounded-full items-center"} ${isMobile && isFocused ? "flex-1" : "w-full"}`}>

        {/* Desktop: plus inside */}
        {!isMobile && (
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                aria-label="Dodaj"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M9.335 16.5v-5.835H3.5a.665.665 0 1 1 0-1.33h5.835V3.5a.665.665 0 0 1 1.33 0v5.835H16.5l.134.014a.665.665 0 0 1 0 1.302l-.134.014h-5.835V16.5a.665.665 0 1 1-1.33 0Z"></path></svg>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                side="top"
                align="start"
                sideOffset={8}
                className="z-50 min-w-[180px] rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-1.5 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150"
              >
                {DESKTOP_MENU_ITEMS.map(({ icon, label }) => (
                  <DropdownMenu.Item
                    key={label}
                    onSelect={() => handlePick(label === "Aparat" ? "camera" : label === "Zdjęcia" ? "photos" : "files")}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 outline-none transition-colors"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center text-neutral-500 dark:text-neutral-400">
                      {icon}
                    </span>
                    {label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}

        {/* Mobile + not focused: plus inside */}
        {isMobile && !isFocused && (
          <button
            type="button"
            aria-label="Dodaj"
            onClick={() => setOpen(true)}
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-black dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M9.335 16.5v-5.835H3.5a.665.665 0 1 1 0-1.33h5.835V3.5a.665.665 0 0 1 1.33 0v5.835H16.5l.134.014a.665.665 0 0 1 0 1.302l-.134.014h-5.835V16.5a.665.665 0 1 1-1.33 0Z"></path></svg>
          </button>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="flex-1 bg-transparent pl-2 pr-1 md:px-1 py-1.5 md:py-2 text-[16px] font-medium text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none disabled:opacity-60 resize-none leading-normal overflow-y-auto max-h-[240px] scrollbar-none"
        />

        {submitButton}
      </div>

      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFilesChange} />
      <input ref={photosInputRef} type="file" accept="image/*" className="hidden" onChange={handleFilesChange} />
      <input ref={filesInputRef} type="file" className="hidden" onChange={handleFilesChange} />

      {isMobile && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white dark:bg-neutral-900 px-4 pb-10 pt-4 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300">
              <Dialog.Title className="sr-only">Dodaj załącznik</Dialog.Title>
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-neutral-300 dark:bg-neutral-600" />
              <div className="grid grid-cols-3 gap-3">
                {MENU_ITEMS.map(({ icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handlePick(label === "Aparat" ? "camera" : label === "Zdjęcia" ? "photos" : "files")}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 py-5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center text-neutral-700 dark:text-neutral-200">{icon}</span>
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </form>
  )
}
