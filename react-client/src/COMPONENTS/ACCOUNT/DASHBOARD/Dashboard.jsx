import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import Toast from "../../../Toast";
import { Routes, Route, Link as LinkRouter } from "react-router-dom";

import "./Dashboard.scss";

import Profile from "./PROFILE/Profile";
import AutoBase from "./AUTOBASE/AutoBase";
import TypesGSM from "./TYPESGSM/TypesGSM";
import AutoGarages from "./AUTOGARAGES/AutoGarages";
import Autos from "./AUTOS/Autos";
import Workers from "./WORKERS/Workers";
import Sheets from "./SHEETS/Sheets";
import Records from "./RECORDS/Records";
import GSMDayGarage from "./GSMDAYGARAGE/GsmDayGarage";
import ReportSheet from "./REPORTSHEET/ReportSheet";

const Dashboard = ({ funcRequest, workerAccount, setWorkerAccount }) => {
  let navigate = useNavigate();

  useEffect(loadComponentDashboard, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadComponentDashboard() {
    let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    if (tempUserAuthCookie !== undefined && workerAccount === false) {
      let reqAccountWorker = await funcRequest(
        `/account/profile`,
        "GET",
        null,
        tempUserAuthCookie
      );

      Cookies.set(
        "OGU_DIPLOM_COOKIE_AUTHTOKEN",
        reqAccountWorker.responseFetch.token
      );

      if (!reqAccountWorker.ok && reqAccountWorker.status === 400) {
        new Toast({
          title: "Ошибка при авторизации аккаунта",
          text: "Ошибка при считывании аккаунта, обновите страницу!",
          theme: "danger",
          autohide: true,
          interval: 10000,
        });
        return;
      }

      reqAccountWorker = reqAccountWorker.responseFetch.acc;

      new Toast({
        title: "Оповещение",
        text: `Вы были авторизированы под аккаунт ${reqAccountWorker.loginUser}.`,
        theme: "info",
        autohide: true,
        interval: 10000,
      });

      setWorkerAccount(reqAccountWorker);
    } else if (tempUserAuthCookie === undefined && workerAccount === false) {
      new Toast({
        title: "Ошибка",
        text: `У вас нет доступа в личный кабинет, авторизуйтесь!`,
        theme: "danger",
        autohide: true,
        interval: 5000,
      });

      navigate("/account/login");
      return;
    }
  }

  function dashboardExit() {
    Cookies.remove("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    window.location.href = "/";
    // Везде navigate из react-router-dom но тут чтобы печенька удалилась, надо обновить страницу поэтому этот способ норм такой
  }

  return (
    <div className="Dashboard">
      <div className="header">
        <div className="header-wrapper">
          <div className="header-left">
            <span>ЛИЧНЫЙ КАБИНЕТ РАБОЧЕГО</span>
          </div>
          <div className="header-right">
            <Button variant="outlined" onClick={dashboardExit}>
              Выход
            </Button>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="body-wrapper">
          <div className="left-aside">
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to=""
            >
              Мой профиль
            </Button>
            <hr />
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="autobase"
            >
              1. Автомобильные базы
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="types-gsm"
            >
              2. Виды ГСМ
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="autogarages"
            >
              3. Автомобильные гаражи
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="autos"
            >
              4. Все автомобили
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="workers"
            >
              5. Рабочий персонал
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="sheets"
            >
              6. Ведомости
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="records"
            >
              7. Путевые листы
            </Button>
            <hr />
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="gsm-day-garage"
            >
              8. ГСМ за день по гаражу
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              component={LinkRouter}
              to="report-sheet"
            >
              9. Отчет по ведомости
            </Button>
          </div>
          <div className="right-content">
            <Routes>
              <Route
                index
                element={
                  <Profile
                    workerAccount={workerAccount}
                    funcRequest={funcRequest}
                    setWorkerAccount={setWorkerAccount}
                  />
                }
              />
              <Route
                path="autobase"
                element={<AutoBase funcRequest={funcRequest} />}
              />
              <Route
                path="types-gsm"
                element={<TypesGSM funcRequest={funcRequest} />}
              />
              <Route
                path="autogarages"
                element={<AutoGarages funcRequest={funcRequest} />}
              />
              <Route
                path="autos"
                element={<Autos funcRequest={funcRequest} />}
              />
              <Route
                path="workers"
                element={
                  <Workers
                    funcRequest={funcRequest}
                    workerAccount={workerAccount}
                    dashboardExit={dashboardExit}
                  />
                }
              />
              <Route
                path="sheets"
                element={<Sheets funcRequest={funcRequest} />}
              />
              <Route
                path="records"
                element={<Records funcRequest={funcRequest} />}
              />
              <Route
                path="gsm-day-garage"
                element={<GSMDayGarage funcRequest={funcRequest} />}
              />
              <Route
                path="report-sheet"
                element={<ReportSheet funcRequest={funcRequest} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
