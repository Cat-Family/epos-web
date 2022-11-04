import React, { useLayoutEffect, useState } from "react";
import AppLayout from "./Layout/AppLayout";
import { Routes, Route, redirect, Navigate } from "react-router-dom";
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
import userActions from "./actions/useUserActions";
import { useRecoilState } from "recoil";
import authAtom from "./state/authState";

const App = () => {
  const user = userActions();

  if (authAtom) {
    user.getUser();
  }
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
              <Route
                index
                element={
                  <React.Suspense fallback={<div>loading</div>}>
                    <HomePage />
                  </React.Suspense>
                }
              />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="bills" element={<BillsPage />} />
              <Route path="/report" element={<ReportPage />} />
            </Route>
            <Route path="/studio" element={<StudioLayout />}></Route>

            <Route path="/users/signin" element={<SignInPage />} />
          </Routes>
        </LocalizationProvider>
      </SnackbarProvider>
    </CssVarsProvider>
  );
};

export default App;
