import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const AdminPage = () => {
  useEffect(() => {}, []);
  return (
    <Grid container>
      <h2>Admin page</h2>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "left", gap: "1rem" }}
      >
        <Link to={"/admin/orders"}>Beställningar</Link>
        <Link to={"/admin/products"}>Produkter</Link>
        <Link to={"/admin/categories"}>Kategorier</Link>
        <Link to={"/admin/users"}>Användare</Link>
      </Grid>
    </Grid>
  );
};
export default AdminPage;
