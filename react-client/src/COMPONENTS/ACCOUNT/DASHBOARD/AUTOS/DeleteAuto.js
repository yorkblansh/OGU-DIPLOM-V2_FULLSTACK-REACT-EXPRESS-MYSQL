import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function deleteVehicle(
  veh = null,
  funcRequest,
  loadVehicles,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при изменении автомобильной базы",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы изменить автомобильную базу!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/vehicle/delete/${veh.ID}`,
    "DELETE",
    null,
    tempUserAuthCookie
  );

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при удалении автомобиля",
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

export default deleteVehicle;
