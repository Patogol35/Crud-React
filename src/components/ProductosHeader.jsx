import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import {
  Refresh,
} from "@mui/icons-material";

import "./ProductosHeader.css";


function ProductosHeader({
  cantidad,
  cargando,
  onRefresh,
}) {

  return (

    <Paper
      elevation={0}
      className="productos-header"
    >

      <Box className="productos-header-content">

        <Box>

          <Typography
            variant="h5"
            className="productos-header-title"
          >
            Productos registrados
          </Typography>


          <Typography
            variant="body2"
            color="text.secondary"
          >
            {cantidad}{" "}
            {cantidad === 1
              ? "producto"
              : "productos"}
          </Typography>

        </Box>


        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={onRefresh}
          disabled={cargando}
        >
          Actualizar
        </Button>

      </Box>

    </Paper>
  );
}

export default ProductosHeader;
