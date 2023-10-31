import React, { useEffect, useState } from "react";
import DataTable from "../../../components/dashboard/shared/DataTable";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { useApi } from "../../../contexts/apiContext";
import { baseURL } from "../../../APIs/baseURL";
import noAvatarImg from "../../../assets/images/dashboard/noavatar.png";
import { Spinner } from "../../../components/shared/Spinner";

export default function Users() {
  const { loading, getAllResources, deleteResource, editPartOfResource } = useApi();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await getAllResources(`${baseURL}users/`);
        if (response) {
          const sanitizedRows = response.data.filter(
            (user) => user.role !== "company"
          );
          const rows = sanitizedRows.map((item) => ({
            ...item,
            id: item._id,
          }));
          setUsersData(rows);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteResource(id, `${baseURL}users/`);

      let response = await getAllResources(`${baseURL}users/`);
      if (response) {
        const sanitizedRows = response.data.filter(
          (user) => user.role !== "company"
        );
        const rows = sanitizedRows.map((item) => ({
          ...item,
          id: item._id,
        }));
        setUsersData(rows);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      field: "firstName",
      type: "string",
      headerName: <Trans i18nKey="first-name" />,
      width: 100,
      sortable: false,
    },
    {
      field: "lastName",
      type: "string",
      headerName: <Trans i18nKey="last-name" />,
      width: 100,
      sortable: false,
    },
    {
      field: "role",
      type: "string",
      headerName: <Trans i18nKey="role" />,
      width: 150,
      sortable: false,
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
      field: "verified",
      type: "boolean",
      headerName: <Trans i18nKey="verified" />,
      width: 100,
      sortable: false,
    },
    {
      field: "verifiedEmail",
      type: "boolean",
      headerName: <Trans i18nKey="verified-email" />,
      width: 100,
      sortable: false,
    },
    {
      field: "verifiedPhone",
      type: "boolean",
      headerName: <Trans i18nKey="verified-phone" />,
      width: 150,
      sortable: false,
    }
  ];

  const actionsColumn = {
    field: "actions",
    headerName: <Trans i18nKey='actions' />,
    width: 250,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="d-flex gap-4 flex-sm-row flex-column fs-4">
          <Link
            to={`${params.row._id}`}
            className="action text-info"
            title="View"
          >
            <p className='btn btn-info m-0 p-2'><Trans i18nKey='review' /></p>
          </Link>
          <div
            className="action text-danger"
            title="Delete"
            onClick={() => handleDelete(params.row._id)}
          >
            <p className='btn btn-danger m-0 p-2'><Trans i18nKey='delete' /></p>
          </div>
          <div
            className="action text-warning"
            title="reset password"
            onClick={() => handleResetPass(params.row._id,params.row.email)}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </div>
        </div>
      );
    },
  };
  columns.push(actionsColumn);

  const handleResetPass = async (id,email) => {
    try{
      await editPartOfResource(id, email, `${baseURL}auth/resetpassword`);
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div className="info d-flex gap-2 align-items-center flex-sm-row flex-column">
        <h1>
          <Trans i18nKey="users"></Trans>
        </h1>
        <Link to={"add"} className="btn btn-success">
          <Trans i18nKey="add-new-user"></Trans>
        </Link>
      </div>

      {loading && <Spinner />}
      {!loading && (usersData?.length > 0 ? (
        <DataTable
          columns={columns}
          rows={usersData}
          isLoading={loading}
          pageToRedirectTo="users"

        ></DataTable>
      ) : (
        <h2>
          <Trans i18nKey="no-data-found" />
        </h2>
      ))}
    </div>
  );
}
