import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  Edit,
  Delete,
} from "@mui/icons-material";

function ProductoCard({
  producto,
  onEditar,
  onEliminar,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >

        {/* CABECERA */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Chip
            label={producto.categoria}
            size="small"
            color="primary"
            variant="outlined"
          />

          <Typography
            variant="caption"
            color="text.secondary"
          >
            #{producto.id}
          </Typography>
        </Box>

        {/* NOMBRE */}

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            mb: 1,
            wordBreak: "break-word",
          }}
        >
          {producto.nombre}
        </Typography>

        {/* DESCRIPCIÓN */}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
            mb: 3,
            flexGrow: 1,
          }}
        >
          {producto.descripcion}
        </Typography>

        {/* PRECIO */}

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 2,
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
          >
            ${Number(producto.precio).toFixed(2)}
          </Typography>
        </Box>

        {/* BOTONES */}

        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<Edit />}
            onClick={() => onEditar(producto)}
          >
            Editar
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Delete />}
            onClick={() => onEliminar(producto.id)}
          >
            Eliminar
          </Button>
        </Stack>

      </CardContent>
    </Card>
  );
}

export default ProductoCard;