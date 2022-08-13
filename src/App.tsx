import React, { useState } from "react";
import AppLayout from "./Layout/AppLayout";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import BillsPage from "./pages/BillsPage";
import ReportPage from "./pages/ReportPage";
import SignInPage from "./pages/SignInPage";
import { SnackbarProvider } from "notistack";
import { deepmerge } from "@mui/utils";
import { CssVarsProvider } from "@mui/joy";
import { muiTheme, joyTheme } from "./app/theme";

const App = () => {
  return (
    <CssVarsProvider theme={deepmerge(muiTheme, joyTheme)}>
      <SnackbarProvider autoHideDuration={2000} dense>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="bills" element={<BillsPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Route>
          <Route path="/users/signin" element={<SignInPage />} />
        </Routes>
      </SnackbarProvider>
    </CssVarsProvider>
  );
};

export default App;
