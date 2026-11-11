import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search, Check, X } from "lucide-react";
import { cn } from "@/utils/cn";
import type {
  SearchableOption,
  SearchableSelectProps,
} from "@/types/components/forms/formsTypes";

export const SearchableSelect = forwardRef<
  HTMLSelectElement,
  SearchableSelectProps
>(
  (
    {
      label,
      startIcon: StartIcon,
      options,
      children,
      value,
      defaultValue,
      name,
      id,
      onChange,
      onValueChange,
      placeholder = "Pilih opsi...",
      searchPlaceholder = "Ketik untuk mencari...",
      error,
      helperText,
      required,
      disabled,
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState<string>(
      value ?? defaultValue ?? "",
    );
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const [popoverCoords, setPopoverCoords] = useState<{
      top: number;
      left: number;
      width: number;
      openAbove: boolean;
    }>({ top: 0, left: 0, width: 0, openAbove: false });

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement | null>(null);

    // Sync state ketika prop value atau defaultValue berubah
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      } else if (defaultValue !== undefined) {
        setSelectedValue(defaultValue);
      }
    }, [value, defaultValue]);

    // Hitung posisi popover di layar secara presisi
    const calculateCoords = () => {
      if (triggerButtonRef.current) {
        const rect = triggerButtonRef.current.getBoundingClientRect();
        const dropdownHeight = 260;
        const spaceBelow = window.innerHeight - rect.bottom;
        const openAbove =
          spaceBelow < dropdownHeight && rect.top > dropdownHeight;

        setPopoverCoords({
          top: openAbove ? rect.top - 4 : rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          openAbove,
        });
      }
    };

    // Buka dropdown dengan menghitung posisi koordinat secara sinkron SEBELUM isOpen = true
    const toggleOpen = () => {
      if (disabled) {
        return;
      }
      if (!isOpen) {
        calculateCoords();
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Update posisi saat dibuka, scroll, atau resize menggunakan useLayoutEffect (sebelum frame dipaint browser)
    useLayoutEffect(() => {
      if (isOpen) {
        calculateCoords();
        window.addEventListener("scroll", calculateCoords, true);
        window.addEventListener("resize", calculateCoords);
        return () => {
          window.removeEventListener("scroll", calculateCoords, true);
          window.removeEventListener("resize", calculateCoords);
        };
      }
    }, [isOpen]);

    // Ekstrak opsi baik dari prop `options` maupun dari `children` (<option>)
    const { normalizedOptions, fallbackPlaceholder } = useMemo(() => {
      let detectedPlaceholder: string | null = null;
      if (options && options.length > 0) {
        return {
          normalizedOptions: options.map((opt) =>
            typeof opt === "string" ? { value: opt, label: opt } : opt,
          ),
          fallbackPlaceholder: null,
        };
      }

      const extracted: SearchableOption[] = [];
      React.Children.forEach(children, (child) => {
        if (
          React.isValidElement<{
            value?: string | number;
            children?: React.ReactNode;
          }>(child)
        ) {
          const optVal = String(child.props.value ?? "");
          const optLabel =
            typeof child.props.children === "string"
              ? child.props.children
              : String(child.props.value ?? "");
          if (optVal === "") {
            if (optLabel) {
              detectedPlaceholder = optLabel;
            }
          } else {
            extracted.push({ value: optVal, label: optLabel });
          }
        }
      });

      return {
        normalizedOptions: extracted,
        fallbackPlaceholder: detectedPlaceholder,
      };
    }, [options, children]);

    const activePlaceholder =
      placeholder !== "Pilih opsi..."
        ? placeholder
        : (fallbackPlaceholder ?? placeholder);

    // Filter opsi berdasarkan input pencarian
    const filteredOptions = useMemo(() => {
      const query = searchTerm.trim().toLowerCase();
      if (!query) {
        return normalizedOptions;
      }
      return normalizedOptions.filter(
        (opt) =>
          opt.label.toLowerCase().includes(query) ||
          (opt.subLabel && opt.subLabel.toLowerCase().includes(query)) ||
          opt.value.toLowerCase().includes(query),
      );
    }, [normalizedOptions, searchTerm]);

    // Opsi terpilih saat ini (dengan fallback ke selectedValue jika custom/legacy)
    const selectedOption = useMemo(() => {
      const found = normalizedOptions.find(
        (opt) => opt.value === selectedValue,
      );
      if (found) {
        return found;
      }
      if (selectedValue) {
        return { value: selectedValue, label: selectedValue };
      }
      return undefined;
    }, [normalizedOptions, selectedValue]);

    // Tutup dropdown jika klik di luar trigger dan popover
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          popoverRef.current &&
          !popoverRef.current.contains(target)
        ) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fokus ke search input ketika dropdown terbuka
    useEffect(() => {
      if (isOpen) {
        setHighlightedIndex(0);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
      } else {
        setSearchTerm("");
      }
    }, [isOpen]);

    // Handler memilih opsi
    const handleSelect = (optValue: string) => {
      setSelectedValue(optValue);
      setIsOpen(false);
      setSearchTerm("");

      onValueChange?.(optValue);

      // Trigger change event untuk React Hook Form register & Form handler
      if (onChange) {
        const syntheticEvent = {
          target: {
            name: name || "",
            value: optValue,
          },
          currentTarget: {
            name: name || "",
            value: optValue,
          },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;

        onChange(syntheticEvent);
      }

      // Sync ke hidden select
      if (hiddenSelectRef.current) {
        hiddenSelectRef.current.value = optValue;
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          calculateCoords();
          setIsOpen(true);
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].value);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const inputId = id || name;

    return (
      <div
        className={cn("w-full space-y-1 relative select-none", className)}
        ref={containerRef}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
            {StartIcon && <StartIcon className="w-3.5 h-3.5 text-slate-500" />}
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Hidden Native Select untuk Integrasi React Hook Form & Browser Autocomplete */}
        <select
          ref={(node) => {
            hiddenSelectRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          name={name}
          id={inputId}
          value={selectedValue}
          onChange={(e) => handleSelect(e.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only pointer-events-none">
          <option value="">{activePlaceholder}</option>
          {normalizedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
          {selectedValue &&
            !normalizedOptions.some((opt) => opt.value === selectedValue) && (
              <option value={selectedValue}>{selectedValue}</option>
            )}
        </select>

        {/* Trigger Button */}
        <button
          ref={triggerButtonRef}
          type="button"
          disabled={disabled}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn(
            "w-full px-3 py-2 text-left text-xs bg-white border border-slate-300 rounded-xl flex items-center justify-between",
            "focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all cursor-pointer shadow-2xs",
            disabled && "bg-slate-50 text-slate-400 cursor-not-allowed",
            error && "border-red-400 focus:border-red-500",
          )}>
          <span
            className={cn(
              "truncate font-medium",
              selectedOption ? "text-slate-900" : "text-slate-400",
            )}>
            {selectedOption ? selectedOption.label : activePlaceholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-slate-400 shrink-0 ml-2 transition-transform duration-200",
              isOpen && "rotate-180 text-red-600",
            )}
          />
        </button>

        {/* Popover Dropdown Dirender Menggunakan React Portal ke document.body */}
        {isOpen &&
          popoverCoords.width > 0 &&
          createPortal(
            <div
              ref={popoverRef}
              style={{
                position: "fixed",
                top: popoverCoords.openAbove
                  ? undefined
                  : `${popoverCoords.top}px`,
                bottom: popoverCoords.openAbove
                  ? `${window.innerHeight - popoverCoords.top}px`
                  : undefined,
                left: `${popoverCoords.left}px`,
                width: `${popoverCoords.width}px`,
                zIndex: 99999,
              }}
              className="bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in duration-100">
              {/* Search Input Box */}
              <div className="p-2 border-b border-slate-100 flex items-center gap-2 bg-slate-50/80">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={searchPlaceholder}
                  className="w-full text-xs bg-transparent focus:outline-hidden text-slate-800 placeholder:text-slate-400"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* List Opsi */}
              <div
                role="listbox"
                className="max-h-56 overflow-y-auto p-1 divide-y divide-slate-50">
                {filteredOptions.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    <p>Tidak ada opsi yang cocok</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Coba kata kunci pencarian lain
                    </span>
                  </div>
                ) : (
                  filteredOptions.map((opt, idx) => {
                    const isSelected = opt.value === selectedValue;
                    const isHighlighted = idx === highlightedIndex;

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(opt.value)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={cn(
                          "w-full px-3 py-2 text-left text-xs rounded-lg flex items-center justify-between transition-colors cursor-pointer",
                          isSelected
                            ? "bg-red-50 text-red-700 font-bold"
                            : isHighlighted
                              ? "bg-slate-100 text-slate-900"
                              : "text-slate-700 hover:bg-slate-50",
                        )}>
                        <div className="truncate pr-2">
                          <span className="block truncate">{opt.label}</span>
                          {opt.subLabel && (
                            <span className="text-[10px] text-slate-400 block font-normal truncate">
                              {opt.subLabel}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>,
            document.body,
          )}

        {/* Error / Helper Text */}
        {error ? (
          <p className="text-[11px] font-semibold text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-[10.5px] text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

SearchableSelect.displayName = "SearchableSelect";
