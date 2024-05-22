import React, { useState } from "react";
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import api from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateType, setUpdateType] = useState("info");
  const [errorType, setErrorType] = useState("");

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

  const handleFormSubmit = (event) => {
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
        console.log(response.data);
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
            height: "320px",
            marginLeft: "0",
            borderRadius: "15px",
          }}
        >
          <CardContent>
            <form onSubmit={handleFormSubmit}>
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
                  <Grid item xs={12} style={{ paddingTop: "1rem" }}>
                    <FormControl fullWidth margin="dense">
                      <TextField
                        error={hasUserNameError}
                        helperText={hasUserNameError && updateMessage}
                        id="email"
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
                        style={{ background: "white" }}
                        placeholder="Lösenord"
                        name="password"
                        variant="outlined"
                        onChange={handleInputChange}
                        type="password"
                        value={data.password}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="dense">
                      <Button
                        className="login-button"
                        disabled={data.isSubmitting}
                        onClick={handleFormSubmit}
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
                  <Grid item xs={12}>
                    {hasUnknownError && (
                      <Alert severity={updateType}>{updateMessage}</Alert>
                    )}
                  </Grid>
                </Grid>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
