export type RecordSearchRequest = {
  textSearch?: string;
  buyerId?: string;
  offset: number;
  limit: number;
};

export type BuyerDto = {
  id: string;
  name: string;
};

export type ProcurementRecordDto = {
  id: string;
  title: string;
  description: string;
  buyer: BuyerDto;
  publishDate: string;
  value: number | null;
  currency: string | null;
  stage: string | null;
  closeDate: string | null;
  awardedDate: string | null
};

export type RecordSearchResponse = {
  records: ProcurementRecordDto[];
  endOfResults: boolean; // this is true when there are no more results to search
};

export type BuyerSearchRequest = {
  textSearch?: string;
};

export type BuyerRecordsResponse = {
  records: BuyerDto[];
};
