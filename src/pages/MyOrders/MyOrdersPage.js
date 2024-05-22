import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import api from "../../api/api";

const MyOrdersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    api
      .get("/order/getmyorders")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleOpenDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };

  const handleDeleteOrder = async () => {
    try {
      await api.delete(`/order/deleteorder/${selectedOrderId}`);
      setData(data.filter((order) => order._id !== selectedOrderId));
      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Mina beställningar
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Datum</TableCell>
                  <TableCell>Totalt pris</TableCell>
                  <TableCell>Betalningsmetod</TableCell>
                  <TableCell>Leveransstatus</TableCell>
                  <TableCell>Produkter</TableCell>
                  <TableCell>Åtgärder</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.totalPrice} SEK</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.deliveryStatus}</TableCell>
                    <TableCell>
                      <ul>
                        {order.cart.map((item) => (
                          <li key={item.product}>
                            {item.name} x {item.quantity} ({item.price} SEK
                            styck)
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenDialog(order._id)}
                      >
                        Ta bort
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Bekräfta borttagning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Är du säker på att du vill ta bort denna beställning? Denna åtgärd
            kan inte ångras.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Avbryt
          </Button>
          <Button onClick={handleDeleteOrder} color="secondary">
            Ta bort
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default MyOrdersPage;
