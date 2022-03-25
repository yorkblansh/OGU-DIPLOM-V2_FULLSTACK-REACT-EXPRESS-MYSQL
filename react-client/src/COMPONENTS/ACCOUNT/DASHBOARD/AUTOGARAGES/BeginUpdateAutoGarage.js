import Toast from "./../../../../Toast";

async function beginUpdateAutoGaraga(
  autogarage = null,
  changedAutoGarage,
  setChangedAutoGarage,
  setInputObjectAutoGarage,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при изменении автомобильной базы",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы изменить автомобильную базу!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (changedAutoGarage === null && autogarage !== null) {
    setChangedAutoGarage(autogarage);

    setInputObjectAutoGarage({
      ID: null,
      Name: "",
      IDbase: null,
    });
  } else if (
    changedAutoGarage !== null &&
    autogarage !== null &&
    changedAutoGarage !== autogarage
  ) {
    setChangedAutoGarage(autogarage);

    setInputObjectAutoGarage({
      ID: null,
      Name: "",
      IDbase: null,
    });
  } else {
    setChangedAutoGarage(null);
  }
}

export default beginUpdateAutoGaraga;
