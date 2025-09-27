import * as React from "react";
import { cn } from "@/lib/utils";

/* ---- CARD ---- */
type CardProps = React.ComponentProps<"div"> & {
  /** Bật/tắt nền blur trong suốt + white glow (mặc định: true) */
  glass?: boolean;
};

function Card({ className, glass = true, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative flex flex-col gap-6 rounded-xl border py-6 shadow-sm overflow-hidden",
        glass
          ? [
              // nền kính (fallback và safari support)
              "bg-white/20 supports-[backdrop-filter]:bg-white/10 backdrop-blur-xl",
              // viền & chữ phù hợp nền tối
              "border-white/50 text-white/90",
              // white glow mềm
              "shadow-[0_12px_48px_rgba(255,255,255,0.18)]",
              // lớp sheen nhẹ phía trên
              "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
              "before:bg-gradient-to-br before:from-white/25 before:to-transparent",
            ].join(" ")
          : "bg-card text-card-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ---- SLOTS ---- */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-white/70", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
