import Toast from "./../../../../Toast";

async function beginUpdateVeh(
  veh = null,
  changedVehicle,
  setChangedVehicle,
  setInputObjectVehicle,
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

  if (changedVehicle === null && veh !== null) {
    setChangedVehicle(veh);

    setInputObjectVehicle({
      ID: null,
      Model: "",
      Number: "",
      IDgarage: null,
    });
  } else if (
    changedVehicle !== null &&
    veh !== null &&
    changedVehicle !== veh
  ) {
    setChangedVehicle(veh);

    setInputObjectVehicle({
      ID: null,
      Model: "",
      Number: "",
      IDgarage: null,
    });
  } else {
    setChangedVehicle(null);
  }
}

export default beginUpdateVeh;
