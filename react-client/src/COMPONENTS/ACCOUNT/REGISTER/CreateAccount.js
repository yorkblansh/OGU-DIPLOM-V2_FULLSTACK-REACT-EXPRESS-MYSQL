import Toast from "./../../../Toast";

const createAccount = async (
  event,
  funcRequest,
  setButtonRegisterUsingStatus,
  navigate
) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const newAccount = {
    fio1: data.get("FIO1"),
    fio2: data.get("FIO2"),
    fio3: data.get("FIO3"),
    loginUser: data.get("loginUser"),
    passwordUser: data.get("passwordUser"),
  };

  if (!newAccount.fio1.length) {
    new Toast({
      title: "Ошибка",
      text: "Строка с фамилией не должна быть пустой",
      theme: "danger",
      autohide: true,
      interval: 5000,
    });
    return;
  }

  if (!newAccount.fio2.length) {
    new Toast({
      title: "Ошибка",
      text: "Строка с именем не должна быть пустой",
      theme: "danger",
      autohide: true,
      interval: 5000,
    });
    return;
  }

  if (!newAccount.fio3.length) {
    new Toast({
      title: "Ошибка",
      text: "Строка с отчеством не должна быть пустой",
      theme: "danger",
      autohide: true,
      interval: 5000,
    });
    return;
  }

  if (
    `${newAccount.fio1} ${newAccount.fio2} ${newAccount.fio3}`.length < 8 ||
    `${newAccount.fio1} ${newAccount.fio2} ${newAccount.fio3}`.length > 101
  ) {
    new Toast({
      title: "Ошибка",
      text: "Фамилия, имя и отчество вместе с пробелами (Пример: Викторов Ян Васильевич) не должны быть меньше чем 8 символов или больше чем 101 символ",
      theme: "danger",
      autohide: true,
      interval: 5000,
    });
    return;
  }

  if (
    !newAccount.loginUser.length ||
    newAccount.loginUser.length < 2 ||
    newAccount.loginUser.length > 20
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
    !newAccount.passwordUser.length ||
    newAccount.passwordUser.length < 2 ||
    newAccount.passwordUser.length > 30
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
    title: "Создание аккаунта",
    text: "На сервер был отправлен запрос на создание аккаунта, ждите...",
    theme: "light",
    autohide: true,
    interval: 3000,
  });

  const request = await funcRequest(`/account/register`, "POST", newAccount);

  if (!request.ok && request.status === 400) {
    new Toast({
      title: "Ошибка при создании аккаунта",
      text: request.responseFetch,
      theme: "danger",
      autohide: true,
      interval: 5000,
    });
    return;
  }

  new Toast({
    title: "Вас ждет успех!",
    text: `${request.responseFetch}`,
    theme: "success",
    autohide: true,
    interval: 8000,
  });

  new Toast({
    title: "Переадресация",
    text: `Пожалуйста, оставайтесь на этой странице! Через 8 секунд вас автоматически перенаправит на страницу авторизации...`,
    theme: "info",
    autohide: true,
    interval: 10000,
  });

  setButtonRegisterUsingStatus(true);

  setTimeout(() => navigate("/account/login"), 8000);
  return;
};

export default createAccount;
