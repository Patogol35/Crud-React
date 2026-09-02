  import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import "./Hero.css";


function Hero() {

  return (

    <Box className="hero">

      <Container
        maxWidth="lg"
        className="hero-container"
      >

        <Typography
          variant="overline"
          className="hero-overline"
        >
          SISTEMA DE GESTIÓN
        </Typography>


        <Typography
          variant="h2"
          component="h1"
          className="hero-title"
        >
          Productos
        </Typography>


        <Typography
          variant="h6"
          className="hero-subtitle"
        >
          React + Python + Flask
        </Typography>


        <Typography className="hero-description">
          Administra tus productos de forma sencilla,
          rápida y organizada.
        </Typography>

      </Container>

    </Box>
  );
}

export default Hero;
