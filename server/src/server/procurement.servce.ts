import { Sequelize } from "sequelize-typescript";
import { RecordSearchRequest, ProcurementRecordDto } from "./api_types";
import { ProcurementRecord } from "./db/ProcurementRecord";
import  { Buyer } from "./db/Buyer";
import { unique } from "./utils";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env["SQLITE_DB"] || "./db.sqlite3",
});

sequelize.addModels([Buyer, ProcurementRecord]);

type RecordSearchFilters = {
    textSearch?: string;
  };

export async function getBuyers() {
  return sequelize.query("SELECT id, name FROM buyers ORDER BY name ASC");
}

/**
 * Queries the database for procurement records according to the search filters.
 */
 export async function searchRecords(
    { textSearch }: RecordSearchFilters,
    offset: number,
    limit: number
  ): Promise<ProcurementRecord[]> {
    if (textSearch) {
      return await sequelize.query(
        "SELECT * FROM procurement_records WHERE title || ' ' || description LIKE :textSearch LIMIT :limit OFFSET :offset",
        {
          model: ProcurementRecord, // by setting this sequelize will return a list of ProcurementRecord objects
          replacements: {
            textSearch: `%${textSearch}%`,
            offset: offset,
            limit: limit,
          },
        }
      );
    } else {
      return await sequelize.query(
        "SELECT * FROM procurement_records LIMIT :limit OFFSET :offset",
        {
          model: ProcurementRecord,
          replacements: {
            offset: offset,
            limit: limit,
          },
        }
      );
    }
  }

/**
 * Converts an array of DB-style procurement record object into API types.
 * Prefetches all the required relations.
 */
export async function serializeProcurementRecords(
    records: ProcurementRecord[]
  ): Promise<ProcurementRecordDto[]> {
    // Get unique buyer ids for the selected records
    const buyerIds = unique(records.map((pr) => pr.buyer_id));
  
    // Fetch the buyer data in one query
    const buyers = await sequelize.query(
      "SELECT * FROM buyers WHERE id IN (:buyerIds)",
      {
        model: Buyer,
        replacements: {
          buyerIds,
        },
      }
    );
  
    const buyersById = new Map(buyers.map((b) => [b.id, b]));
    return records.map((r) => serializeProcurementRecord(r, buyersById));
  }

/**
 * Converts a DB-style ProcurementRecord object to an API type.
 * Assumes that all related objects (buyers) are prefetched upfront and passed in the `buyersById` map
 */
export function serializeProcurementRecord(
    record: ProcurementRecord,
    buyersById: Map<string, Buyer>
  ): ProcurementRecordDto {
    const buyer = buyersById.get(record.buyer_id);
    if (!buyer) {
      throw new Error(
        `Buyer ${record.buyer_id} was not pre-fetched when loading record ${record.id}.`
      );
    }
  
    return {
      id: record.id,
      title: record.title,
      description: record.description,
      publishDate: record.publish_date,
      value: record.value,
      currency: record.currency,
      // normalize field, assuming that TENDER and TenderIntent are same type
      stage: getStageDescription(record),
      buyer: {
        id: buyer.id,
        name: buyer.name,
      },
    };
  }

  /**
   * Creates user friendly description of the procurement stage.
   */
  const getStageDescription = (record: ProcurementRecord) => {
    switch (record.stage) {
      case 'TENDER':
      case 'TenderIntent':
        // comparing as strings should work as long as date in db is yyyy-mm-dd
        // this way we do not run into a problem of Dane.now() time part being ahead
        const [now] = new Date().toISOString().split('T');
        const isInFuture = record.close_date > now;
        return record.close_date == null
          ? 'Open'
          : isInFuture
            ? `Open until ${new Date(record.close_date).toLocaleDateString()}`
            : 'Closed';
      default:
        return record.award_date && `Awarded ${new Date(record.award_date).toLocaleDateString()}`;
    }
  }