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

const AdminProductsPage = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    api
      .get("/admin/products")
      .then((response) => {
        setData(response.data);
        isLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Grid container>
      <h2>Products</h2>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell>Produktnamn</TableCell>
                <TableCell sx={{ width: "300px" }}>Info</TableCell>
                <TableCell>Pris</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Huvudkategori</TableCell>
                <TableCell>Underkategori</TableCell>
                <TableCell>Bild</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((x, index) => (
                <TableRow key={index}>
                  <TableCell>{x._id}</TableCell>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{x.info}</TableCell>
                  <TableCell>{x.price}</TableCell>
                  <TableCell>{x.stock}</TableCell>
                  <TableCell>{x.mainCategory}</TableCell>
                  <TableCell>{x.subCategory}</TableCell>
                  <TableCell>{x.image}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    </Grid>
  );
};
export default AdminProductsPage;
