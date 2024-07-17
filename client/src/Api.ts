export type SearchRecordsRequest = {
  textSearch?: string;
  buyer?: string;
  limit: number;
  offset: number;
};

export type Buyer = {
  id: string;
  name: string;
}
export type ProcurementRecord = {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  buyer: Buyer
  value: number;
  currency: string;
  stage: string;
  closeDate: string;
  awardDate: string;
};

export type SearchRecordsResponse = {
  records: ProcurementRecord[];
  endOfResults: boolean;
};

export type BuyersResponse = {
  buyers: Buyer[];
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

  //for a large number of buyer records, the list would have to be filtered and/or paginated, same as the record search
  async buyersList(
  ): Promise<BuyersResponse> {
    const response = await fetch("/api/buyers", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  }
}

export default Api;
