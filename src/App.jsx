import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

import {
  Add,
  Refresh,
} from "@mui/icons-material";

import ProductoForm from "./components/ProductoForm";
import ProductoCard from "./components/ProductoCard";

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

      <Box
        className="hero"
        sx={{
          py: { xs: 6, md: 8 },
          mb: 5,
        }}
      >

        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
          }}
        >

          <Typography
            variant="overline"
            sx={{
              display: "block",
              letterSpacing: 4,
              color: "#90caf9",
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            SISTEMA DE GESTIÓN
          </Typography>


          <Typography
            variant="h2"
            component="h1"
            sx={{
              mt: 1,
              fontWeight: 800,
              color: "#ffffff",
              fontSize: {
                xs: "2.4rem",
                sm: "3rem",
                md: "3.7rem",
              },
            }}
          >
            Productos
          </Typography>


          <Typography
            variant="h6"
            sx={{
              mt: 1,
              color: "#bbdefb",
              fontWeight: 500,
              letterSpacing: 0.8,
            }}
          >
            React + Python + Flask
          </Typography>


          <Typography
            sx={{
              mt: 2,
              mx: "auto",
              maxWidth: 600,
              color: "rgba(255,255,255,0.75)",
              textAlign: "center",
            }}
          >
            Administra tus productos de forma sencilla,
            rápida y organizada.
          </Typography>

        </Container>

      </Box>


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

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >

            <Box>

              <Typography
                variant="h5"
                fontWeight={700}
              >
                Productos registrados
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {productos.length}{" "}
                {productos.length === 1
                  ? "producto"
                  : "productos"}
              </Typography>

            </Box>


            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={cargarProductos}
              disabled={cargando}
            >
              Actualizar
            </Button>

          </Box>

        </Paper>


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


            <Typography
              variant="h6"
              fontWeight={600}
            >
              No hay productos
            </Typography>


            <Typography
              color="text.secondary"
            >
              Crea tu primer producto usando
              el formulario.
            </Typography>

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