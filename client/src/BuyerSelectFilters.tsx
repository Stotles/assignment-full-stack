import { Select } from "antd";
import React from "react";
import { SearchFilters } from "./RecordSearchPage";
import Api, { BuyerRecord } from "./Api";

export type BuyerFilters = {
  buyerName: string;
};

export type SelectOption = {
  value: string;
  label: string
};

type Props = {
  filters: SearchFilters;
  onSelect: (newFilters: SearchFilters) => void;
};

function BuyerSelectFilters(props: Props) {
  const { filters, onSelect } = props;
  const [buyerList, setSelectOptions] = React.useState<SelectOption[]>([]);
  const [buyerFilters, setBuyerFilters] = React.useState<BuyerFilters>({
    buyerName: ""
  });

  React.useEffect(() => {
    void (async () => {
      if(buyerFilters.buyerName) {
        const api = new Api();
        const response = await api.searchBuyers({
          textSearch: buyerFilters.buyerName,
        });
        setSelectOptions(response.records.map((record: BuyerRecord) => {
          const option: SelectOption = {
            value: record.id,
            label: record.name
          }
         return option;
        } ));
      }     
    })();
  }, [buyerFilters]);

  const onBuyerSelect = (value: string) => {
    onSelect({
      ...filters,
      buyerFilterId: value ? value : "",
    });
  };

  const onSearch = (value: string) => {
    setBuyerFilters({buyerName: value });
  };

  const onClear = () => {
    setSelectOptions([]);
    setBuyerFilters({buyerName: "" });
    onSelect({
      ...filters,
      buyerFilterId: "",
    });
  };

  return (
    <div>
      <Select showSearch allowClear placeholder="Search buyer" optionFilterProp="label" onChange={onBuyerSelect} onSearch={onSearch} onClear={onClear} options={buyerList}/>
    </div>
  );
}

export default BuyerSelectFilters;
