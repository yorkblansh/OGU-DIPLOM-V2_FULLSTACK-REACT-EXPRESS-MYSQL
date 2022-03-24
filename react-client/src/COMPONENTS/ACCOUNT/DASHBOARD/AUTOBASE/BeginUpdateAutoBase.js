import Toast from "./../../../../Toast";

async function beginUpdateAutoBase(
  itemAutoBase,
  statusAccessEditing,
  changedAutoBase,
  setChangedAutoBase
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

  if (changedAutoBase === null && itemAutoBase !== null) {
    setChangedAutoBase(itemAutoBase);
  } else if (
    changedAutoBase !== null &&
    itemAutoBase !== null &&
    changedAutoBase !== itemAutoBase
  ) {
    setChangedAutoBase(itemAutoBase);
  } else {
    setChangedAutoBase(null);
  }
  return;
}

export default beginUpdateAutoBase;
