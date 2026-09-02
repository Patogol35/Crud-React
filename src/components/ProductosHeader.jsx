import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import {
  Refresh,
} from "@mui/icons-material";


function ProductosHeader({
  cantidad,
  cargando,
  onRefresh,
}) {

  return (

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
