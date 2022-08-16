import React from "react";
import AppLayout from "./Layout/AppLayout";
import { Routes, Route } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, zhCN } from "@mui/x-date-pickers";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import BillsPage from "./pages/BillsPage";
import ReportPage from "./pages/ReportPage";
import SignInPage from "./pages/SignInPage";
import { SnackbarProvider } from "notistack";
import { deepmerge } from "@mui/utils";
import { CssVarsProvider } from "@mui/joy";
import { muiTheme, joyTheme } from "./app/theme";
import zhLocale from "date-fns/locale/zh-CN";
import StudioLayout from "./Layout/StudioLayout";

const App = () => {
  return (
    <CssVarsProvider theme={deepmerge(muiTheme, joyTheme)}>
      <SnackbarProvider autoHideDuration={1000} dense>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={zhLocale}
          localeText={
            zhCN.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="bills" element={<BillsPage />} />
              <Route path="/report" element={<ReportPage />} />
            </Route>
            <Route path="/users/signin" element={<SignInPage />} />
            <Route path="/studio" element={<StudioLayout />}></Route>
          </Routes>
        </LocalizationProvider>
      </SnackbarProvider>
    </CssVarsProvider>
  );
};

export default App;
