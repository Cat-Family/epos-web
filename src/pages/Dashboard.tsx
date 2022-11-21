import { Container, Grid } from "@mui/joy";
import Paper from "@mui/material/Paper";

const DashboardPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            {/* <Chart /> */}
            Chart
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            Deposits
            {/* <Deposits /> */}
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {/* <Orders /> */}
            Orders
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
