import * as React from "react";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Search } from "lucide-react";

export interface CheckboxListOption {
  label: string;
  value: string;
  type?: string;
}

interface CheckboxListProps {
  options: CheckboxListOption[];
  selectedValues: string[];
  onValueChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  maxHeight?: string;
}

export function CheckboxList({
  options,
  selectedValues,
  onValueChange,
  placeholder = "Search...",
  className,
  maxHeight = "300px",
}: CheckboxListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;

    const lowerCaseQuery = searchQuery.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(lowerCaseQuery)
    );
  }, [options, searchQuery]);

  // Group options by type if available
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, CheckboxListOption[]> = {};

    filteredOptions.forEach((option) => {
      const groupKey = option.type || "Other";
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(option);
    });

    return groups;
  }, [filteredOptions]);

  // Toggle selection of an item
  const toggleItem = (value: string) => {
    if (selectedValues.includes(value)) {
      onValueChange(selectedValues.filter((v) => v !== value));
    } else {
      onValueChange([...selectedValues, value]);
    }
  };

  // Select all visible items
  const selectAll = () => {
    const allValues = filteredOptions.map((option) => option.value);
    onValueChange([...new Set([...selectedValues, ...allValues])]);
  };

  // Deselect all visible items
  const deselectAll = () => {
    const valuesToRemove = new Set(
      filteredOptions.map((option) => option.value)
    );
    onValueChange(selectedValues.filter((value) => !valuesToRemove.has(value)));
  };

  return (
    <div className={`border rounded-md ${className}`}>
      <div className="p-2 border-b relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="p-2 border-b flex justify-between">
        <button
          type="button"
          onClick={selectAll}
          className="text-xs text-blue-600 hover:underline"
        >
          Select All
        </button>
        <button
          type="button"
          onClick={deselectAll}
          className="text-xs text-blue-600 hover:underline"
        >
          Deselect All
        </button>
      </div>

      <div className={`p-2 overflow-auto max-h-[${maxHeight}]`}>
        {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
          <div key={groupName} className="mb-4">
            <h4 className="text-sm font-medium mb-2">{groupName}</h4>
            <div className="space-y-2">
              {groupOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={() => toggleItem(option.value)}
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border-t text-xs text-gray-500">
        {selectedValues.length} item(s) selected
      </div>
    </div>
  );
}
