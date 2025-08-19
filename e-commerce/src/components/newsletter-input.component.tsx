import { Button } from "./button.component";
import { Input } from "./input.component";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { forwardRef } from "react";

interface EmailInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
  disabled?: boolean;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      placeholder = "Enter your email address",
      value,
      onChange,
      onSubmit,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.();
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={cn("relative w-full max-w-[340px]", className)}
      >
        <div className="relative flex items-center">
          <Input
            ref={ref}
            type="email"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="h-14 pr-14 pl-6 bg-white border-0 text-gray-700 placeholder:text-gray-400 shadow-sm focus:shadow-md transition-shadow text-base w-full"
            style={{ borderRadius: "40px" }}
            required
            {...props}
          />
          <Button
            type="submit"
            size="icon"
            disabled={disabled}
            className="absolute right-1 h-12 w-12 bg-transparent hover:bg-transparent border-0 shadow-none focus:shadow-none focus-visible:ring-0 focus-visible:border-transparent"
            style={{ borderRadius: "40px" }}
          >
            <ArrowRight className="h-5 w-5 text-[#7DB800]" />
            <span className="sr-only">Subscribe to newsletter</span>
          </Button>
        </div>
      </form>
    );
  }
);

EmailInput.displayName = "EmailInput";
