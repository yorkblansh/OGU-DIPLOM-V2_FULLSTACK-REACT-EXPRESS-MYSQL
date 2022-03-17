import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // Написать регистрацию аккаунта

    console.log({
      FIO1: data.get("FIO1"),
      FIO2: data.get("FIO2"),
      FIO3: data.get("FIO3"),
      login: data.get("loginUser"),
      password: data.get("passwordUser"),
    });

    return;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  name="FIO1"
                  label="Фамилия"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="FIO2"
                  label="Имя"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="FIO3"
                  label="Отчество"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="loginUser"
                  label="Придумайте логин"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordUser"
                  label="Придумайте пароль"
                  type="text"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {}}
            >
              Создать аккаунт
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Уже есть аккаунт? Авторизация
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
