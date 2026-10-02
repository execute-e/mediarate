"use client";

import { cn } from "cn";
import { CameraIcon, LoaderCircleIcon } from "lucide-react";
import { ChangeEvent, ReactNode, useRef } from "react";

interface ImageUploadProps {
  children: ReactNode;
  label: string;
  onFileSelect: (file: File) => void;
  accept?: string;
  isLoading?: boolean;
  className?: string;
}

export function ImageUpload({
  children,
  label,
  onFileSelect,
  accept = "image/*",
  isLoading = false,
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // reset, otherwise picking the same file again won't fire onChange
    e.target.value = "";
    if (file) onFileSelect(file);
  };

  return (
    <>
      <button
        type="button"
        aria-label={label}
        disabled={isLoading}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "group/image-upload relative block overflow-hidden outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-wait",
          className,
        )}
      >
        {children}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover/image-upload:opacity-100 group-focus-visible/image-upload:opacity-100",
            isLoading && "opacity-100",
          )}
        >
          {isLoading ? (
            <LoaderCircleIcon className="size-6 animate-spin" />
          ) : (
            <CameraIcon className="size-6" />
          )}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleChange}
      />
    </>
  );
}
