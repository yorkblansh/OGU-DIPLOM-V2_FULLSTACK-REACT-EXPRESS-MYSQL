import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function eventSelectedSheet(
  sheetSelected,
  setDivSheetHidden,
  funcRequest,
  setSheetReport,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при выборе ведомости",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы выбрать ведомости!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (sheetSelected === null) {
    new Toast({
      title: "Ошибка при выборе ведомости",
      text: "Ошибка: Ведомость не выбрана!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return true;
  }

  setDivSheetHidden(true);

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const report = await funcRequest(
    `/api/report-sheet/get/${sheetSelected}`,
    "GET",
    null,
    tempUserAuthCookie
  );

  setSheetReport(report.responseFetch);
}

export default eventSelectedSheet;
