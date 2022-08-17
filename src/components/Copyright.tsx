import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="https://beian.miit.gov.cn/">
        渝ICP备2022009197号
      </Link>{" "}
    </Typography>
  );
};

export default Copyright;
