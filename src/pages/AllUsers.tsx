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
  Button,
  TextField,
  Modal,
} from "@mui/material";
import UserData from "../interfaces/userdata";
import instance from "../lib/instance";

const AllUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [dengueStats, setDengueStats] = useState({ positive: 0, negative: 0 });
  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
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
  };

  const handleEditUser = (user: UserData) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    instance
      .delete(`users/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const handleSaveUser = () => {
    if (editUser) {
      instance
        .patch(`users/${editUser.id}`, editUser, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          fetchUsers();
          setModalOpen(false);
        })
        .catch((error) => {
          console.error("There was an error updating the user!", error);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser({ ...editUser!, [e.target.name]: e.target.value });
  };

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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditUser(user)}
                    sx={{ mr: 3 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          {editUser && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Edit User
              </Typography>
              <TextField
                label="Username"
                name="username"
                value={editUser.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                onClick={handleSaveUser}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default AllUsers;
