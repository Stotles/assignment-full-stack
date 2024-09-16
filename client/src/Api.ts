export type SearchRecordsRequest = {
  textSearch?: string;
  buyerId?: string;
  limit: number;
  offset: number;
};

export type ProcurementRecord = {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  value: number | null;
  currency: string | null;
  stage: string | null;
  closeDate: string | null;
  awardedDate: string | null
  buyer: BuyerRecord;
};

export type SearchRecordsResponse = {
  records: ProcurementRecord[];
  endOfResults: boolean;
};

export type BuyerRecordsRequest = {
  textSearch?: string;
};

export type BuyerRecord = {
  id: string;
  name: string;
};

export type BuyerRecordsResponse = {
  records: BuyerRecord[];
};


class Api {
  async searchRecords(
    request: SearchRecordsRequest
  ): Promise<SearchRecordsResponse> {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  }

  async searchBuyers(
    request: BuyerRecordsRequest
  ): Promise<BuyerRecordsResponse> {
    const response = await fetch("/api/buyers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  }
}

export default Api;
