import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventCreatedWorker(
  createWorker,
  funcRequest,
  loadWorkers,
  setCreateWorker
) {
  if (createWorker === null) {
    new Toast({
      title: "Ошибка при создании сотрудника",
      text: "Ошибка: Вы ничего не сделали",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (
    createWorker.FIO === `` ||
    createWorker.FIO === undefined ||
    createWorker.FIO === null
  ) {
    new Toast({
      title: "Ошибка при создании сотрудника",
      text: "Ошибка: Не ведены фамилия, имя и отчество",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (
    createWorker.loginUser === `` ||
    createWorker.loginUser === undefined ||
    createWorker.loginUser === null
  ) {
    new Toast({
      title: "Ошибка при создании сотрудника",
      text: "Ошибка: Не веден логин",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (
    createWorker.passwordUser === `` ||
    createWorker.passwordUser === undefined ||
    createWorker.passwordUser === null
  ) {
    new Toast({
      title: "Ошибка при создании сотрудника",
      text: "Ошибка: Не веден пароль",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (
    createWorker.Function === `` ||
    createWorker.Function === undefined ||
    createWorker.Function === null
  ) {
    new Toast({
      title: "Ошибка при создании сотрудника",
      text: "Ошибка: Не выбрана должность",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }

  if (
    createWorker.IDbase === `` ||
    createWorker.IDbase === undefined ||
    createWorker.IDbase === null
  ) {
    new Toast({
      title: "Ошибка при создании сотрудника",
      text: "Ошибка: Не выбрана автобаза",
      theme: "danger",
      autohide: true,
      interval: 10000,
    });
    return;
  }
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/worker/create`,
    "POST",
    createWorker,
    tempUserAuthCookie
  );

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при создании сотрудника",
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

  setCreateWorker(null);

  loadWorkers();
}

export default eventCreatedWorker;
