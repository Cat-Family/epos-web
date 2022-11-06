import React, { useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, zhCN } from "@mui/x-date-pickers";
import { SnackbarProvider } from "notistack";
import { deepmerge } from "@mui/utils";
import { CssVarsProvider } from "@mui/joy";
import { useRecoilState } from "recoil";

import authAtom from "./state/authState";
import zhLocale from "date-fns/locale/zh-CN";
import { muiTheme, joyTheme } from "./app/theme";

import userActions from "./hooks/useUserActions";

import AppLayout from "./Layout/AppLayout";
import StudioLayout from "./Layout/StudioLayout";
import RequireAuth from "./components/RequireAuth";

import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import BillsPage from "./pages/BillsPage";
import ReportPage from "./pages/ReportPage";
import MissingPage from "./pages/MissingPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

const App = () => {
  const user = userActions();
  const [auth] = useRecoilState(authAtom);

  useLayoutEffect(() => {
    if (auth) {
      user.getUser();
    }
  }, []);

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
            {/* public routes */}
            <Route path="/users/signin" element={<SignInPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* store front routes */}
            <Route element={<RequireAuth allowedRoles={[19999]} />}>
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
            </Route>

            {/* store admin routes */}
            <Route element={<RequireAuth allowedRoles={[29999]} />}>
              <Route path="/studio" element={<StudioLayout />}></Route>
            </Route>

            {/* catch call */}
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </LocalizationProvider>
      </SnackbarProvider>
    </CssVarsProvider>
  );
};

export default App;
