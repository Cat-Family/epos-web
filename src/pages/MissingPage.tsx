import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/joy";

function MissingPage() {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
      }}
    >
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            display: "inline-block",
            margin: "0",
            marginRight: "20px",
            padding: "0 23px 0 0",
            fontSize: "24px",
            fontWeight: "500",
            verticalAlign: "top",
            lineHeight: "49px",
            borderRight: (t) =>
              t.palette.mode === "light"
                ? "1px solid rgba(0, 0, 0, .3)"
                : "1px solid rgba(255, 255, 255, .3)",
          }}
          component="h1"
        >
          404
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "normal",
            lineHeight: "49px",
            margin: 0,
            padding: 0,
          }}
          component="h2"
        >
          This page could not be found.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MissingPage;
