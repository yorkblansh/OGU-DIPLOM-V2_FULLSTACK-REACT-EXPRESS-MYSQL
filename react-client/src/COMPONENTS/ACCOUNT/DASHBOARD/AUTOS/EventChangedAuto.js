import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventChangedAuto(
  funcRequest,
  loadVehicles,
  inputObjectVehicle,
  setChangedVehicle,
  setInputObjectVehicle
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/vehicle/change/`,
    `PUT`,
    inputObjectVehicle,
    tempUserAuthCookie
  );

  setChangedVehicle(null);
  setInputObjectVehicle({
    ID: null,
    Model: "",
    Number: "",
    IDgarage: null,
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

  loadVehicles();
}

export default eventChangedAuto;
