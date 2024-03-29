import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function deleteAutoBase(
  itemAutoBase,
  statusAccessEditing,
  funcRequest,
  loadAutoBases
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при удалении автомобильной базы",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы удалить автомобильную базу!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/autobase/delete/${itemAutoBase.ID}`,
    "DELETE",
    null,
    tempUserAuthCookie
  );

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при удалении автомобильной базы",
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

  loadAutoBases();
  return;
}

export default deleteAutoBase;
