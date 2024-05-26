import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import api from "../../../api/api";
import CategoryFormDialog from "./CategoryFormDialog";

const AdminCategoriesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api
      .get("/admin/categories")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = (categoryId) => {
    api
      .delete(`/category/deletecategory/${categoryId}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => console.error("Failed to delete category:", error));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    fetchData();
  };

  const handleSave = (savedCategory) => {
    if (selectedCategory) {
      setData((prevData) =>
        prevData.map((category) =>
          category._id === savedCategory._id ? savedCategory : category
        )
      );
    } else {
      setData((prevData) => [...prevData, savedCategory]);
    }
    fetchData();
  };

  return (
    <Grid container>
      <h2>Categories</h2>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Skapa Kategori
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Åtgärder</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Namn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((x, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(x)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(x._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell>{x._id}</TableCell>
                  <TableCell>{x.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
      <CategoryFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        category={selectedCategory}
        onSave={handleSave}
      />
    </Grid>
  );
};

export default AdminCategoriesPage;
