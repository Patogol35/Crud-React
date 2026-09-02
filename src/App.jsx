import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

import { Add } from "@mui/icons-material";

import ProductoForm from "./components/ProductoForm";
import ProductoCard from "./components/ProductoCard";
import Hero from "./components/Hero";
import ProductosHeader from "./components/ProductosHeader";

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./services/productosService";

import "./App.css";

const formularioInicial = {
  nombre: "",
  descripcion: "",
  precio: "",
  categoria: "",
};

function App() {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [snackbar, setSnackbar] = useState(false);

  const mostrarMensaje = (texto, tipo = "success") => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setSnackbar(true);
  };

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (error) {
      console.error(error);
      mostrarMensaje("No se pudo conectar con Flask", "error");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarCambio = (e) => {
    setFormulario((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
    setEditando(null);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      setCargando(true);

      if (editando) {
        await actualizarProducto(editando, formulario);
        mostrarMensaje("Producto actualizado correctamente");
      } else {
        await crearProducto(formulario);
        mostrarMensaje("Producto creado correctamente");
      }

      limpiarFormulario();
      await cargarProductos();
    } catch (error) {
      console.error(error);
      mostrarMensaje(error.message || "Ocurrió un error", "error");
    } finally {
      setCargando(false);
    }
  };

  const manejarEditar = (producto) => {
    setEditando(producto.id);
    setFormulario({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio || "",
      categoria: producto.categoria || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) {
      return;
    }

    try {
      setCargando(true);
      await eliminarProducto(id);
      mostrarMensaje("Producto eliminado correctamente");
      await cargarProductos();
    } catch (error) {
      console.error(error);
      mostrarMensaje(
        error.message || "No se pudo eliminar el producto",
        "error"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box className="app">
      <Hero />

      <Container maxWidth="lg" className="app-content">
        <ProductoForm
          formulario={formulario}
          editando={editando}
          cargando={cargando}
          onChange={manejarCambio}
          onSubmit={manejarSubmit}
          onCancel={limpiarFormulario}
        />

        <ProductosHeader
          cantidad={productos.length}
          cargando={cargando}
          onRefresh={cargarProductos}
        />

        {cargando && productos.length === 0 ? (
          <Box className="products-loading">
            <CircularProgress />
          </Box>
        ) : productos.length === 0 ? (
          <Paper elevation={0} className="empty-products">
            <Add className="empty-products-icon" />

            <Typography variant="h6" className="empty-products-title">
              No hay productos
            </Typography>

            <Typography
              color="text.secondary"
              className="empty-products-text"
            >
              Crea tu primer producto usando el formulario.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {productos.map((producto) => (
              <Grid
                key={producto.id}
                size={{ xs: 12, sm: 6, md: 4 }}
              >
                <ProductoCard
                  producto={producto}
                  onEditar={manejarEditar}
                  onEliminar={manejarEliminar}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Snackbar
        open={snackbar}
        autoHideDuration={3500}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={tipoMensaje}
          variant="filled"
          onClose={() => setSnackbar(false)}
          className="app-snackbar"
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
