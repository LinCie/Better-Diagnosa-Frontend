import { Container, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function DiagnoseResult() {
  const location = useLocation();
  const { result } = location.state;

  return (
    <Container sx={{ textAlign: "center", mt: 15, mb: 4 }}>
      <Typography variant="h4" component="h2">
        {result ? "Anda terdiagnosa DBD" : "Anda tidak terdiagnosa DBD"}
      </Typography>
      {result && (
        <Button
          component={Link}
          to="/info"
          variant="contained"
          sx={{ mt: 4, mr: 2 }}
        >
          Penanganan DBD
        </Button>
      )}
      <Button
        component={Link}
        to="/diagnose"
        variant="contained"
        sx={{ mt: 4 }}
      >
        Kembali ke Diagnosa
      </Button>
    </Container>
  );
}

export default DiagnoseResult;
