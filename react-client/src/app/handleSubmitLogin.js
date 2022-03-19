import { REDIRECT } from "./REDIRECT";
import Toast from "./../../../Toast";

export const handleSubmitLogin = async (props, event) => {
    const {
        setStatusAccount,
        STATUS_ACCOUNT,
        setProfileUser,
        profileUser
    } = props
    event.preventDefault();

    const request = await window.funcRequest(
        `/account/login`,
        "POST",
        authAccount
    )
    const is404 = !request.ok && request.status === 400
    const data = new FormData(event.currentTarget);

    const authAccount = {
        loginUser: data.get("loginUser"),
        passwordUser: data.get("passwordUser"),
    };

    const LoginLengthCheck = (from, to) =>
        !authAccount.loginUser.length ||
        authAccount.loginUser.length < from ||
        authAccount.loginUser.length > to

    const PasswordLengthCheck = (from, to) =>
        !authAccount.passwordUser.length ||
        authAccount.passwordUser.length < from ||
        authAccount.passwordUser.length > to


    if (LoginLengthCheck(2, 20)) {
        new Toast({
            title: "Ошибка",
            text: "Логин не должен быть пустой строкой, либо меньше двух или больше двадцати символов",
            theme: "danger",
            autohide: true,
            interval: 5000,
        });
        return;
    }

    if (PasswordLengthCheck(2, 30)) {
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

    if (is404) {
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

    setStatusAccount(STATUS_ACCOUNT.ACCOUNT_AUTH);
    setProfileUser(request.responseFetch);

    setTimeout(() => REDIRECT("/account/profile"), 8000);

    return;
};
