"use client";

import { montserrat } from "@/fonts/font";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

export const ORDER_STATUS_OPTIONS: Option[] = [
  { value: "all", label: "Tất cả" },
  { value: "đã đặt", label: "Đã đặt" },
  { value: "đã thanh toán", label: "Đã thanh toán" },
  { value: "đang thiết kế", label: "Đang thiết kế" },
  { value: "đang in", label: "Đang in" },
  { value: "đang giao", label: "Đang giao" },
  { value: "hoàn thành", label: "Hoàn thành" },
];

export function StatusFilterDropdown({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const activeOption =
    ORDER_STATUS_OPTIONS.find((option) => option.value === value) ??
    ORDER_STATUS_OPTIONS[0];

  return (
    <div className={cn("w-full max-w-xs", className)}>
      <span
        className={`${montserrat.className} block text-sm font-medium text-gray-700 mb-1`}
      >
        Lọc theo trạng thái
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              montserrat.className,
              "w-full justify-between gap-2 rounded-md border border-gray-300 bg-black px-3 py-2 text-sm font-medium text-white"
            )}
          >
            <span>{activeOption.label}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className={`${montserrat.className} bg-white w-48`}
        >
          {ORDER_STATUS_OPTIONS.map((option) => {
            const isActive = option.value === value;
            return (
              <DropdownMenuItem
                key={option.value}
                onSelect={(event) => {
                  event.preventDefault();
                  onChange(option.value);
                }}
                className="flex items-center gap-2 text-sm rounded-2xl"
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
                <span>{option.label}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
