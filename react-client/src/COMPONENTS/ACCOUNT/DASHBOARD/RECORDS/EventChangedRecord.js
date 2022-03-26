import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventChangedRecord(
  funcRequest,
  loadRecords,
  inputObjectRecord,
  setChangedRecord,
  setInputObjectRecord
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/record/change`,
    `PUT`,
    inputObjectRecord,
    tempUserAuthCookie
  );

  setChangedRecord(null);

  setInputObjectRecord({
    ID: null,
    IDsheet: null,
    IDcar: null,
    IDdriver: null,
    NumberPL: null,
    IDgsm: null,
    Liter: null,
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

  loadRecords();
}

export default eventChangedRecord;
