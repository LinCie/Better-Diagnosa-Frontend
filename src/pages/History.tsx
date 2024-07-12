import { useContext, useEffect, useState } from "react";
import HistoryInterface from "../interfaces/history";
import instance from "../lib/instance";
import {
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { UserContext } from "../rootContext";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

function History() {
  const [histories, setHistories] = useState<HistoryInterface[]>([]);

  const accessToken = localStorage.getItem("access_token");

  const user = useContext(UserContext);

  useEffect(() => {
    instance
      .get("history", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        setHistories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the histories!", error);
      });
  }, []);

  return (
    <StyledContainer sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Sejarah Diagnosa
      </Typography>
      <StyledPaper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  User
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Hasil Diagnosa
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Timestamp
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories.map((history) => (
                <TableRow key={history.id}>
                  <TableCell>{history.id}</TableCell>
                  <TableCell>{user?.user?.username}</TableCell>
                  <TableCell>
                    {history.isDengue ? "Terdiagnosa" : "Tidak Terdiagnosa"}
                  </TableCell>
                  <TableCell>
                    {new Date(history.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </StyledContainer>
  );
}

export default History;
