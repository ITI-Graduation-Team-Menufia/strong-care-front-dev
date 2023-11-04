import DataTable from "../../../components/dashboard/shared/DataTable";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { useEffect, useState } from "react";
import { baseURL } from "../../../APIs/baseURL";
import { Spinner } from "../../../components/shared/Spinner";
import { formatDate } from "../../../utils/formatDate";

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
    width: 250,
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
    width: 150,
    sortable: false,
  },
  {
    field: "state",
    type: "string",
    headerName: <Trans i18nKey='state' />,
    width: 150,
    sortable: false,
  },
];

const actionsColumn = {
  field: "actions",
  headerName: <Trans i18nKey='actions' />,
  width: 100,
  sortable: false,
  renderCell: (params) => {
    return (
      <div className="d-flex gap-4 flex-sm-row felx-column fs-4">
        <Link
          to={`${params.row._id}`}
          className="action text-info"
          title="view"
        >
          <p className='btn btn-info m-0 p-2'><Trans i18nKey='review' /></p>
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

      {loading && <Spinner />}
      {!loading && (insuranceRequestData?.length > 0 ? (
        <DataTable
          columns={columns}
          rows={insuranceRequestData.map(request => {request.createdAt = formatDate(request.createdAt); return request})}
          isLoading={loading}
          pageToRedirectTo="contracts"

        ></DataTable>
      ) : (
        <h2>
          <Trans i18nKey="no-data-found" />
        </h2>
      ))}
    </div>
  );
}
