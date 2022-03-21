// __________________________________________________ ИМПОРТЫ
const { validationResult } = require("express-validator"); // Импортируем функцию "validationResult" из express-validator
const jwt = require("jsonwebtoken");

// __________________________________________________ НАСТРОЙКИ
const { SERVER_SECRET_KEY } = require("./../ServerConfig.json");

// __________________________________________________ ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ
// Функция генерации токена
function generateAccessToken(id, login, password, func) {
  // Полученную от функции данные засовываем в payload
  const payload = { id, login, password, func };

  return jwt.sign(payload, SERVER_SECRET_KEY, { expiresIn: "24h" }); // Возвращаем созданный на основании payload, секретного ключа токен который будет жить 24 часа
}

// __________________________________________________ КОНТРОЛЛЕР
// Класс контроллера аккаунта
class AccountController {
  // ________________________________________ МЕТОДЫ КОНТРОЛЛЕРА АККАУНТА
  // Метод создания аккаунта
  async register(req, res) {
    try {
      const errors = validationResult(req); // Получаем массив ошибок валидации данных

      let errMessages = ``; // Создаем временную переменную для возврата на клиент ошибок валидации данных в удобном в будущем виде

      // Если массив ошибок валидации данных не пустой
      if (!errors.isEmpty()) {
        // Бегаем по массиву ошибок валидации данных
        for (let i = 0; i < errors.errors.length; i++) {
          errMessages += `${errors.errors[i].msg} | `; // Прибавляем их в переменную
        }

        return res
          .status(400)
          .json(`Ошибка при регистрации. Подробная информация: ${errMessages}`); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
      }

      const { fio1, fio2, fio3, loginUser, passwordUser } = req.body; // Извлекаем данные из тела запроса

      let [rowsCheckWorkerAccount] = await global.connectMySQL.execute(
        `SELECT * FROM worker WHERE loginUser = '${loginUser}'` // Отправляем запрос на наличие такого аккаунта
      );

      // Если аккаунт уже существует
      if (rowsCheckWorkerAccount.length > 0) {
        return res
          .status(400)
          .json(`Аккаунт с логином ${loginUser} уже существует.`); // Оповещаем клиент о невозможности создания аккаунта
      }

      // Отправляем запрос на создание аккаунта
      let [rowsCreateWorker] = await global.connectMySQL.execute(
        `INSERT INTO worker (FIO, loginUser, passwordUser, Function, IDbase) VALUES ('${fio1} ${fio2} ${fio3}', '${loginUser}', '${passwordUser}', '0', '0')`
      );

      // Если аккаунт создать не получилось
      if (!rowsCreateWorker["affectedRows"]) {
        return res.status(400).json(
          `Неизвестная ошибка при создании аккаунта #1. (NODE: EXPRESS JS)` // Оповещаем клиент
        );
      }

      res
        .status(200)
        .json(`Аккаунт с логином ${loginUser} успешно зарегистрирован`); // Если все хорошо то аккаунт создан
    } catch (errorObject) {
      // Обработаем ошибки по необходимости
      console.log(errorObject);

      res
        .status(400)
        .json({ message: `Ошибка создания аккаунта`, error: errorObject }); // Оповещаем клиент о ошибках
    }
  }

  // Метод авторизации аккаунта
  async login(req, res) {
    try {
      const errors = validationResult(req); // Получаем массив ошибок валидации данных

      let errMessages = ``; // Создаем временную переменную для возврата на клиент ошибок валидации данных в удобном в будущем виде

      // Если массив ошибок валидации данных не пустой
      if (!errors.isEmpty()) {
        // Бегаем по массиву ошибок валидации данных
        for (let i = 0; i < errors.errors.length; i++) {
          errMessages += `${errors.errors[i].msg} | `; // Прибавляем их в переменную
        }

        return res
          .status(400)
          .json(`Ошибка при авторизации. Подробная информация: ${errMessages}`); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
      }

      const { loginUser, passwordUser } = req.body; // Извлекаем данные из тела запроса

      let [rowsCheckWorkerAccount] = await global.connectMySQL.execute(
        `SELECT * FROM worker WHERE loginUser = '${loginUser}'` // Отправляем запрос о наличии аккаунта
      );

      // Если аккаунта не существует
      if (!rowsCheckWorkerAccount.length) {
        return res
          .status(400)
          .json(`Аккаунта с логином ${loginUser} не существует.`); // Оповещаем клиента о невозможности авторизации аккаунта
      }

      // Если пароль введен неверно
      if (rowsCheckWorkerAccount[0].passwordUser !== passwordUser) {
        return res.status(400).json(`Пароль от аккаунта введен не правильно.`); // Оповещаем клиента о невозможности авторизации аккаунта
      }

      // Вызываем функцию генерации токена
      const token = generateAccessToken(
        rowsCheckWorkerAccount[0].ID, // Передаем на нее ID аккаунта
        rowsCheckWorkerAccount[0].loginUser, // Логин
        rowsCheckWorkerAccount[0].passwordUser, // Пароль
        rowsCheckWorkerAccount[0].Function // ID должности
      );

      // Оповещаем клиента о успешной авторизации
      res.status(200).json({
        token, // Передаем на клиент токен
        message: `Аккаунт успешно авторизирован`, // Сообщение успеха
        acc: rowsCheckWorkerAccount[0], // Данные аккаунта
      });
    } catch (errorObject) {
      // Обработаем ошибки по необходимости
      console.log(errorObject);

      res
        .status(400)
        .json({ message: `Ошибка авторизации аккаунта`, error: errorObject }); // Оповещаем клиент о ошибках
    }
  }

  async getWorkerProfile(req, res) {
    const { loginUser } = req.body;

    let [rowsCheckWorkerAccount] = await global.connectMySQL.execute(
      `SELECT * FROM worker WHERE loginUser = '${loginUser}'` // Отправляем запрос о наличии аккаунта
    );

    // Если аккаунта не существует
    if (!rowsCheckWorkerAccount.length) {
      return res
        .status(400)
        .json(`Аккаунта с логином ${loginUser} не существует.`); // Оповещаем клиента о невозможности авторизации аккаунта
    }

    // console.log(rowsCheckWorkerAccount);
    res.json(rowsCheckWorkerAccount[0]);
  }

  // Метод получения всех пользователей
  // async getAllUsers(req, res) {
  //   try {
  //     let [rowsAllWorkers] = await global.connectMySQL.execute(
  //       `SELECT * FROM worker` // Отправляем запрос получения всех пользователей
  //     );

  //     res.json(rowsAllWorkers); // Результат запроса отправляем на клиент
  //   } catch (errorObject) {
  //     // Обработаем ошибки по необходимости
  //     console.log(errorObject);

  //     res.status(400).json({
  //       message: `Ошибка получения пользователей`, // Оповещаем клиент о ошибках
  //       error: errorObject,
  //     });
  //   }
  // }
}

module.exports = new AccountController();
