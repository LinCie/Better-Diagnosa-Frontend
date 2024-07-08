import { Coronavirus } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Index() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: { xs: 2, md: 6 }, height: "100vh" }}
    >
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ padding: { xs: 2, md: 4 } }}
      >
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          fontWeight={700}
          textAlign={{ xs: "center", md: "left" }}
          sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
        >
          Diagnosa Penyakit Demam Berdarah Sebelum Terlambat Dengan Mudah
        </Typography>
        <Typography
          component="h2"
          variant="body1"
          marginBottom={3}
          textAlign={{ xs: "center", md: "left" }}
          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
        >
          Cegah gejala DBD yang lebih parah dengan diagnosa yang lebih awal
        </Typography>
        <Box display="flex" justifyContent={{ xs: "center", md: "flex-start" }}>
          <Button
            component={Link}
            to="/diagnose"
            color="primary"
            variant="contained"
          >
            Mulai Diagnosa
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: { xs: 2, md: 4 } }}
      >
        <Coronavirus
          sx={{
            height: { xs: "50%", md: "70%" },
            width: { xs: "50%", md: "70%" },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Index;
