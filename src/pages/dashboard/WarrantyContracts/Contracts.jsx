import DataTable from "../../../components/dashboard/shared/DataTable";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch"; //Custom Hook to fecth all users
import { getAllRecords } from "../../../APIs/crud"; //To be passed to the useFetch custom hook
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { useEffect, useState } from "react";
import { baseURL } from "../../../APIs/baseURL";

// COLUMNS FOR DATA TABLE
const columns = [
  {
    field: "insuranceNo",
    type: "string",
    headerName: <Trans i18nKey='warranty-number' />,
    width: 120,
    sortable: false,
  },
  {
    field: "clientName",
    type: "string",
    headerName: <Trans i18nKey='client-name' />,
    width: 100,
    sortable: false,
  },
  {
    field: "deviceType",
    type: "string",
    headerName: <Trans i18nKey='device-type' />,
    width: 100,
    sortable: false,
  },
  {
    field: "deviceBrand",
    type: "string",
    headerName: <Trans i18nKey='device-brand' />,
    width: 100,
    sortable: false,
  },
  {
    field: "deviceColor",
    type: "string",
    headerName: <Trans i18nKey='device-color' />,
    width: 100,
    sortable: false,
  },
  {
    field: "serialNo",
    type: "string",
    headerName: <Trans i18nKey='device-serial-number' />,
    width: 120,
    sortable: false,
  },
  {
    field: "clientPhone",
    type: "string",
    headerName: <Trans i18nKey='client-phone' />,
    width: 120,
    sortable: false,
  },
  {
    field: "clientEmail",
    type: "string",
    headerName: <Trans i18nKey='client-email' />,
    width: 200,
    sortable: false,
  },
  {
    field: "insuranceDuration",
    type: "string",
    headerName: <Trans i18nKey='warranty-duration' />,
    width: 100,
    sortable: false,
  },
  {
    field: "company",
    type: "string",
    headerName: <Trans i18nKey='device-company' />,
    width: 200,
    sortable: false,
  },
  {
    field: "createdAt",
    type: "string",
    headerName: <Trans i18nKey='created-at' />,
    width: 120,
    sortable: false,
  },
];

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

export default function Contracts() {
  const { loading, getAllResources} = useApi();
  const [insuranceRequestData, setInsuranceRequestData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await getAllResources(`${baseURL}insuranceRequest`);
        let rows = response?.data?.map((item) => ({
          ...item,
          id: item._id,
          company: item?.company?.legalName
        }));
        setInsuranceRequestData(rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="d-flex flex-column gap-2">
      <div className="info d-flex gap-2 align-items-center flex-sm-row flex-column">
        <h1 className="text-center"><Trans i18nKey='warranty-requests'/></h1>
      </div>
      {insuranceRequestData.length > 0 ? (
        !loading && (
          <DataTable
            columns={columns}
            rows={insuranceRequestData}
            isLoading={loading}
            pageToRedirectTo="contracts"
          ></DataTable>
        )
      ) : (
        <h2>
          <Trans i18nKey="no-data-found" />
        </h2>
      )}
    </div>
  );
}
