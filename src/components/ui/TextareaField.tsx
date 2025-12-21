import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const fieldId = id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {props.required && <span className="text-destructive ml-1" aria-label="requis">*</span>}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          className={cn(
            "w-full min-h-[120px] px-4 py-3 text-base border rounded-lg resize-y bg-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "transition-all duration-200",
            "placeholder:text-muted-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-destructive focus:ring-destructive"
              : "border-border hover:border-foreground/20",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${fieldId}-error`}
            className="text-sm text-destructive flex items-center gap-1.5 mt-1"
            role="alert"
          >
            <AlertCircle size={14} className="flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${fieldId}-helper`} className="text-sm text-muted-foreground mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";

export default TextareaField;

