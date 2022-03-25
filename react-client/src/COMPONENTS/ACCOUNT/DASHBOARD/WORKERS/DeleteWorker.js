import Toast from "./../../../../Toast";
import Cookies from "js-cookie";

async function deleteWorker(
  worker,
  funcRequest,
  loadWorkers,
  statusAccessEditing,
  workerAccount,
  dashboardExit
) {
  if (!statusAccessEditing) {
    new Toast({
      title: "Ошибка при удалении сотрудника",
      text: "У вашего аккаунта не достаточный уровень доступа, чтобы удалить сотрудника!",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/worker/delete/${worker.ID}`,
    "DELETE",
    null,
    tempUserAuthCookie
  );

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при удалении сотрудника",
      text: response.responseFetch,
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  new Toast({
    title: "Вас ждет успех!",
    text: response.responseFetch,
    theme: "success",
    autohide: true,
    interval: 10000,
  });

  loadWorkers();

  if (workerAccount.ID === worker.ID) {
    new Toast({
      title: "Вы отредактировали свой аккаунт!",
      text: "Так как вы удалили свой аккаунт, с этого момента у вас нет доступа к вашему профилю. Прощайте:)",
      theme: "warning",
      autohide: true,
      interval: 10000,
    });

    setTimeout(() => dashboardExit(), 2000);
  }
}

export default deleteWorker;
