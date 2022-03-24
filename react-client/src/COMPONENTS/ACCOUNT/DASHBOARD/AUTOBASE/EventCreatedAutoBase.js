import Cookies from "js-cookie";
import Toast from "../../../../Toast";

async function eventCreatedAutoBase(
  funcRequest,
  loadAutoBases,
  createNameAutoBase,
  setCreateNameAutoBase
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  const response = await funcRequest(
    `/api/autobase/create`,
    "POST",
    {
      Name: createNameAutoBase,
    },
    tempUserAuthCookie
  );

  setCreateNameAutoBase("");

  if (response.ok === false && response.status === 400) {
    new Toast({
      title: "Ошибка при изменении автомобильной базы",
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

  loadAutoBases();
}

export default eventCreatedAutoBase;
