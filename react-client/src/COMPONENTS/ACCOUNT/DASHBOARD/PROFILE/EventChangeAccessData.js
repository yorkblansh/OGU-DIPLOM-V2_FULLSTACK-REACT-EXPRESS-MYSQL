import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function changeAccessDataEvent(
  funcRequest,
  dataAccess,
  setWorkerAccount,
  workerAccount,
  setChangedAccessData
) {
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

export default changeAccessDataEvent;
