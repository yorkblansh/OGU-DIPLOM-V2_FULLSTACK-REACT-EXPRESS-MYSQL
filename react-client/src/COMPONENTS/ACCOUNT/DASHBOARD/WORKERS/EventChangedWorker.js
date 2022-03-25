import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventChangedWorker(
  inputObjectWorker,
  changedWorker,
  funcRequest,
  setChangedWorker,
  setInputObjectWorker,
  loadWorkers,
  workerAccount,
  dashboardExit
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  let changedThisWorker = {
    ...inputObjectWorker,
    ID: changedWorker.ID,
    IDbase: inputObjectWorker.IDbase.ID,
    Function: inputObjectWorker.Function.ID,
  };

  const response = await funcRequest(
    `/api/worker/change`,
    `PUT`,
    changedThisWorker,
    tempUserAuthCookie
  );

  setChangedWorker(null);
  setInputObjectWorker({
    ID: null,
    FIO: "",
    loginUser: "",
    passwordUser: "",
    Function: null,
    IDbase: null,
  });

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при изменении данных сотрудника",
      text: response.responseFetch,
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  new Toast({
    title: "Вас ждет успех!",
    text: response.responseFetch,
    theme: "success",
    autohide: true,
    interval: 10000,
  });

  loadWorkers();

  if (workerAccount.ID === changedThisWorker.ID) {
    new Toast({
      title: "Вы отредактировали свой профиль!",
      text: "Так как вы отредактировали свой профиль, сейчас будет произведен выход из аккаунта. Авторизуйтесь под новыми данными.",
      theme: "warning",
      autohide: true,
      interval: 10000,
    });

    setTimeout(() => dashboardExit(), 2000);
  }
}

export default eventChangedWorker;
