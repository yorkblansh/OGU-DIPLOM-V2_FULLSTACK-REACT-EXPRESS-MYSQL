import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

import "./Profile.scss";

import Avatar from "./AVATAR/Avatar";

const Profile = ({ workerAccount, funcRequest, setWorkerAccount }) => {
  const [changedFIO, setChangedFIO] = useState(false);
  const [dataFIO, setDataFIO] = useState(null);
  const [changedAccessData, setChangedAccessData] = useState(false);
  const [dataAccess, setDataAccess] = useState(null);

  function changeFIO() {
    const tempFIOArray = workerAccount?.FIO?.split(" ");

    setDataFIO({
      FIO1: tempFIOArray[0],
      FIO2: tempFIOArray[1],
      FIO3: tempFIOArray[2],
    });

    setChangedFIO(true);
  }

  function changeAccessData() {
    setDataAccess({
      loginUser: workerAccount.loginUser,
      passwordUser: workerAccount.passwordUser,
    });

    setChangedAccessData(true);
  }

  async function changeFIOEvent() {
    let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    const response = await funcRequest(
      "/account/profile/change",
      "POST",
      dataFIO,
      tempUserAuthCookie
    );

    if (response.ok === false && response.status === 400) {
      new Toast({
        title: "Ошибка при изменении данных",
        text: response.responseFetch.message,
        theme: "danger",
        autohide: true,
        interval: 10000,
      });
      return;
    }

    setWorkerAccount({ ...workerAccount, FIO: response.responseFetch.data });

    setChangedFIO(false);

    new Toast({
      title: "Вас ждет успех!",
      text: response.responseFetch.message,
      theme: "success",
      autohide: true,
      interval: 10000,
    });
  }

  async function changeAccessDataEvent() {
    let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    const response = await funcRequest(
      "/account/profile/access-data/change",
      "POST",
      dataAccess,
      tempUserAuthCookie
    );

    if (response.ok === false && response.status === 400) {
      new Toast({
        title: "Ошибка при изменении данных",
        text: response.responseFetch.message,
        theme: "danger",
        autohide: true,
        interval: 10000,
      });
      return;
    }

    setWorkerAccount({
      ...workerAccount,
      loginUser: response.responseFetch.loginUser,
      passwordUser: response.responseFetch.passwordUser,
    });

    setChangedAccessData(false);

    new Toast({
      title: "Вас ждет успех!",
      text: response.responseFetch.message,
      theme: "success",
      autohide: true,
      interval: 10000,
    });
  }

  return (
    <div className="Profile">
      <div className="profile-wrapper">
        <Avatar FunctionID={workerAccount?.Function?.ID} />
        <div className="content-main">
          <h2>
            {workerAccount?.Function?.Role} {workerAccount?.FIO}
          </h2>
          <p>ID аккаунта: {workerAccount?.ID}</p>
          <p>Автомобильная база: {workerAccount?.IDbase?.Name}</p>
          <p>Логин: {workerAccount?.loginUser}</p>
        </div>
      </div>
      <hr />
      <div className="settings-wrapper">
        {!changedFIO ? (
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            onClick={() => changeFIO()}
          >
            Изменить фамилию и инициалы
          </Button>
        ) : (
          <div className="form-fio">
            <h4>Изменение ФИО</h4>
            <TextField
              id="standard-basic"
              label="Введите имя"
              variant="standard"
              fullWidth
              sx={{ mt: 1 }}
              value={dataFIO.FIO1}
              onChange={(e) => {
                setDataFIO({ ...dataFIO, FIO1: e.target.value });
              }}
            />
            <TextField
              id="standard-basic"
              label="Введите фамилию"
              variant="standard"
              fullWidth
              value={dataFIO.FIO2}
              sx={{ mt: 1 }}
              onChange={(e) => {
                setDataFIO({ ...dataFIO, FIO2: e.target.value });
              }}
            />
            <TextField
              id="standard-basic"
              label="Введите отчество"
              variant="standard"
              fullWidth
              value={dataFIO.FIO3}
              sx={{ mt: 1 }}
              onChange={(e) => {
                setDataFIO({ ...dataFIO, FIO3: e.target.value });
              }}
            />
            <Button
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
              onClick={() => changeFIOEvent()}
            >
              Сохранить
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 1 }}
              onClick={() => setChangedFIO(false)}
            >
              Отмена
            </Button>
          </div>
        )}
        {!changedAccessData ? (
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            onClick={() => changeAccessData()}
          >
            Изменить логин и пароль
          </Button>
        ) : (
          <div className="access-form">
            <h4>Изменение логина и пароля</h4>

            <TextField
              id="standard-basic"
              label="Введите логин"
              variant="standard"
              fullWidth
              sx={{ mt: 1 }}
              value={dataAccess.loginUser}
              onChange={(e) => {
                setDataAccess({ ...dataAccess, loginUser: e.target.value });
              }}
            />
            <TextField
              id="standard-basic"
              label="Введите пароль"
              variant="standard"
              fullWidth
              value={dataAccess.passwordUser}
              sx={{ mt: 1 }}
              onChange={(e) => {
                setDataAccess({ ...dataAccess, passwordUser: e.target.value });
              }}
            />
            <Button
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
              onClick={() => changeAccessDataEvent()}
            >
              Сохранить
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 1 }}
              onClick={() => setChangedAccessData(false)}
            >
              Отмена
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
