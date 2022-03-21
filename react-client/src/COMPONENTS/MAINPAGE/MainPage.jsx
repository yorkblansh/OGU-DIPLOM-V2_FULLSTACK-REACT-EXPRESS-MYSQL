import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"© "}
      <Link
        color="inherit"
        href="https://github.com/elmir-web/"
        target="_blank"
      >
        Студент заочник З-18ПИнж(ба)РПиС - Кубагушев Эльмир Ирекович
      </Link>{" "}
      Проект по расширению курсовой работы по предмету "СуБД" до соответствия
      диплома 2020 - {new Date().getFullYear()} гг
      {"."}
    </Typography>
  );
}

export default function MainPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Автомобильная компания "ОГУ" |{" "}
            <Button
              component={RouterLink}
              variant="body2"
              color="primary"
              to="/account/profile"
            >
              Личный кабинет
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Автомобильная компания "ОГУ"*
            </Typography>

            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Добро пожаловать в панель управления автомобильной компании
              "ОГУ"*. Выберите ниже, что вам требуется сделать. При регистрации
              вы попадете в базу данных как "Кандидат" и с вами свяжется отдел
              кадров. При авторизации вы войдете в свой личный кабинет.
            </Typography>
          </Container>
        </div>
        <div>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                component={RouterLink}
                variant="contained"
                color="primary"
                to="/account/register"
              >
                Стать кандидатом
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/account/login"
              >
                Авторизация
              </Button>
            </Grid>
          </Grid>
        </div>
      </main>
      <br />
      <br />
      <br />
      <footer>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
          style={{
            fontSize: "10px",
          }}
        >
          * - Компания "ОГУ" виртуальна, все совпадения с реальной жизнью лишь
          совпадения и не имеют ничего общего с реальностью. В программе
          используются только учебные данные. Данные настоящих граждан РФ не
          используются или являются лишь вымышленным совпадением.
        </Typography>{" "}
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
