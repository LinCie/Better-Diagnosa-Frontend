import { Coronavirus } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Index() {
  return (
    <Grid container spacing={5} paddingLeft={6} height="100vh">
      <Grid
        item
        xs={12}
        md={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          fontWeight={700}
        >
          Diagnosa Penyakit Demam Berdarah Sebelum Terlambat Dengan Mudah
        </Typography>
        <Typography component="h2" variant="body1" marginBottom={3}>
          Cegah gejala DBD yang lebih parah dengan diagnosa yang lebih awal
        </Typography>
        <Box>
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
        md={7}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Coronavirus sx={{ height: "70%", width: "70%" }} />
      </Grid>
    </Grid>
  );
}

export default Index;
