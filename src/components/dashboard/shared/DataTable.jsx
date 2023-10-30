import React from "react";
import "./DataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { deleteUser } from "../../../APIs/users";
import { deleteCompany } from "../../../APIs/companies";

export default function DataTable(props) {
  const { rows, columns } = props;
  // console.log(rows);

  return (
    <div className="data-table">
      <DataGrid
        className="data-grid"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        // For Search Bar
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            // Delay before Search
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[8]}
        // checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        disableColumnMenu
      />
    </div>
  );
}
