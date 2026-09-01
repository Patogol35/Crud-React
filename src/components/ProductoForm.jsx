import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Edit,
  Cancel,
} from "@mui/icons-material";

function ProductoForm({
  formulario,
  editando,
  cargando,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        mb: 5,
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            {editando
              ? "Editar producto"
              : "Nuevo producto"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {editando
              ? "Modifica la información del producto"
              : "Agrega un nuevo producto al catálogo"}
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={onSubmit}
        >
          <Grid container spacing={2.5}>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={onChange}
                placeholder="Ej. Laptop HP"
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Descripción"
                name="descripcion"
                value={formulario.descripcion}
                onChange={onChange}
                placeholder="Describe el producto..."
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Precio"
                name="precio"
                value={formulario.precio}
                onChange={onChange}
                placeholder="0.00"
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: "0.01",
                  },
                }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Categoría"
                name="categoria"
                value={formulario.categoria}
                onChange={onChange}
                placeholder="Ej. Tecnología"
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  justifyContent: "flex-end",
                  mt: 1,
                }}
              >

                {editando && (
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={onCancel}
                    disabled={cargando}
                  >
                    Cancelar
                  </Button>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={
                    editando ? <Edit /> : <Add />
                  }
                  disabled={cargando}
                  sx={{
                    px: 3,
                    borderRadius: 2,
                  }}
                >
                  {cargando
                    ? "Guardando..."
                    : editando
                    ? "Actualizar producto"
                    : "Crear producto"}
                </Button>

              </Box>
            </Grid>

          </Grid>
        </Box>

      </CardContent>
    </Card>
  );
}

export default ProductoForm;