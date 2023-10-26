import DataTable from "../../../components/dashboard/shared/DataTable";
import noAvatarImg from "../../../assets/images/dashboard/noavatar.png";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";
import { useEffect, useState } from "react";


export default function Companies() {
  const { loading, getAllResources, deleteResource } = useApi();
  const [companiesData, setCompaniesData] = useState([]);

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
      width: 200,
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
      width: 100,
      sortable: false,
    },
    {
      field: "legalLocation",
      headerName: <Trans i18nKey="legal-office" />,
      width: 100,
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
      headerName: <Trans i18nKey="agent-identification-number" />,
      width: 150,
      sortable: false,
    },
  ];

  let handleDelete = async (id) => {
    try {
      await deleteResource(id, `${baseURL}users/company`);

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
    console.log(id + " has been deleted!");
  };

  let handleResetPass = (id) => {
    console.log(id + " password has been reset");
  };
  

  const actionsColumn = {
    field: "actions",
    headerName: "Actions",
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
            <i className="bi bi-pencil-square"></i>
          </Link>
          <div
            className="action text-danger"
            title="delete"
            onClick={() => handleDelete(params.row._id)}
          >
            <i className="bi bi-trash"></i>
          </div>
          <div
            className="action text-warning"
            title="reset password"
            onClick={() => handleResetPass(params.row._id)}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </div>
        </div>
      );
    },
  };
  columns.push(actionsColumn);

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

  return (
    <div className="d-flex flex-column gap-2">
      <div className="info d-flex gap-2 align-items-center flex-sm-row flex-column">
        <h1>
          <Trans i18nKey="companies" />
        </h1>
        <Link to={"add"} className="btn btn-success">
          <Trans i18nKey="add-new-company" />
        </Link>
      </div>
      {companiesData.length > 0 ? (
        !loading && (
          <DataTable
            columns={columns}
            rows={companiesData}
            isLoading={loading}
            pageToRedirectTo="companies"
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
