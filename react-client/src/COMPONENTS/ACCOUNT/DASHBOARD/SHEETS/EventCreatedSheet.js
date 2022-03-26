import Cookies from "js-cookie";
import Toast from "./../../../../Toast";
import moment from "moment";

async function eventCreatedSheet(
  funcRequest,
  loadSheets,
  createSheet,
  setCreateSheet,
  workerAccount
) {
  if (createSheet === null) {
    new Toast({
      title: "Ошибка при создании ведомости",
      text: "Ошибка: вы нечего не сделали",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  let tempObjectCreatedSheetSend = {
    ...createSheet,
    DateSheet: moment(new Date()).format("YYYY-MM-DD"),
    IDsigner: workerAccount.ID,
  };

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/sheet/create`,
    "POST",
    tempObjectCreatedSheetSend,
    tempUserAuthCookie
  );

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при создании гаража",
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

  setCreateSheet(null);

  loadSheets();
}

export default eventCreatedSheet;
