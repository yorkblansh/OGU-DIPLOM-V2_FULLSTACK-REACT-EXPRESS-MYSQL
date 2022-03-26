import moment from "moment";
import Toast from "./../../../../Toast";

async function beginUpdateSheet(
  sheet = null,
  changedSheet,
  setChangedSheet,
  setInputObjectSheet,
  statusAccessEditing,
  workerAccount
) {
  const { ID: IDsigner } = workerAccount;
  const { IDsigner: userData } = sheet;
  const { ID, FIO } = userData;

  if (ID !== IDsigner) {
    new Toast({
      title: "Ошибка при изменении ведомости",
      text: `Ведомость подписанта ${FIO}. Вы не можете изменить не свою ведомость!`,
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при изменении ведомости",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы изменить данные ведомости!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (changedSheet === null && sheet !== null) {
    setChangedSheet(sheet);

    setInputObjectSheet({
      ID: null,
      NumberSheet: null,
      DateSheet: moment(new Date()).format("YYYY-MM-DD"),
      IDgarage: null,
      IDsigner: null,
    });
  } else if (
    changedSheet !== null &&
    sheet !== null &&
    changedSheet !== sheet
  ) {
    setChangedSheet(sheet);

    setInputObjectSheet({
      ID: null,
      NumberSheet: null,
      DateSheet: moment(new Date()).format("YYYY-MM-DD"),
      IDgarage: null,
      IDsigner: null,
    });
  } else {
    setChangedSheet(null);
  }
}

export default beginUpdateSheet;
