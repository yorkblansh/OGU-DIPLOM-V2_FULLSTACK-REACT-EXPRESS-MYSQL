import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import Toast from "./../../../Toast";

import "./Profile.scss";

const Profile = ({ funcRequest, workerAccount, setWorkerAccount }) => {
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
      let tempWorkerAccount = await loadAccount(tempUserAuthCookie);

      setWorkerAccount(tempWorkerAccount);

      new Toast({
        title: "Оповещение",
        text: `Вы были авторизированы под аккаунт ${tempWorkerAccount.loginUser}.`,
        theme: "info",
        autohide: true,
        interval: 10000,
      });
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
  });

  function profileExit() {
    Cookies.remove("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    window.location.href = "/";
    // Везде navigate из react-router-dom но тут чтобы печенька удалилась, надо обновить страницу поэтому этот способ норм такой
  }

  return (
    <div className="Profile">
      <div className="header">
        <div className="header-wrapper">
          <div className="header-left">
            <span>ЛИЧНЫЙ КАБИНЕТ РАБОЧЕГО</span>
          </div>
          <div className="header-right">
            <Button variant="outlined" onClick={profileExit}>
              Выход
            </Button>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="body-wrapper">
          <div className="left-aside">
            <Button variant="outlined" fullWidth onClick={() => {}}>
              1. Автомобильные базы
            </Button>
            <Button variant="outlined" fullWidth onClick={() => {}}>
              2. Виды ГСМ
            </Button>
            <Button variant="outlined" fullWidth onClick={() => {}}>
              3. Автомобильные гаражи
            </Button>
            <Button variant="outlined" fullWidth onClick={() => {}}>
              4. Все автомобили
            </Button>
            <Button variant="outlined" fullWidth onClick={() => {}}>
              5. Рабочий персонал
            </Button>
            <Button variant="outlined" fullWidth onClick={() => {}}>
              6. Ведомости
            </Button>
            <Button variant="outlined" fullWidth onClick={() => {}}>
              7. Путевые листы
            </Button>
            <hr />
            <Button variant="outlined" fullWidth onClick={() => {}}>
              8. ГСМ за день по гаражу
            </Button>
            <Button variant="outlined" fullWidth onClick={() => {}}>
              9. Отчет по ведомости
            </Button>
          </div>
          <div className="right-content">
            <h3>Д</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
