import { Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react";
import { ProcurementRecord } from "./Api";
import { formatCurrency } from "./Utils";
import ProcurementRecordPreviewModal from "./ProcurementRecordPreview";

type Props = {
  records: ProcurementRecord[];
};

//Returning as html, so we have flexibility to format the stage value displayed in table
function determineProcurementStage({ stage, closeDate, awardedDate }: ProcurementRecord) {
  const formattedStage = stage ? stage.toUpperCase() : "";
  const formattedCloseDate = new Date(closeDate);
  const formattedAwardedDate = new Date(awardedDate);

  switch (formattedStage) {
    case 'TENDER':

      if(isNaN(formattedCloseDate.getTime())) {
        console.log("Invalid close date")
        return;
      }

      return (closeDate == null || formattedCloseDate > new Date()) ? 
      (<>
        Open until {closeDate}
      </>) :
      (<>
      Closed
      </>) 

    case 'CONTRACT':

      if(isNaN(formattedAwardedDate.getTime())) {
        console.log("Invalid awarded date")
        return;
      }

      return (<>
        Awarded on {awardedDate}
       </>)
       
    default:
      return (<>
       </>)
  }
}

function RecordsTable(props: Props) {
  const { records } = props;
  const [previewedRecord, setPreviewedRecord] = React.useState<
    ProcurementRecord | undefined
  >();

  const columns = React.useMemo<ColumnType<ProcurementRecord>[]>(() => {
    return [
      {
        title: "Published",
        render: (record: ProcurementRecord) =>
          new Date(record.publishDate).toLocaleDateString(),
      },
      {
        title: "Title",
        render: (record: ProcurementRecord) => {
          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            setPreviewedRecord(record);
          };
          return (
            <a href="#" onClick={handleClick}>
              {record.title}
            </a>
          );
        },
      },
      {
        title: "Description",
        render: (record: ProcurementRecord) => record.description,
      },
      {
        title: "Buyer name",
        render: (record: ProcurementRecord) => record.buyer.name,
      },
      {
        title: "Value",
        render: (record: ProcurementRecord) => formatCurrency(record.value, record.currency),
      },
      ,
      {
        title: "Stage",
        render: (record: ProcurementRecord) => determineProcurementStage(record),
      },
    ];
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={records} pagination={false} rowKey="id"/>
      <ProcurementRecordPreviewModal
        record={previewedRecord}
        onClose={() => setPreviewedRecord(undefined)}
      />
    </>
  );
}

export default RecordsTable;
