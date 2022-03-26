import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function deleteTypeGSM(
  itemGsm = null,
  funcRequest,
  loadTypesGSM,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при удалении автомобильной базы",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы удалить вид ГСМ!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/type-gsm/delete/${itemGsm.ID}`,
    "DELETE",
    null,
    tempUserAuthCookie
  );

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при удалении типа ГСМ",
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

export default deleteTypeGSM;
