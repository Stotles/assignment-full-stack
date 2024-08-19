export enum RecordStage {
  TENDER = "TENDER",
  CONTRACT = "CONTRACT",
}

export type RecordSearchRequest = {
  textSearch?: string;
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
  stage: RecordStage;
  closeDate: string;
  awardDate: string;
};

export type RecordSearchResponse = {
  records: ProcurementRecordDto[];
  endOfResults: boolean; // this is true when there are no more results to search
};
