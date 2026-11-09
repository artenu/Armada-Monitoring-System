import { CheckSquare } from "lucide-react";
import { Badge, Checkbox } from "@/components/ui";
import { buildChecklistItems } from "../utils/operational-utils";
import type { RkbmChecklistSectionProps } from "@/types";

export const RkbmChecklistSection = (props: RkbmChecklistSectionProps) => {
  const checklistItems = buildChecklistItems(props);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
      <div className="border-l-4 border-emerald-600 px-4 py-2.5 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            3. Checklist Kelengkapan Dokumen Operasional
          </h4>
        </div>
        <Badge variant="success" size="sm">
          Cukup centang jika ada
        </Badge>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-slate-100">
        {checklistItems.map((item) => (
          <Checkbox
            key={item.id}
            id={item.id}
            card
            label={item.label}
            description={item.description}
            checked={item.checked}
            onChange={(e) => item.onChange(e.target.checked)}
          />
        ))}
      </div>
    </div>
  );
};
