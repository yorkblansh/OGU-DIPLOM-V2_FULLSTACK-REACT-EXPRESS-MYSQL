import moment from "moment";
import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventChangedSheet(
  funcRequest,
  loadSheets,
  inputObjectSheet,
  setChangedSheet,
  setInputObjectSheet,
  changedSheet
) {
  let tempObjectChangedSheetSend = {
    ...inputObjectSheet,
    ID: changedSheet.ID,
    IDsigner: changedSheet.IDsigner.ID,
  };

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/sheet/change/`,
    `PUT`,
    tempObjectChangedSheetSend,
    tempUserAuthCookie
  );

  setChangedSheet(null);
  setInputObjectSheet({
    ID: null,
    NumberSheet: null,
    DateSheet: moment(new Date()).format("YYYY-MM-DD"),
    IDgarage: null,
    IDsigner: null,
  });

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при изменении автомобиля",
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

  loadSheets();
}

export default eventChangedSheet;
