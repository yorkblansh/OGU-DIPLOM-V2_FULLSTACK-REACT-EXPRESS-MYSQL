import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function deleteSheet(
  sheet,
  funcRequest,
  loadSheets,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при удалении ведомости",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы удалить ведомость!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/sheet/delete/${sheet.ID}`,
    "DELETE",
    sheet,
    tempUserAuthCookie
  );

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при удалении ведомости",
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

  loadSheets();
}

export default deleteSheet;
