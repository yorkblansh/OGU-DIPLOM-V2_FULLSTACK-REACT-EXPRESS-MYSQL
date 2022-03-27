import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function eventGarageSelectToReport(
  garageSelected,
  setDivGarageHidden,
  funcRequest,
  setSheetsToGarage,
  setSheetLoaded,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при выборе гаража",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы изменить путевой лист!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (garageSelected === null) {
    new Toast({
      title: "Ошибка при выборе гаража",
      text: "Вы не выбрали гараж!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return true;
  }

  setDivGarageHidden(true);

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const sheets = await funcRequest(
    `/api/gsm-day-garage/get-sheet/get/${garageSelected}`,
    "GET",
    null,
    tempUserAuthCookie
  );

  setSheetsToGarage(sheets.responseFetch);
  setSheetLoaded(true);
}

export default eventGarageSelectToReport;
