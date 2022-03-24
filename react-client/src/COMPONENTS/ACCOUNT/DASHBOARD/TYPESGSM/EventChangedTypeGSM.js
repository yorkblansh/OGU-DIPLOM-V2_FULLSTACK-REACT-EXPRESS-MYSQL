import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventChangedTypeGSM(
  funcRequest,
  loadTypesGSM,
  setChangedGSM,
  setInputObjectGSM,
  inputObjectGSM
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/type-gsm/change`,
    "PUT",
    inputObjectGSM,
    tempUserAuthCookie
  );

  setChangedGSM(null);
  setInputObjectGSM({
    ID: null,
    Name: "",
    ForKilo: "",
  });

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при изменении типа ГСМ",
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

export default eventChangedTypeGSM;
