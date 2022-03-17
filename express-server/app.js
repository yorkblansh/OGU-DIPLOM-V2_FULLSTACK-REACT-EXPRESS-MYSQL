// __________________________________________________ ИМПОРТЫ
const express = require("express");
const mysql = require("mysql2/promise");
let cors = require("cors");
let axios = require("axios");

const {
  SERVER_SECRET_KEY,
  SERVER_START_ON_PORT,
  SERVER_WORKIN_ON_ADRESS,
  SERVER_MYSQL_SETTINGS,
} = require("./ServerConfig.json");

const accountRouter = require(`./routes/Account.Router`);

// __________________________________________________ ОБЪЕКТЫ
const app = express();

// __________________________________________________ ЗАПУСК СЕРВЕРА
app.listen(SERVER_START_ON_PORT, async () => {
  try {
    global.connectMySQL = await mysql.createPool(SERVER_MYSQL_SETTINGS);

    global.checkSQL = `SELECT * FROM checkConnect`;
    let [[{ statusConnect }]] = await global.connectMySQL.execute(
      global.checkSQL
    );

    if (statusConnect !== 1) {
      throw `
      Проверьте данные для подключения к СуБД MySQL
      Возможно, данные подключения к СуБД MySQL неверные.
      Эти данные находятся в файле "ServerConfig.json" в корне проекта.
      Проверьте, чтобы в таблице "checkconnect", единственно существующее свойство "statusConnect" было в значении "1".
      Сейчас это значение "${statusConnect}"
      `;
    }

    console.log(
      `Приложение Express JS запущено на порту "${SERVER_START_ON_PORT}" и подключение к СуБД MySQL успешно.`
    );
  } catch (error) {
    console.log(
      `________________________________________________________________________________________________________________________`
    );
    console.log(`Ошибка подключения к СуБД MySQL!`);
    console.log(`SQL запрос: ${global.checkSQL}`);
    console.log(`Конфиг подключения к СуБД MySQL:`);
    console.log(SERVER_MYSQL_SETTINGS);
    console.log(`Информация о ошибке:`);
    console.log(error);
    console.log(
      `________________________________________________________________________________________________________________________`
    );
  }
});

// __________________________________________________ РАБОТА С СЕРВЕРОМ
global.funcRequest = async (url, method = "GET", data = null) => {
  try {
    let response;

    if (method === "GET") {
      response = await axios.get(`${URL_THIS_SERVER}:${PORT}${url}`);
    }

    return response.data;
  } catch (err) {
    console.error(err.message);
  }
  return 554;
};

// __________________________________________________ НАСТРОЙКА
app.use(cors());
app.use(express.json());

app.use("/account", accountRouter);
