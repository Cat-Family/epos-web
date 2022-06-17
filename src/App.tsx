import React, { useState } from "react";
import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from "@mantine/core";
import AppLayout from "./Layout/AppLayout";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                toggleColorScheme={toggleColorScheme}
                colorScheme={colorScheme}
              />
            }
          >
            <Route index element={<div>首页</div>} />
            <Route path="/orders" element={<div>订单</div>} />
            <Route path="/bill" element={<div>账单</div>} />
            <Route path="/report" element={<div>报表</div>} />
          </Route>
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
