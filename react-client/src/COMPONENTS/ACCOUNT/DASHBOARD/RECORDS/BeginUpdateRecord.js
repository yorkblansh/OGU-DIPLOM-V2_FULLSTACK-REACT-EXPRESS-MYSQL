import Toast from "./../../../../Toast";

async function beginUpdateRecord(
  record = null,
  changedRecord,
  setChangedRecord,
  setInputObjectRecord,
  workerAccount,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при изменении путевого листа",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы изменить путевой лист!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  const { ID: IDsigner } = workerAccount;
  const { IDsheet: sheetData } = record;
  const { IDsigner: userData } = sheetData;
  const { ID, FIO } = userData;

  if (ID !== IDsigner) {
    new Toast({
      title: "Ошибка при изменении путевого листа",
      text: `Путевой лист ведомости подписанта ${FIO}. Вы не можете изменить не свой путевой лист!`,
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (changedRecord === null && record !== null) {
    setChangedRecord(record);

    setInputObjectRecord({
      ID: null,
      IDsheet: null,
      IDcar: null,
      IDdriver: null,
      NumberPL: null,
      IDgsm: null,
      Liter: null,
    });
  } else if (
    changedRecord !== null &&
    record !== null &&
    changedRecord !== record
  ) {
    setChangedRecord(record);

    setInputObjectRecord({
      ID: null,
      IDsheet: null,
      IDcar: null,
      IDdriver: null,
      NumberPL: null,
      IDgsm: null,
      Liter: null,
    });
  } else {
    setChangedRecord(null);
  }
}

export default beginUpdateRecord;
