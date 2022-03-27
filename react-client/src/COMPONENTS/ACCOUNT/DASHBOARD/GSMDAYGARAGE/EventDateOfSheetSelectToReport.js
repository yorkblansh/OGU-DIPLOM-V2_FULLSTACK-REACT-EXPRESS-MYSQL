import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function eventDateOfSheetSelectToReport(
  setSheetLoaded,
  setDivTableReport,
  funcRequest,
  garageSelected,
  sheetSelected,
  setReportGSM,
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

  if (sheetSelected === null) {
    new Toast({
      title: "Ошибка при выборе даты",
      text: "Вы не выбрали дату!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
  }

  setSheetLoaded(false);
  setDivTableReport(true);

  const sendObject = {
    garageID: garageSelected,
    date: sheetSelected,
  };

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const report = await funcRequest(
    `/api/gsm-day-garage/get-report/get`,
    "POST",
    sendObject,
    tempUserAuthCookie
  );

  setReportGSM(report.responseFetch);
}

export default eventDateOfSheetSelectToReport;
