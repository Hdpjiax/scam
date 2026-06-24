"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel =
    options.find((option) => option.value === value)?.label || placeholder || "Select";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`custom-select ${open ? "open" : ""}`}
      ref={ref}
      onClick={() => !disabled && setOpen(!open)}
      aria-disabled={disabled}
    >
      <div className="custom-select-trigger">
        <span>{selectedLabel}</span>
        <ChevronDown size={18} />
      </div>
      <div className="custom-select-dropdown">
        {options.map((option) => (
          <div
            key={option.value}
            className={`custom-select-option ${option.value === value ? "selected" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              onChange(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
