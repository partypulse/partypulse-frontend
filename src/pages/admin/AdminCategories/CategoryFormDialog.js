import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import api from "../../../api/api";

const CategoryFormDialog = ({ open, onClose, category, onSave }) => {
  const [formData, setFormData] = useState({ name: "" });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({ name: "" });
    }
  }, [category]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const saveAction = category
      ? api.put(`/category/editcategory`, formData)
      : api.post("/category/createnewcategory", formData);

    saveAction
      .then((response) => {
        onSave(response.data);
        setError(false);
        onClose();
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.toString());
        console.error("Failed to save category:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {category ? "Redigera Kategori" : "Skapa Kategori"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Namn"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <DialogActions>
        <Button onClick={onClose}>Avbryt</Button>
        <Button onClick={handleSave} color="primary">
          Spara
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormDialog;
