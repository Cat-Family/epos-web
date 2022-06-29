import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { CardHeader, Grid, IconButton, Toolbar } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const HomePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        width: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          variant="scrollable"
          allowScrollButtonsMobile={true}
          scrollButtons="auto"
          onChange={handleChange}
          sx={{
            position: "fixed",
            borderRight: 1,
            height: "70%",
            borderColor: "divider",
          }}
        >
          <Tab label="鸡杂" {...a11yProps(0)} />
          <Tab label="干锅" {...a11yProps(1)} />
          <Tab label="汤锅" {...a11yProps(2)} />
          <Tab label="炒菜" {...a11yProps(3)} />
          <Tab label="汤" {...a11yProps(4)} />
          <Tab label="配菜" {...a11yProps(5)} />
          <Tab label="酒水" {...a11yProps(6)} />
        </Tabs>
        <Box sx={{ width: 120 }} />
        <Grid p={1} flexGrow={1} container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <Grid item key={item} xs={6} sm={6} md={4} lg={3} xl={2}>
              <Card>
                <CardHeader subheader="Shrimp" />
                <CardMedia
                  component="img"
                  image="https://qy-jz.oss-cn-beijing.aliyuncs.com/jz/IMG_3695.PNG"
                  alt="Paella dish"
                />
                <CardActions disableSpacing>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "fixed", bottom: 64, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default HomePage;
