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

function HistoryComponent() {
  const [histories, setHistories] = useState<HistoryInterface[]>([]);
  const accessToken = localStorage.getItem("access_token");
  const user = useContext(UserContext);

  useEffect(() => {
    instance
      .get("histories", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        setHistories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the histories!", error);
      });
  }, [accessToken]);

  // Calculate the counts
  const totalHistories = histories.length;
  const trueDengueCount = histories.filter(
    (history) => history.isDengue
  ).length;
  const falseDengueCount = totalHistories - trueDengueCount;
  const positivePercentage = totalHistories
    ? ((trueDengueCount / totalHistories) * 100).toFixed(2)
    : 0;
  const negativePercentage = totalHistories
    ? ((falseDengueCount / totalHistories) * 100).toFixed(2)
    : 0;

  return (
    <StyledContainer sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Sejarah Diagnosa
      </Typography>
      <StyledPaper>
        <Typography variant="subtitle1" gutterBottom>
          Total Sejarah Diagnosa: {totalHistories}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Positif Demam Berdarah: {trueDengueCount}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Persentase positif demam berdarah: {positivePercentage}%
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Negatif Demam Berdarah: {falseDengueCount}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Persentase negatif demam berdarah: {negativePercentage}%
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Nomor
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
              {histories.map((history, index) => (
                <TableRow key={history.id}>
                  <TableCell>{index + 1}</TableCell>
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

export default HistoryComponent;
