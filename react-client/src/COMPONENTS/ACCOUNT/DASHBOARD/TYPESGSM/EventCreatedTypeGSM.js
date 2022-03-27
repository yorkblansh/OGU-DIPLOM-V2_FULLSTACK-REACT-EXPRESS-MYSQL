import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventCreatedTypeGSM(
  funcRequest,
  createObjectGSM,
  setCreateObjectGSM,
  loadTypesGSM
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/type-gsm/create`,
    "POST",
    createObjectGSM,
    tempUserAuthCookie
  );

  setCreateObjectGSM(null);

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при создании типа ГСМ",
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

  loadTypesGSM();
}

export default eventCreatedTypeGSM;
