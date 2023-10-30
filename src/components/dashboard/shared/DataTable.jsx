import React from "react";
import "./DataTable.scss";
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import i18n from "../../../i18n";



export default function DataTable(props) {
  const { rows, columns } = props;

  const textDirection = i18n.languages[0] === 'ar' ? 'rtl' : 'ltr';

  const theme = createTheme({
    direction: textDirection, // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </CacheProvider>
  );
}
