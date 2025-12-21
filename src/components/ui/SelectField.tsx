import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, helperText, className, id, options, ...props }, ref) => {
    const fieldId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {props.required && <span className="text-destructive ml-1" aria-label="requis">*</span>}
        </label>
        <select
          ref={ref}
          id={fieldId}
          className={cn(
            "w-full h-11 px-4 text-base border rounded-lg bg-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat",
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
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

SelectField.displayName = "SelectField";

export default SelectField;

