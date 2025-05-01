// src/components/ui/checkbox.tsx
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleClick = () => {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      onCheckedChange?.(newChecked);
    };

    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleClick}
          className={cn(
            "appearance-none w-5 h-5 border-2 border-gray-300 rounded-md",
            "focus:ring-2 focus:ring-offset-2 focus:ring-primary/50",
            "transition-colors duration-150 cursor-pointer",
            isChecked ? "bg-primary border-primary" : "bg-white",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          ref={ref}
          {...props}
        />
        {isChecked && (
          <Check
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-4 h-4 text-white pointer-events-none"
            )}
          />
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
