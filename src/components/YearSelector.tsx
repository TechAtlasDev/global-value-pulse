import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface YearSelectorProps {
  selectedYear: number;
  availableYears: number[];
  onYearChange: (year: number) => void;
}

export const YearSelector = ({ selectedYear, availableYears, onYearChange }: YearSelectorProps) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2 text-foreground">
        <Calendar className="w-5 h-5 text-primary" />
        <span className="font-medium">Seleccionar Año:</span>
      </div>
      <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Selecciona un año" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {availableYears.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
