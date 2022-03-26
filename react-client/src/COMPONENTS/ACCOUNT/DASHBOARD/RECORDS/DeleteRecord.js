import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function deleteRecord(
  record,
  funcRequest,
  loadRecords,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при удалении путевого листа",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы удалить путевой лист!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/record/delete/${record.ID}`,
    "DELETE",
    record,
    tempUserAuthCookie
  );

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при удалении путевого листа",
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

  loadRecords();
}

export default deleteRecord;
