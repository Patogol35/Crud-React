import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Container,
  Grid,
  Snackbar,
  CircularProgress,
  Paper,
} from "@mui/material";

import {
  Add,
} from "@mui/icons-material";

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

  const [formulario, setFormulario] = useState(
    formularioInicial
  );

  const [editando, setEditando] = useState(null);

  const [cargando, setCargando] = useState(false);

  const [mensaje, setMensaje] = useState("");

  const [tipoMensaje, setTipoMensaje] = useState("success");

  const [snackbar, setSnackbar] = useState(false);


  // ==========================================
  // MOSTRAR MENSAJE
  // ==========================================

  const mostrarMensaje = (
    texto,
    tipo = "success"
  ) => {

    setMensaje(texto);
    setTipoMensaje(tipo);
    setSnackbar(true);

  };


  // ==========================================
  // CARGAR PRODUCTOS
  // ==========================================

  const cargarProductos = async () => {

    try {

      setCargando(true);

      const datos = await obtenerProductos();

      setProductos(datos);

    } catch (error) {

      console.error(error);

      mostrarMensaje(
        "No se pudo conectar con Flask",
        "error"
      );

    } finally {

      setCargando(false);

    }
  };


  useEffect(() => {
    cargarProductos();
  }, []);


  // ==========================================
  // CAMBIAR FORMULARIO
  // ==========================================

  const manejarCambio = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================================
  // CREAR / ACTUALIZAR
  // ==========================================

  const manejarSubmit = async (e) => {

    e.preventDefault();

    try {

      setCargando(true);

      if (editando) {

        await actualizarProducto(
          editando,
          formulario
        );

        mostrarMensaje(
          "Producto actualizado correctamente"
        );

      } else {

        await crearProducto(formulario);

        mostrarMensaje(
          "Producto creado correctamente"
        );

      }

      limpiarFormulario();

      await cargarProductos();

    } catch (error) {

      console.error(error);

      mostrarMensaje(
        error.message || "Ocurrió un error",
        "error"
      );

    } finally {

      setCargando(false);

    }
  };


  // ==========================================
  // EDITAR
  // ==========================================

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


  // ==========================================
  // ELIMINAR
  // ==========================================

  const manejarEliminar = async (id) => {

    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este producto?"
    );

    if (!confirmar) return;

    try {

      setCargando(true);

      await eliminarProducto(id);

      mostrarMensaje(
        "Producto eliminado correctamente"
      );

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


  // ==========================================
  // LIMPIAR FORMULARIO
  // ==========================================

  const limpiarFormulario = () => {

    setFormulario({
      ...formularioInicial,
    });

    setEditando(null);

  };


  return (

    <Box className="app">

      {/* =====================================
          HEADER
      ====================================== */}

      <Hero />


      {/* =====================================
          CONTENIDO
      ====================================== */}

      <Container
        maxWidth="lg"
        sx={{
          pb: 8,
        }}
      >

        {/* =====================================
            FORMULARIO
        ====================================== */}

        <ProductoForm
          formulario={formulario}
          editando={editando}
          cargando={cargando}
          onChange={manejarCambio}
          onSubmit={manejarSubmit}
          onCancel={limpiarFormulario}
        />


        {/* =====================================
            HEADER PRODUCTOS
        ====================================== */}

        <ProductosHeader
          cantidad={productos.length}
          cargando={cargando}
          onRefresh={cargarProductos}
        />


        {/* =====================================
            PRODUCTOS
        ====================================== */}

        {cargando && productos.length === 0 ? (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>

        ) : productos.length === 0 ? (

          <Paper
            elevation={0}
            sx={{
              py: 8,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >

            <Add
              sx={{
                fontSize: 50,
                color: "text.secondary",
                mb: 1,
              }}
            />

            <Box>

              <strong
                style={{
                  fontSize: "1.25rem",
                }}
              >
                No hay productos
              </strong>

            </Box>

            <Box
              sx={{
                color: "text.secondary",
                mt: 1,
              }}
            >
              Crea tu primer producto usando
              el formulario.
            </Box>

          </Paper>

        ) : (

          <Grid container spacing={3}>

            {productos.map((producto) => (

              <Grid
                key={producto.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
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


      {/* =====================================
          MENSAJES
      ====================================== */}

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
          sx={{
            width: "100%",
          }}
        >
          {mensaje}
        </Alert>

      </Snackbar>

    </Box>
  );
}

export default App;
