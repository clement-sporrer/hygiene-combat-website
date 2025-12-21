import { cn } from "@/lib/utils";

interface StackProps {
  children: React.ReactNode;
  spacing?: 4 | 6 | 8 | 12 | 16;
  className?: string;
  align?: "start" | "center" | "end";
}

/**
 * Stack component for consistent vertical spacing
 * Provides predictable vertical rhythm
 */
const Stack = ({ 
  children, 
  spacing = 8, 
  className,
  align = "start",
}: StackProps) => {
  const spacingClasses = {
    4: "space-y-4",
    6: "space-y-6",
    8: "space-y-8",
    12: "space-y-12",
    16: "space-y-16",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  return (
    <div className={cn(spacingClasses[spacing], alignClasses[align], className)}>
      {children}
    </div>
  );
};

export default Stack;

