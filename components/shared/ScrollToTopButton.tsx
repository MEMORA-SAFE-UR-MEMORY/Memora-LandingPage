"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 240);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/50 shadow-lg transition hover:bg-fuchsia-100 focus-visible:outline-offset-2 focus-visible:outline-pink"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="#d092e9"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            fill="#d092e9"
            fill-opacity="0"
            stroke-dasharray="20"
            stroke-dashoffset="20"
            d="M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5"
          >
            <animate
              attributeName="d"
              begin="0.55s"
              dur="1.65s"
              repeatCount="indefinite"
              values="M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5;M12 15h2v-3h2.5l-4.5 -4.5M12 15h-2v-3h-2.5l4.5 -4.5;M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5"
            />
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.77s"
              dur="0.55s"
              values="0;1"
            />
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.44s"
              values="20;0"
            />
          </path>
          <path stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.55s"
              dur="0.22s"
              values="14;0"
            />
          </path>
        </g>
      </svg>
    </button>
  );
}
