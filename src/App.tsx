import React, { useState } from "react";
import AppLayout from "./Layout/AppLayout";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<div>首页</div>} />
        <Route path="/orders" element={<div>订单</div>} />
        <Route path="/bill" element={<div>账单</div>} />
        <Route path="/report" element={<div>报表</div>} />
      </Route>
    </Routes>
  );
};

export default App;
