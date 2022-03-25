import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventCreatedAuto(
  funcRequest,
  loadVehicles,
  createVehicle,
  setCreateVehicle
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/vehicle/create`,
    "POST",
    createVehicle,
    tempUserAuthCookie
  );

  setCreateVehicle(null);

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

  loadVehicles();
}

export default eventCreatedAuto;
