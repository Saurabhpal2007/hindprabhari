
import React, { useState } from "react";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { Calendar, Check, X } from "lucide-react";

const ChipsDemo: React.FC = () => {
  const [filterSelected, setFilterSelected] = useState<Record<string, boolean>>({
    "Ramp access": true,
    "Cats OK": true,
    "Dogs OK": false,
    "Smoke-free": false,
    "Washer / Dryer": false,
    "Garden": false
  });
  
  const [inputChips, setInputChips] = useState([
    "React",
    "TypeScript",
    "Tailwind CSS"
  ]);

  const toggleFilter = (filter: string) => {
    setFilterSelected(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const removeInputChip = (chip: string) => {
    setInputChips(inputChips.filter(c => c !== chip));
  };

  return (
    <div className="space-y-8 p-6 bg-background rounded-xl border shadow-sm">
      <div>
        <h3 className="text-lg font-medium mb-3">Assist Chips</h3>
        <ChipGroup>
          <Chip 
            variant="assist"
            icon={<Calendar className="h-4 w-4" />}
          >
            Today
          </Chip>
          <Chip variant="assist">This week</Chip>
          <Chip variant="assist">This month</Chip>
        </ChipGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Filter Chips</h3>
        <ChipGroup>
          {Object.entries(filterSelected).map(([filter, selected]) => (
            <Chip
              key={filter}
              variant="filter"
              selected={selected}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </Chip>
          ))}
        </ChipGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Input Chips</h3>
        <ChipGroup>
          {inputChips.map(chip => (
            <Chip
              key={chip}
              variant="input"
              onRemove={() => removeInputChip(chip)}
            >
              {chip}
            </Chip>
          ))}
        </ChipGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Suggestion Chips</h3>
        <ChipGroup>
          <Chip variant="suggestion">Suggestion 1</Chip>
          <Chip variant="suggestion">Suggestion 2</Chip>
          <Chip variant="suggestion">Suggestion 3</Chip>
        </ChipGroup>
      </div>
    </div>
  );
};

export default ChipsDemo;
