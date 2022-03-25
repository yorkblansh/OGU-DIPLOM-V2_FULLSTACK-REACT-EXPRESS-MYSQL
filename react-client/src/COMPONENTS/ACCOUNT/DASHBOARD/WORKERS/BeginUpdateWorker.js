import Toast from "./../../../../Toast";

async function beginUpdateWorker(
  worker = null,
  setChangedWorker,
  changedWorker,
  setInputObjectWorker,
  statusAccessEditing
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при изменении данных сотрудника",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы изменить данные сотрудника!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (changedWorker === null && worker !== null) {
    setChangedWorker(worker);

    setInputObjectWorker({
      ID: null,
      FIO: worker.FIO,
      loginUser: worker.loginUser,
      passwordUser: worker.passwordUser,
      Function: worker.Function,
      IDbase: worker.IDbase,
    });
  } else if (
    changedWorker !== null &&
    worker !== null &&
    changedWorker !== worker
  ) {
    setChangedWorker(worker);

    setInputObjectWorker({
      ID: null,
      FIO: worker.FIO,
      loginUser: worker.loginUser,
      passwordUser: worker.passwordUser,
      Function: worker.Function,
      IDbase: worker.IDbase,
    });
  } else {
    setChangedWorker(null);
  }
}

export default beginUpdateWorker;
