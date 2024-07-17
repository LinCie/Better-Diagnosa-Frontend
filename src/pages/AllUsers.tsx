import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import UserData from "../interfaces/userdata";
import instance from "../lib/instance";

const AllUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [dengueStats, setDengueStats] = useState({ positive: 0, negative: 0 });

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    instance
      .get("users", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        setUsers(response.data);
        const usersData = response.data;

        // Calculate dengue stats
        let positive = 0;
        let negative = 0;
        usersData.forEach((user: UserData) => {
          user.histories.forEach((hist) => {
            if (hist.isDengue) {
              positive++;
            } else {
              negative++;
            }
          });
        });

        setUsers(usersData);
        setDengueStats({ positive, negative });
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const totalDiagnoses = dengueStats.positive + dengueStats.negative;
  const positivePercentage = totalDiagnoses
    ? ((dengueStats.positive / totalDiagnoses) * 100).toFixed(2)
    : 0;
  const negativePercentage = totalDiagnoses
    ? ((dengueStats.negative / totalDiagnoses) * 100).toFixed(2)
    : 0;

  return (
    <Box sx={{ mt: 12, px: 5 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700 }}
        component="h1"
        gutterBottom
      >
        Pengguna
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Total pengguna terdaftar: {users.length}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        Total diagnosa {totalDiagnoses}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        Positif demam berdarah: {dengueStats.positive}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        Persentase positif demam berdarah: {positivePercentage}%
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        Negatif demam berdarah: {dengueStats.negative}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        Persentase negatif demam berdarah: {negativePercentage}%
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Username</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllUsers;
