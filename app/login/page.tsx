"use client";
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import "./login.css";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        DICE APP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  const theme = useTheme();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const iniciarSesion = async (data: FieldValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        data
      );
      const token = response.data.token;
      if (token) {
        Cookies.set("token", token);
        console.log(token);
        router.push("/rules");
        setIsLoggedIn(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al iniciar sesión!",
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al iniciar sesión!",
      });
      console.error(error);
    }
  };

  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[50]
      : theme.palette.grey[900];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: `url('/loginFondo.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundColor: backgroundColor,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Hola de nuevo!
            </Typography>
            <Box
              component="form"
              noValidate={false}
              onSubmit={handleSubmit(iniciarSesion)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">El campo e-mail es requerido</p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="contraseña"
                type="contraseña"
                id="contraseña"
                autoComplete="current-contraseña"
                className="textolog"
                {...register("contraseña", {
                  required: true,
                })}
              />
              {errors.contraseña?.type === "required" && (
                <p className="text-danger">El campo contraseña es requerido</p>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar mi cuenta"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesion
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Aún no tenes cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
