import React, { useEffect, useState } from "react";
import {
  Chip,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "../../../api/api";
import Button from "@mui/material/Button";
import { Add, Delete, Edit } from "@mui/icons-material";
import EditProductDialog from "./EditProductDialog";
import IconButton from "@mui/material/IconButton";

const AdminProductsPage = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api
      .get("/admin/products")
      .then((response) => {
        setData(response.data);
        isLoading(false);
      })
      .catch((error) => console.error(error));
  };
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };
  const handleCreate = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  const handleDelete = (productId) => {
    api
      .delete(`/product/delete/${productId}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => console.error("Failed to delete product:", error));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);

    fetchData(); // Uppdatera produkttabellen när dialogen stängs
  };

  const handleSave = (savedProduct) => {
    setDialogOpen(false);
    fetchData(); // Uppdatera produkttabellen när en produkt har sparats
  };
  return (
    <Grid container>
      <h2>Products</h2>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Skapa Produkt
        </Button>

        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
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
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(x)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(x._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>{" "}
                  <TableCell>{x._id}</TableCell>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{x.info}</TableCell>
                  <TableCell>{x.price}</TableCell>
                  <TableCell>{x.stock}</TableCell>
                  <TableCell>
                    {x.mainCategory.map((cat, index) => (
                      <Chip
                        key={index}
                        label={cat.name}
                        style={{ margin: "2px" }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    {x.subCategory.map((cat, index) => (
                      <Chip
                        key={index}
                        label={cat.name}
                        style={{ margin: "2px" }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>{x.image}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {dialogOpen && (
          <EditProductDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            product={selectedProduct}
            onSave={handleSave}
          />
        )}
      </Grid>
    </Grid>
  );
};
export default AdminProductsPage;
