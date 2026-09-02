import {
  Box,
  Container,
  Typography,
} from "@mui/material";


function Hero() {

  return (

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
  );
}

export default Hero;
