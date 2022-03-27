import Toast from "./../../../../Toast";

async function beginUpdateGSM(
  itemGsm = null,
  changedGSM,
  setChangedGSM,
  setInputObjectGSM,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при изменении типа ГСМ",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы изменить данные ГСМ!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (changedGSM === null && itemGsm !== null) {
    setChangedGSM(itemGsm);

    setInputObjectGSM({
      ID: null,
      Name: "",
      ForKilo: "",
    });
  } else if (
    changedGSM !== null &&
    itemGsm !== null &&
    changedGSM !== itemGsm
  ) {
    setChangedGSM(itemGsm);

    setInputObjectGSM({
      ID: null,
      Name: "",
      ForKilo: "",
    });
  } else {
    setChangedGSM(null);
  }
}

export default beginUpdateGSM;
