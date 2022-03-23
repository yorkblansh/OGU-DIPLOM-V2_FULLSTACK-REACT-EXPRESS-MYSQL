import Toast from "./../../../Toast";
import Cookies from "js-cookie";

const authorizeAccount = async (
  event,
  funcRequest,
  setButtonLoginUsingStatus,
  setWorkerAccount,
  navigate
) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const authAccount = {
    loginUser: data.get("loginUser"),
    passwordUser: data.get("passwordUser"),
  };

  if (
    !authAccount.loginUser.length ||
    authAccount.loginUser.length < 2 ||
    authAccount.loginUser.length > 20
  ) {
    new Toast({
      title: "Ошибка",
      text: "Логин не должен быть пустой строкой, либо меньше двух или больше двадцати символов",
      theme: "danger",
      autohide: true,
      interval: 5000,
    });
    return;
  }

  if (
    !authAccount.passwordUser.length ||
    authAccount.passwordUser.length < 2 ||
    authAccount.passwordUser.length > 30
  ) {
    new Toast({
      title: "Ошибка",
      text: "Пароль не должен быть пустой строкой, либо меньше двух или больше тридцати символов",
      theme: "danger",
      autohide: true,
      interval: 5000,
    });
    return;
  }

  new Toast({
    title: "Авторизация аккаунта",
    text: "На сервер был отправлен запрос на авторизацию аккаунта, ждите...",
    theme: "light",
    autohide: true,
    interval: 3000,
  });

  const request = await funcRequest(
    `/account/login`,
    "POST",
    authAccount,
    null
  );

  if (!request.ok && request.status === 400) {
    new Toast({
      title: "Ошибка при авторизации аккаунта",
      text: request.responseFetch,
      theme: "danger",
      autohide: true,
      interval: 5000,
    });
    return;
  }

  new Toast({
    title: "Вас ждет успех!",
    text: request.responseFetch.message,
    theme: "success",
    autohide: true,
    interval: 8000,
  });

  new Toast({
    title: "Переадресация",
    text: `Пожалуйста, оставайтесь на этой странице! Через 8 секунд вас автоматически перенаправит на рабочие возможности...`,
    theme: "info",
    autohide: true,
    interval: 10000,
  });

  Cookies.set("OGU_DIPLOM_COOKIE_AUTHTOKEN", request.responseFetch.token);

  setWorkerAccount(request.responseFetch.acc);

  setButtonLoginUsingStatus(true);

  setTimeout(() => navigate("/account/dashboard"), 8000);
  return;
};

export default authorizeAccount;
