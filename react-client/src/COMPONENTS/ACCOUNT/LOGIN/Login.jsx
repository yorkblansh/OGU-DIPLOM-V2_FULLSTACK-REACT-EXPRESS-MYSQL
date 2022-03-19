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
import { handleSubmitLogin } from "../../../app/handleSubmitLogin";
import { Link as RouterLink } from "react-router-dom";

const theme = createTheme();

const Login = (props) =>
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
          Авторизация
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => handleSubmitLogin(props, event)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            autoFocus
            required
            fullWidth
            name="loginUser"
            label="Введите логин"
            type="text"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordUser"
            label="Введите пароль"
            type="text"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Авторизировать аккаунт
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component={RouterLink}
                variant="body2"
                to="/account/register"
              >
                У вас нет аккаунта? Регистрация
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>

export default Login