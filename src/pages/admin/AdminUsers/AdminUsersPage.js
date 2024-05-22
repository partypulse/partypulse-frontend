import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "../../../api/api";

const AdminUsersPage = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    api
      .get("/admin/users")
      .then((response) => {
        setData(response.data);
        isLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Grid container>
      <h2>Users</h2>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Förnamn</TableCell>
                <TableCell>Efternamn</TableCell>
                <TableCell>Epost</TableCell>
                <TableCell>Lösenord</TableCell>
                <TableCell>Roll</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((x, index) => (
                <TableRow key={index}>
                  <TableCell>{x.firstname}</TableCell>
                  <TableCell>{x.lastname}</TableCell>
                  <TableCell>{x.email}</TableCell>
                  <TableCell>{x.password}</TableCell>
                  <TableCell>{x.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    </Grid>
  );
};
export default AdminUsersPage;
