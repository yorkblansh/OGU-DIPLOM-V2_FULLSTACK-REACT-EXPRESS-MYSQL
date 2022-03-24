import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventCreatedAutoGarage(
  funcRequest,
  loadAutoGarages,
  createAutoBase,
  setCreateAutoBase
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/autogarage/create`,
    "POST",
    createAutoBase,
    tempUserAuthCookie
  );

  setCreateAutoBase(null);

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

  loadAutoGarages();
}

export default eventCreatedAutoGarage;
