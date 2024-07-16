import { Input, Select } from "antd";
import React from "react";
import Api, { Buyer } from "./Api";
import { DefaultOptionType } from "antd/lib/select";

export type SearchFilters = {
  textSearch: string;
  buyer: string;
};

type Props = {
  filters: SearchFilters;
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, onChange } = props;
  const [buyers, setBuyers] = React.useState<
    Buyer[] | undefined
  >();  

  /**
   * fetching the buyers inside the filter, because for large number of buyers I want the filter to be able to
   * control fetching the buyers list
   * using an effect to fetch the buyers so it can be reused for filtering/pagination
   */ 
  React.useEffect(() => {
    void (async () => {
      const api = new Api();
      const response = await api.buyersList();
        setBuyers(response.buyers);
    })();
  }, []);

  const handleTextSearchChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        textSearch: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  const handleBuyerChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        buyer: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  return (
    <div>
      <Input
        placeholder="Search text..."
        value={filters.textSearch}
        onChange={handleTextSearchChange}
      />
      { buyers && (
        <Select
          placeholder="Select buyer"
          onChange={handleBuyerChange}
          optionFilterProp="label"
          options={buyers.map((buyer) => ({value: buyer.id, label: buyer.name})) }
        />
      )}
    </div>
  );
}

export default RecordSearchFilters;
