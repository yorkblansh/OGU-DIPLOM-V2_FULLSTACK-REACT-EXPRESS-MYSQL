import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventChangedAutoGarage(
  funcRequest,
  loadAutoGarages,
  inputObjectAutoGarage,
  setChangedAutoGarage,
  setInputObjectAutoGarage
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/autogarage/change`,
    `PUT`,
    inputObjectAutoGarage,
    tempUserAuthCookie
  );

  setChangedAutoGarage(null);
  setInputObjectAutoGarage({
    ID: null,
    Name: "",
    IDbase: null,
  });

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при изменении гаража",
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

export default eventChangedAutoGarage;
