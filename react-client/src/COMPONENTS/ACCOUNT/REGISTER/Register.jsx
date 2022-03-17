import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link as RouterLink } from "react-router-dom";

import Toast from "./../../../Toast";

const theme = createTheme();

export default function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newAccount = {
      fio1: data.get("FIO1"),
      fio2: data.get("FIO2"),
      fio3: data.get("FIO3"),
      loginUser: data.get("loginUser"),
      passwordUser: data.get("passwordUser"),
    };

    if (!newAccount.fio1.length) {
      new Toast({
        title: "Ошибка",
        text: "Строка с фамилией не должна быть пустой",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });
      return;
    }

    if (!newAccount.fio2.length) {
      new Toast({
        title: "Ошибка",
        text: "Строка с именем не должна быть пустой",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });
      return;
    }

    if (!newAccount.fio3.length) {
      new Toast({
        title: "Ошибка",
        text: "Строка с отчеством не должна быть пустой",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });
      return;
    }

    if (
      `${newAccount.fio1} ${newAccount.fio2} ${newAccount.fio3}`.length < 8 ||
      `${newAccount.fio1} ${newAccount.fio2} ${newAccount.fio3}`.length > 100
    ) {
      new Toast({
        title: "Ошибка",
        text: "Фамилия, имя и отчество вместе с пробелами (Пример: Викторов Ян Васильевич) не должны быть меньше чем 8 символов",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });
      return;
    }

    if (
      !newAccount.loginUser.length ||
      newAccount.loginUser.length < 2 ||
      newAccount.loginUser.length > 20
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
      !newAccount.passwordUser.length ||
      newAccount.passwordUser.length < 2 ||
      newAccount.passwordUser.length > 30
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
      title: "Создание аккаунта",
      text: "На сервер был отправлен запрос на создание аккаунта, ждите...",
      theme: "light",
      autohide: true,
      interval: 5000,
    });

    const request = await window.funcRequest(
      `/account/register`,
      "POST",
      newAccount
    );

    if (!request.ok && request.status === 400) {
      new Toast({
        title: "Ошибка при создании аккаунта",
        text: request.responseFetch,
        theme: "danger",
        autohide: true,
        interval: 3000,
      });
      return;
    }

    new Toast({
      title: "Вас ждет успех!",
      text: `${request.responseFetch}`,
      theme: "success",
      autohide: true,
      interval: 5000,
    });

    new Toast({
      title: "Переадресация",
      text: `Пожалуйста, оставайтесь на этой странице! Через 5 секунд вас автоматически перенаправит на страницу авторизации...`,
      theme: "info",
      autohide: true,
      interval: 8000,
    });

    setTimeout(() => {
      document.location.href = "/account/login";
    }, 5000);

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
                <RouterLink to="/account/login">
                  <Link variant="body2">Уже есть аккаунт? Авторизация</Link>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
