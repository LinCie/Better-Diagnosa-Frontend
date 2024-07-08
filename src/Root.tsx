import { Close, CoronavirusSharp, Menu, Person } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LoginContext, UsernameContext } from "./rootContext";
import axios from "axios";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const loginContext = useContext(LoginContext);
  const usernameContext = useContext(UsernameContext);

  const navigate = useNavigate();

  function handleMenuClick() {
    setDrawerOpen(!drawerOpen);
  }

  async function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate(0);
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CoronavirusSharp sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Diagnosa DBD
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            {loginContext?.isLoggedIn ? (
              <>
                <Button
                  onClick={() => loginContext.setIsLoggedIn(false)}
                  color="inherit"
                  sx={{ fontWeight: 700, mr: 2 }}
                >
                  Logout
                </Button>
                <Typography variant="body1">
                  Hello, {usernameContext?.username}
                </Typography>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  sx={{ fontWeight: 700 }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  color="inherit"
                  sx={{ fontWeight: 700 }}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <Menu />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box
                role="presentation"
                onClick={() => setDrawerOpen(false)}
                onKeyDown={() => setDrawerOpen(false)}
                sx={{ width: 250 }}
              >
                <Box
                  display="flex"
                  padding={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center">
                    <CoronavirusSharp sx={{ mr: 1 }} />
                    <Typography
                      variant="h6"
                      noWrap
                      component={RouterLink}
                      to="/"
                      sx={{
                        mr: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Diagnosa DBD
                    </Typography>
                  </Box>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu-close"
                    onClick={handleLogout}
                  >
                    <Close />
                  </IconButton>
                </Box>

                <Divider />

                <List>
                  {loginContext?.isLoggedIn ? (
                    <>
                      <ListItem onClick={handleLogout}>
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "black", fontWeight: 700 }}
                          primary="Logout"
                        />
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem component={RouterLink} to="/login">
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "black", fontWeight: 700 }}
                          primary="Login"
                        />
                      </ListItem>
                      <ListItem component={RouterLink} to="/signup">
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "black", fontWeight: 700 }}
                          primary="Signup"
                        />
                      </ListItem>
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  async function getAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) return;

    try {
      const refreshResponse = await axios.post(
        "/api/auth/refresh",
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );

      const accessToken: string = refreshResponse.data.access_token;
      localStorage.setItem("access_token", accessToken);

      const usernameResponse = await axios.get("/api/users/username", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const returnedUsername: string = usernameResponse.data;
      setUsername(returnedUsername);

      setIsLoggedIn(true);
    } catch (error) {
      localStorage.removeItem("refresh_token");
      throw error;
    }
  }

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <UsernameContext.Provider value={{ username, setUsername }}>
          <Header />
          <Outlet />
        </UsernameContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default Root;
