import { cn } from "@/utils/cn";
import type { CheckboxProps } from "@/types/components/forms/formsTypes";

export const Checkbox = ({
  label,
  description,
  card = false,
  className,
  checked,
  disabled,
  id,
  ...props
}: CheckboxProps) => {
  const content = (
    <>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className={cn(
          "w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer accent-emerald-600",
          disabled && "cursor-not-allowed opacity-50",
        )}
        {...props}
      />
      {(label || description) && (
        <div className="select-none">
          {label && (
            <span
              className={cn(
                "text-xs font-bold text-slate-800 block",
                disabled && "text-slate-400",
              )}>
              {label}
            </span>
          )}
          {description && (
            <span
              className={cn(
                "text-[11px] text-slate-500 block",
                disabled && "text-slate-400",
              )}>
              {description}
            </span>
          )}
        </div>
      )}
    </>
  );

  if (card) {
    return (
      <label
        htmlFor={id}
        className={cn(
          "flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all bg-white select-none",
          checked
            ? "border-emerald-500 bg-emerald-50/20 shadow-2xs"
            : "border-slate-200 hover:bg-slate-50",
          disabled && "opacity-50 cursor-not-allowed hover:bg-white",
          className,
        )}>
        {content}
      </label>
    );
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}>
      {content}
    </label>
  );
};
