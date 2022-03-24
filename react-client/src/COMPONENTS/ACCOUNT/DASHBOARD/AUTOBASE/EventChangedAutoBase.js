import Cookies from "js-cookie";
import Toast from "./../../../../Toast";

async function eventChangedAutoBase(
  funcRequest,
  loadAutoBases,
  changedAutoBase,
  inputNameAutoBase,
  setChangedAutoBase,
  setInputNameAutoBase
) {
  let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

  let tempChanged = {
    ...changedAutoBase,
    Name: inputNameAutoBase,
  };

  setChangedAutoBase(null);
  setInputNameAutoBase("");

  const response = await funcRequest(
    `/api/autobase/change`,
    "PUT",
    tempChanged,
    tempUserAuthCookie
  );

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

export default eventChangedAutoBase;
