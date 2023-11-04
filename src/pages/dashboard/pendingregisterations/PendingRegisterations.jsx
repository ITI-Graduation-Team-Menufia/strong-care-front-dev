import DataTable from "../../../components/dashboard/shared/DataTable";
import noAvatarImg from "../../../assets/images/dashboard/noavatar.png";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { useEffect, useState } from "react";
import { baseURL } from "../../../APIs/baseURL";
import { Spinner } from "../../../components/shared/Spinner";

// COLUMNS FOR DATA TABLE
const columns = [
  {
    field: "profileImg",
    headerName: <Trans i18nKey="profile-img" />,
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return <img src={params.row?.profileImg?.url || noAvatarImg} alt="" />;
    },
  },
  // {
  //     field: 'firstName',
  //     type: 'string',
  //     headerName: 'First name',
  //     width: 100,
  //     sortable: false
  //     //   editable: true,
  // },
  // {
  //     field: 'lastName',
  //     type: 'string',
  //     headerName: 'Last name',
  //     width: 100,
  //     sortable: false
  //     //   editable: true,
  // },
  {
    field: "legalName",
    type: "string",
    headerName: <Trans i18nKey="legal-name" />,
    width: 150,
    sortable: false,
    //   editable: true,
  },
  {
    field: "email",
    type: "email",
    headerName: <Trans i18nKey="email" />,
    width: 250,
    sortable: false,
  },
  {
    field: "phone",
    type: "string",
    headerName: <Trans i18nKey="phone" />,
    width: 150,
    sortable: false,
  },
  {
    field: "state",
    type: "string",
    headerName: <Trans i18nKey="state" />,
    width: 100,
    sortable: false,
  },
  {
    field: "country",
    headerName: <Trans i18nKey="country" />,
    width: 150,
    sortable: false,
  },
  {
    field: "legalLocation",
    headerName: <Trans i18nKey="legal-office" />,
    width: 150,
    sortable: false,
  },
  {
    field: "noCommercialRegister",
    headerName: <Trans i18nKey="commercial-registeration-no" />,
    width: 150,
    sortable: false,
  },
  {
    field: "identificationNo",
    type: "string",
    headerName: <Trans i18nKey="identification-number" />,
    width: 150,
    sortable: false,
  },
];

const actionsColumn = {
  field: "actions",
  headerName: <Trans i18nKey="actions" />,
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

export default function PendingRegisterations() {
  const { loading, getAllResources } = useApi();
  const [companiesData, setCompaniesData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await getAllResources(`${baseURL}users/company`);
        let sanitizedRows = response?.data.map((company) => {
          delete company?.user?._id;
          return { ...company, ...company?.user };
        });
        sanitizedRows.forEach((company) => {
          delete company?.user;

          let rows = sanitizedRows.map((item) => ({
            ...item,
            id: item._id,
          }));
          setCompaniesData(rows);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  // Filtering pending companies to be displayed
  let companiesRows = companiesData.filter(
    (companyRow) => companyRow.state === "pending"
  );

  return (
    <div className="d-flex flex-column gap-2">
      <div className="info d-flex gap-2 align-items-center flex-sm-row flex-column">
        <h1>
          <Trans i18nKey="pending-registerations" />
        </h1>
      </div>

      {loading && <Spinner/>}
      {!loading && (companiesRows?.length > 0 ? (
        <DataTable
          columns={columns}
          rows={companiesRows}
          isLoading={loading}
          pageToRedirectTo="companies"

        ></DataTable>
      ) : (
        <h2>
          <Trans i18nKey="no-data-found" />
        </h2>
      ))}
    </div>
  );
}
