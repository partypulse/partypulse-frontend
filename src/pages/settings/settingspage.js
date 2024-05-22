import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import api from "../../api/api";

export default function UserSettingsPage() {
  const [data, setData] = useState({});

  const [hasUpdated, setHasUpdated] = useState(false);
  const [loading, isLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateType, setUpdateType] = useState("");
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    api
      .get("/user/getuser/" + localStorage.getItem("_userId"))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    const requestObject = {
      ...data,
      [event.target.name]: event.target.value,
    };
    setData(requestObject);
  };

  function saveToServer(requestObject) {
    isLoading(true);
    api
      .put("/user/updateuser/" + data._id, requestObject)
      .then(() => {
        isLoading(false);
        setUpdateMessage("Sparat!");
        setHasUpdated(true);
        setUpdateType("success");
        window.location.reload();
        setTimeout(() => {
          setUpdateMessage("");
          setHasUpdated(false);
          setUpdateType(null);
        }, 2000);
      })
      .catch(function (error) {
        isLoading(false);
        setUpdateMessage("Okänt fel - det gick inte att spara");
        setUpdateType("error");
        setHasUpdated(true);
        setTimeout(() => {
          setUpdateMessage("");
          setHasUpdated(false);
          setUpdateType(null);
        }, 2000);
      });
  }

  return (
    <Grid container>
      {hasUpdated && (
        <Grid
          item
          xs={12}
          style={{
            textAlign: "right",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "right",
          }}
        >
          <Typography variant="body1" style={{ color: "green" }}>
            {updateMessage}
          </Typography>
        </Grid>
      )}
      {loading && !hasUpdated && (
        <Grid
          item
          xs={12}
          style={{
            textAlign: "right",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "right",
          }}
        >
          <CircularProgress size="1rem" style={{ color: "gray" }} /> Sparar...
        </Grid>
      )}
      <Grid item xs={12} sx={{ padding: "1rem" }}>
        <h3>Användarinställningar</h3>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2} sx={{ padding: "1rem" }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="dense">
              <TextField
                id="firstname"
                name="firstname"
                size="small"
                helperText="Förnamn"
                value={data.firstname}
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="dense">
              <TextField
                id="lastname"
                size="small"
                name="lastname"
                helperText="Efternamn"
                value={data.lastname}
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="dense">
              <TextField
                id="email"
                name="email"
                size="small"
                helperText="Epost"
                value={data.email}
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <TextField
                id="password"
                name="password"
                size="small"
                helperText="Lösenord"
                value={data.password}
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <LoadingButton
              size="large"
              variant="contained"
              sx={{ textTransform: "none" }}
              loading={loading}
              onClick={() => saveToServer(data)}
            >
              Spara
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
