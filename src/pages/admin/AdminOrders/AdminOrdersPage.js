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

const AdminOrdersPage = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    api
      .get("/admin/orders")
      .then((response) => {
        setData(response.data);
        isLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Grid container>
      <h2>Orders</h2>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>total_price</TableCell>
                <TableCell>order_date</TableCell>
                <TableCell>delivery_address</TableCell>
                <TableCell>status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((x, index) => (
                <TableRow key={index}>
                  <TableCell>{x._id}</TableCell>
                  <TableCell>{x.total_price}</TableCell>
                  <TableCell>{x.order_date}</TableCell>
                  <TableCell>{x.delivery_address}</TableCell>
                  <TableCell>{x.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    </Grid>
  );
};
export default AdminOrdersPage;
