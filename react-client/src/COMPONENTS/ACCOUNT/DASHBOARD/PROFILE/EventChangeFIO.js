import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function changeFIOEvent(
  funcRequest,
  dataFIO,
  setWorkerAccount,
  workerAccount,
  setChangedFIO
) {
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

export default changeFIOEvent;
