import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import api from "../../../api/api";
import { Autocomplete } from "@mui/lab";

const EditProductDialog = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      info: "",
      price: 0,
      stock: 0,
      mainCategory: "",
      subCategory: "",
      image: "",
    }
  );
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    if (open) {
      api
        .get("/admin/categories")
        .then((response) => {
          setCategories(response.data);
          setLoadingCategories(false);
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
          setLoadingCategories(false);
        });

      if (product) {
        setFormData(product);
      } else {
        setFormData({
          name: "",
          info: "",
          price: 0,
          stock: 0,
          mainCategory: "",
          subCategory: "",
          image: "",
        });
      }
    }
  }, [open, product]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleMainCategoryChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      mainCategory: value.map((category) => category._id),
    }));
  };
  const handleSubCategoryChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      subCategory: value.map((category) => category._id),
    }));
  };
  const handleSave = () => {
    const saveAction = product
      ? api.put(`/product/update`, formData)
      : api.post("/product/create", formData);

    saveAction
      .then((response) => {
        onSave(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Failed to save product:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Redigera Produkt</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Produktnamn"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        2
        <TextField
          margin="dense"
          label="Info"
          name="info"
          value={formData.info}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Pris"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          fullWidth
        />
        <Autocomplete
          multiple
          options={categories}
          getOptionLabel={(option) => option.name}
          value={categories.filter((category) =>
            formData?.mainCategory?.includes(category._id)
          )}
          onChange={handleMainCategoryChange}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Kategorier"
              placeholder="Välj kategorier"
              fullWidth
            />
          )}
          loading={loadingCategories}
        />
        <Autocomplete
          multiple
          options={categories}
          getOptionLabel={(option) => option.name}
          value={categories.filter((category) =>
            formData?.subCategory?.includes(category._id)
          )}
          onChange={handleSubCategoryChange}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Kategorier"
              placeholder="Välj kategorier"
              fullWidth
            />
          )}
          loading={loadingCategories}
        />
        <TextField
          margin="dense"
          label="Bild"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Avbryt</Button>
        <Button onClick={handleSave} color="primary">
          Spara
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
