import DataTable from "../../../components/dashboard/shared/DataTable";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { useEffect, useState } from "react";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";
import { Spinner } from "../../../components/shared/Spinner";

// COLUMNS FOR DATA TABLE
const columns = [
  {
    field: "compensationIdentification",
    type: "string",
    headerName: <Trans i18nKey='compensation-identification-number'/>,
    width: 150,
    sortable: false,
  },
  {
    field: "descMalfunction",
    type: "string",
    headerName: <Trans i18nKey='malfunction-description'/>,
    width: 200,
    sortable: false,
  },
  // {
  //     field: 'malfunctionImgs',
  //     type: 'string',
  //     headerName: 'Malfunction Images',
  //     width: 200,
  //     sortable: false
  // },
  {
    field: "InsuranceRequestNo",
    type: "string",
    headerName: <Trans i18nKey='warranty-number'/>,
    width: 150,
    sortable: false,
  },
  {
    field: "createdAt",
    type: "string",
    headerName: <Trans i18nKey='created-at'/>,
    width: 120,
    sortable: false,
  },
];
// ACTIONS COLUMN
const actionsColumn = {
  field: "actions",
  headerName: <Trans i18nKey='actions' />,
  width: 200,
  sortable: false,
  renderCell: (params) => {
    return (
      <div className="d-flex gap-4 flex-sm-row felx-column fs-4">
        <Link
          to={`${params.row._id}`}
          className="action text-info"
          title="view"
        >
          <button className='btn btn-outline-info fs-6'><Trans i18nKey='review-request' /></button>
        </Link>
      </div>
    );
  },
};
columns.push(actionsColumn);

export default function Compensations() {
  const { loading, getAllResources} = useApi();
  const [compensationData, setCompensationData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await getAllResources(`${baseURL}compensation`);
        let rows = response?.data?.map((item) => ({
          ...item,
          id: item._id,
        }));
        setCompensationData(rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="d-flex flex-column gap-2">
      <div className="info d-flex gap-2 align-items-center flex-sm-row flex-column">
        <h1 className="text-center"><Trans i18nKey='compensations-requests' /></h1>
      </div>

      {loading && <Spinner />}
      {!loading && (compensationData?.length > 0 ? (
        <DataTable
          columns={columns}
          rows={compensationData}
          isLoading={loading}
          pageToRedirectTo="compensations"

        ></DataTable>
      ) : (
        <h2>
          <Trans i18nKey="no-data-found" />
        </h2>
      ))}
    </div>
  );
}
