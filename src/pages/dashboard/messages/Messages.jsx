import React, { useEffect, useState } from 'react'
import { useApi } from '../../../contexts/apiContext';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import DataTable from '../../../components/dashboard/shared/DataTable';
import { baseURL } from '../../../APIs/baseURL';
import { Spinner } from '../../../components/shared/Spinner';

export function Messages() {
    const { loading, getAllResources, deleteResource } = useApi();
    const [messagesData, setMessagesData] = useState([]);


    useEffect(() => {
        const fetch = async () => {
            try {
                let response = await getAllResources(`${baseURL}contactus`);
                let rows = response?.data?.map((item) => ({
                    ...item,
                    id: item._id,
                }));
                setMessagesData(rows);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    let handleDelete = async (id) => {
        try {
            await deleteResource(id, `${baseURL}contactus`);

            let response = await getAllResources(`${baseURL}contactus`);
            let rows = response?.data?.map((item) => ({
                ...item,
                id: item._id,
            }));
            setMessagesData(rows);
        } catch (error) {
            console.log(error);
        }
        console.log(id + " has been deleted!");
    };

    // COLUMNS FOR DATA TABLE
    const columns = [
        {
            field: "name",
            type: "string",
            headerName: <Trans i18nKey='name' />,
            width: 150,
            sortable: false,
        },
        {
            field: "email",
            type: "string",
            headerName: <Trans i18nKey='email' />,
            width: 200,
            sortable: false,
        },
        {
            field: "phone",
            type: "string",
            headerName: <Trans i18nKey='phone' />,
            width: 150,
            sortable: false,
        },
        {
            field: "message",
            type: "string",
            headerName: <Trans i18nKey='message' />,
            width: 200,
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
                        <i className="bi bi-pencil-square"></i>
                    </Link>
                    <div
                        className="action text-danger"
                        title="delete"
                        onClick={() => handleDelete(params.row._id)}
                    >
                        <i className="bi bi-trash"></i>
                    </div>
                </div>
            );
        },
    };
    columns.push(actionsColumn);

    return (
        <div className="d-flex flex-column gap-2 text-center">
            <div className="info d-flex gap-2 align-items-center flex-sm-row flex-column">
                <h1 className="text-center"><Trans i18nKey='clients-messages' /></h1>
            </div>
            {loading && <Spinner />}
            {!loading && (messagesData?.length > 0 ? (
                <DataTable
                    columns={columns}
                    rows={messagesData}
                    isLoading={loading}
                ></DataTable>
            ) : (
                <h2>
                    <Trans i18nKey="no-data-found" />
                </h2>
            ))}

        </div>
    )
}
