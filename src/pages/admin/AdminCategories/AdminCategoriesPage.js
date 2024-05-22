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

const AdminCategoriesPage = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    api
      .get("/admin/categories")
      .then((response) => {
        setData(response.data);
        isLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Grid container>
      <h2>Categories</h2>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Namn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((x, index) => (
                <TableRow key={index}>
                  <TableCell>{x._id}</TableCell>
                  <TableCell>{x.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    </Grid>
  );
};
export default AdminCategoriesPage;
