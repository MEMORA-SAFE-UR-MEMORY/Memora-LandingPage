"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  src: string; // local /videos/demo.mp4 or YouTube/Vimeo URL
  title?: string;
};

export default function VideoModal({
  open,
  onClose,
  src,
  title,
}: VideoModalProps) {
  const isYouTube = /youtube\.com|youtu\.be/.test(src);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[92vw] max-w-[960px] aspect-video bg-black rounded-xl shadow-2xl overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {title ? (
          <div className="absolute left-0 right-0 top-0 z-0 p-3 text-center text-white/80 text-sm">
            {title}
          </div>
        ) : null}

        {isYouTube ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={toYouTubeEmbed(src)}
            title={title || "Demo Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full"
            controls
            autoPlay
            playsInline
          >
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>,
    document.body
  );
}

function toYouTubeEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
  } catch {}
  return url;
}
