import { Input } from "antd";
import React from "react";
import { SearchFilters } from "./RecordSearchPage";


type Props = {
  filters: SearchFilters;
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, onChange } = props;

  const handleQueryChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        searchQuery: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  return (
    <div>
      <Input
        placeholder="Search text..."
        value={filters.searchQuery}
        onChange={handleQueryChange}
      />
    </div>
  );
}

export default RecordSearchFilters;
