"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";

import text from "@/mocks/aboutText.json";

export default function PrivacyPolicyPage() {
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const answersRef = useRef<Array<HTMLDivElement | null>>([]);
  const prevExpanded = useRef<number | null>(null);

  const toggleAccordion = (index: number) => {
    setIsExpanded((prev) => (prev === index ? null : index));
  };

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      alert(`Copied: ${value}`);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  // Reveal elements sequentially when page mounts
  useEffect(() => {
    const nodes =
      containerRef.current?.querySelectorAll<HTMLElement>(".fade-up");
    if (!nodes || nodes.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(nodes, { autoAlpha: 0, y: 16 });
      gsap.to(nodes, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth accordion expand/collapse
  useEffect(() => {
    const prevIndex = prevExpanded.current;
    prevExpanded.current = isExpanded;

    if (prevIndex !== null && prevIndex !== isExpanded) {
      const closing = answersRef.current[prevIndex];
      if (closing) {
        gsap.to(closing, {
          height: 0,
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.inOut",
          onComplete: () => {
            if (prevExpanded.current === prevIndex) return;
            closing.style.display = "none";
            closing.style.height = "0px";
            closing.style.opacity = "0";
          },
        });
      }
    }

    if (isExpanded !== null) {
      const currentIndex = isExpanded;
      const opening = answersRef.current[currentIndex];
      if (opening) {
        opening.style.display = "block";
        const target = opening.scrollHeight;
        gsap.fromTo(
          opening,
          { height: 0, autoAlpha: 0 },
          {
            height: target,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (prevExpanded.current !== currentIndex) return;
              opening.style.height = "auto";
            },
          }
        );
      }
    }
  }, [isExpanded]);

  const setAnswerRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      answersRef.current[index] = node;
      if (!node) return;
      node.style.overflow = "hidden";
      node.style.display = "none";
      node.style.height = "0px";
      node.style.opacity = "0";
    },
    []
  );

  answersRef.current.length = text.faqData.length;

  return (
    <div ref={containerRef} className="font-poppins-light space-y-12">
      <Section className="mx-auto p-8 fade-up">
        <div className="bg-card rounded-2xl shadow-md p-4">
          <h1 className="titleText text-4xl font-bold text-title-primary mb-4">
            {text.welcomeClaimX}
          </h1>
          <p className="normalText text-normal">{text.mainDescription}</p>
          <br />
          <p className="normalText text-normal">{text.subDescription}</p>
        </div>
      </Section>

      <Section className="mx-auto px-8 fade-up">
        <h2 className="titleText font-semibold text-2xl text-title-primary">
          {text.faqTitle}
        </h2>

        {text.faqData.map(
          (
            item: { icon: string; question: string; answer: string },
            index: number
          ) => (
            <div key={index} className="normalText mt-4 fade-up">
              <button
                className="flex justify-between w-full text-left font-medium text-md items-center p-3 rounded-[24px] transition-colors duration-300 hover:bg-btn-primary"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isExpanded === index}
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1.75rem"
                    height="1.75rem"
                    className="fill-current"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  {item.question}
                </span>

                <span
                  className={`transform transition-transform duration-300 ${
                    isExpanded === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="1.25rem"
                    height="1.25rem"
                    className="fill-current text-gray-600"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </span>
              </button>

              <div className="overflow-hidden">
                <div
                  ref={setAnswerRef(index)}
                  className={`answer-content answer-${index} px-1 pt-1 pb-3 text-normal leading-relaxed`}
                  aria-hidden={isExpanded !== index}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          )
        )}
      </Section>

      <Section className="mx-auto px-8 py-4 fade-up">
        <h2 className="titleText text-2xl font-semibold text-title-primary mb-4">
          {text.contactTitle}
        </h2>

        <div className="normalText flex flex-col gap-3">
          <ContactRow
            icon={text.contactInfo.phoneIcon}
            label={text.customerSupport}
            value={text.contactInfo.phone}
            onCopy={copyToClipboard}
          />
          <ContactRow
            icon={text.contactInfo.emailIcon}
            label={text.email}
            value={text.contactInfo.email}
            onCopy={copyToClipboard}
          />
        </div>
      </Section>
    </div>
  );
}

type ContactRowProps = {
  icon: string;
  label: string;
  value: string;
  onCopy: (val: string) => void;
};

function ContactRow({ icon, label, value, onCopy }: ContactRowProps) {
  return (
    <div className="normalText flex items-center gap-2 group">
      <span className="w-6 h-6" dangerouslySetInnerHTML={{ __html: icon }} />
      <span className="font-medium">{label}</span>
      <p>{value}</p>
      <button
        className="transition-opacity duration-300 bg-transparent border-none cursor-pointer flex items-center justify-center rounded-full w-10 h-10 hover:bg-gray-300"
        onClick={() => onCopy(value)}
        aria-label={`Copy ${label}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.25rem"
          height="1.25rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v0M8 5a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v0"
          />
        </svg>
      </button>
    </div>
  );
}

type SectionProps = {
  className?: string;
  children: ReactNode;
};

function Section({ className = "", children }: SectionProps) {
  return <section className={className}>{children}</section>;
}
