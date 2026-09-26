"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gallery } from "@/data/gallery";
type GalleryItem = {
  src: string;
  alt: string;
};
export function GalleryGrid({ items = gallery }: { items?: GalleryItem[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<number | null>(null);
  const item = selected === null ? null : items[selected];
  useEffect(() => {
    if (selected === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    trigger.current?.focus();
  }
  function move(direction: number) {
    setSelected((current) =>
      current === null
        ? null
        : (current + direction + items.length) % items.length,
    );
  }
  return (
    <>
      <div
        className={`gallery-grid ${items.length <= 2 ? "gallery-compact" : ""}`}
      >
        {items.map((image, i) => (
          <button
            className="gallery-item"
            key={`${image.src}-${i}`}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setSelected(i);
              dialog.current?.showModal();
            }}
            aria-label={`Open image: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Image gallery lightbox"
        onCancel={close}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        <button
          className="lightbox-close"
          autoFocus
          onClick={close}
          aria-label="Close lightbox"
        >
          ×
        </button>
        {items.length > 1 && (
          <>
            <button
              className="lightbox-nav lightbox-previous"
              onClick={() => move(-1)}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              className="lightbox-nav lightbox-next"
              onClick={() => move(1)}
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
        {item && (
          <div
            className="lightbox-content"
            onTouchStart={(e) => {
              touch.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touch.current === null) return;
              const delta = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            <div className="lightbox-image">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="95vw"
                quality={90}
                loading="eager"
              />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
