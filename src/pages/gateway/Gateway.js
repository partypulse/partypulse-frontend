import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import api from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import "./LoginPage.css";

function Gateway() {
  const { login } = useAuth();
  const [view, setView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateType, setUpdateType] = useState("info");
  const [errorType, setErrorType] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/register") {
      setView("register");
    } else {
      setView("login");
    }
  }, []);
  const [data, setData] = useState({
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    const loginRequest = {
      email: data.email,
      password: data.password,
    };

    api
      .post("/auth/login", loginRequest)
      .then((response) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: null,
        });
        login(response.data);
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.response.data.errorMessage,
        });
        console.error(error);

        setErrorType(error.response.data.errorType);
        setLoading(false);
        setUpdateMessage(error.response.data.errorMessage);
        setUpdateType("error");
        setHasUpdated(true);
        setTimeout(() => {
          setUpdateMessage("");
          setHasUpdated(false);
          setUpdateType("info");
        }, 2000);
      });
  };
  const handleRegister = async (e) => {
    e.preventDefault(); // sidan laddas inte om
    setLoading(true);

    try {
      api
        .post("/auth/register", { email: data.email, password: data.password })
        .then((response) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: null,
          });
          setLoading(false);

          login(response.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const hasPasswordError =
    hasUpdated && updateType === "error" && errorType === "incorrect-password";
  const hasUserNameError =
    hasUpdated && updateType === "error" && errorType === "no-user-found";
  const hasUnknownError =
    hasUpdated && updateType === "error" && errorType === "unknown-error";

  return (
    <div className={"login-background"}>
      <div className="login-container">
        <Card
          className={"login-card"}
          style={{
            textAlign: "center",
            height: "360px",
            marginLeft: "0",
            borderRadius: "15px",
          }}
        >
          <CardContent>
            <Box>
              {loading ? (
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{ padding: "3rem", textAlign: "center" }}
                  >
                    <CircularProgress style={{ margin: "2rem auto" }} />
                  </Grid>
                </Grid>
              ) : (
                <Grid container>
                  {view === "login" ? (
                    <h4>Inloggning</h4>
                  ) : (
                    <h4>Registrering</h4>
                  )}
                  <Grid item xs={12} style={{ paddingTop: "1rem" }}>
                    <FormControl fullWidth margin="dense">
                      <TextField
                        error={hasUserNameError}
                        helperText={hasUserNameError && updateMessage}
                        id="email"
                        autoComplete="off"
                        style={{ background: "white" }}
                        placeholder="Epost"
                        name="email"
                        onChange={handleInputChange}
                        type="text"
                        variant="outlined"
                        value={data.email}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{ height: "4rem" }}>
                    <FormControl fullWidth margin="dense">
                      <TextField
                        error={hasPasswordError}
                        helperText={hasPasswordError && updateMessage}
                        id="password"
                        autoComplete="off"
                        style={{ background: "white" }}
                        placeholder="Lösenord"
                        name="password"
                        variant="outlined"
                        onChange={handleInputChange}
                        type="password"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            if (view === "login") {
                              handleLogin(e);
                            } else {
                              handleRegister(e);
                            }
                          }
                        }}
                        value={data.password}
                      />
                    </FormControl>
                  </Grid>
                  {view === "login" ? (
                    <Grid item xs={12}>
                      <FormControl fullWidth margin="dense">
                        <Button
                          className="login-button"
                          disabled={data.isSubmitting}
                          onClick={handleLogin}
                          size="large"
                          style={{
                            background: "#000000",
                            padding: "15px",
                            textTransform: "none",
                            color: "white",
                          }}
                          type="submit"
                          variant="contained"
                        >
                          Logga in
                        </Button>
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <FormControl fullWidth margin="dense">
                        <Button
                          className="login-button"
                          disabled={data.isSubmitting}
                          onClick={handleRegister}
                          size="large"
                          style={{
                            background: "#000000",
                            padding: "15px",
                            textTransform: "none",
                            color: "white",
                          }}
                          type="submit"
                          variant="contained"
                        >
                          Skapa konto
                        </Button>
                      </FormControl>
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={12}
                    sx={{
                      paddingTop: "1rem",
                      display: "flex",
                      justifyContent: "right",
                      gap: "1rem",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <FormHelperText>
                      {view === "login" ? "Inte medlem?" : "Redan medlem?"}
                    </FormHelperText>
                    {view === "login" ? (
                      <Button
                        onClick={() => setView("register")}
                        sx={{ textTransform: "none" }}
                      >
                        Skapa nytt konto
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setView("login")}
                        sx={{ textTransform: "none" }}
                      >
                        Logga in
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {hasUnknownError && (
                      <Alert severity={updateType}>{updateMessage}</Alert>
                    )}
                  </Grid>
                </Grid>
              )}
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Gateway;
