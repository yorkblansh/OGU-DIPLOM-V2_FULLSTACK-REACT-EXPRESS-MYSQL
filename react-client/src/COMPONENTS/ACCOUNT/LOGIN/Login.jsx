import * as React from "react";
import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Cookies from "js-cookie";

import SaveIcon from "@mui/icons-material/Save";

import Toast from "./../../../Toast";

import { Link as RouterLink, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login({
  funcRequest,
  workerAccount,
  setWorkerAccount,
}) {
  const [buttonLoginUsingStatus, setButtonLoginUsingStatus] = useState(false);

  let navigate = useNavigate();

  async function loadAccount(userToken) {
    const userLoginObject = {
      loginUser: "ELMIR.WEB",
    };

    const request = await funcRequest(
      `/account/profile`,
      "POST",
      userLoginObject,
      userToken
    );

    if (!request.ok && request.status === 400) {
      new Toast({
        title: "Ошибка при авторизации аккаунта",
        text: "Ошибка при считывании аккаунта, обновите страницу!",
        theme: "danger",
        autohide: true,
        interval: 10000,
      });
      return;
    }

    return request.responseFetch;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    if (tempUserAuthCookie !== undefined && workerAccount === false) {
      setButtonLoginUsingStatus(true);

      let tempWorkerAccount = await loadAccount(tempUserAuthCookie);

      setWorkerAccount(tempWorkerAccount);

      new Toast({
        title: "Ошибка",
        text: `Вы уже авторизированы под аккаунт ${tempWorkerAccount.loginUser}. Подождите 5 секунд, вас перенаправит на профиль!`,
        theme: "danger",
        autohide: true,
        interval: 10000,
      });

      setTimeout(() => navigate("/account/profile"), 5000);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const authAccount = {
      loginUser: data.get("loginUser"),
      passwordUser: data.get("passwordUser"),
    };

    if (
      !authAccount.loginUser.length ||
      authAccount.loginUser.length < 2 ||
      authAccount.loginUser.length > 20
    ) {
      new Toast({
        title: "Ошибка",
        text: "Логин не должен быть пустой строкой, либо меньше двух или больше двадцати символов",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });
      return;
    }

    if (
      !authAccount.passwordUser.length ||
      authAccount.passwordUser.length < 2 ||
      authAccount.passwordUser.length > 30
    ) {
      new Toast({
        title: "Ошибка",
        text: "Пароль не должен быть пустой строкой, либо меньше двух или больше тридцати символов",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });
      return;
    }

    new Toast({
      title: "Авторизация аккаунта",
      text: "На сервер был отправлен запрос на авторизацию аккаунта, ждите...",
      theme: "light",
      autohide: true,
      interval: 3000,
    });

    const request = await funcRequest(
      `/account/login`,
      "POST",
      authAccount,
      null
    );

    if (!request.ok && request.status === 400) {
      new Toast({
        title: "Ошибка при авторизации аккаунта",
        text: request.responseFetch,
        theme: "danger",
        autohide: true,
        interval: 5000,
      });
      return;
    }

    new Toast({
      title: "Вас ждет успех!",
      text: request.responseFetch.message,
      theme: "success",
      autohide: true,
      interval: 8000,
    });

    new Toast({
      title: "Переадресация",
      text: `Пожалуйста, оставайтесь на этой странице! Через 8 секунд вас автоматически перенаправит на рабочие возможности...`,
      theme: "info",
      autohide: true,
      interval: 10000,
    });

    Cookies.set("OGU_DIPLOM_COOKIE_AUTHTOKEN", request.responseFetch.token);

    setWorkerAccount(request.responseFetch.acc);

    setButtonLoginUsingStatus(true);

    setTimeout(() => navigate("/account/profile"), 8000);
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
            Авторизация
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
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

            {buttonLoginUsingStatus === false ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Авторизировать аккаунт
              </Button>
            ) : (
              <LoadingButton
                fullWidth
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Авторизировать аккаунт
              </LoadingButton>
            )}

            <Grid container justifyContent="flex-end"></Grid>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" component={RouterLink} to="/">
                  На главную
                </Link>
              </Grid>
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
  );
}
