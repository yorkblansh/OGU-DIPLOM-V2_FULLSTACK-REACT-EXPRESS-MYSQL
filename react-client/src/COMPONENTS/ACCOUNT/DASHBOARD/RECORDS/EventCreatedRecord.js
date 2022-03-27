import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventCreatedRecord(
  funcRequest,
  loadRecords,
  createRecord,
  setCreateRecord
) {
  if (createRecord === null) {
    new Toast({
      title: "Ошибка при создании путевого листа",
      text: "Ошибка: вы нечего не сделали",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/record/create`,
    "POST",
    createRecord,
    tempUserAuthCookie
  );

  setCreateRecord(null);

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при создании путевого листа",
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

export default eventCreatedRecord;
