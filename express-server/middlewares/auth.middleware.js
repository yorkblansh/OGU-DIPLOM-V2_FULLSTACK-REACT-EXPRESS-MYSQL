// __________________________________________________ ИМПОРТЫ
const jwt = require("jsonwebtoken");

// __________________________________________________ НАСТРОЙКИ
const { SERVER_SECRET_KEY } = require("../ServerConfig.json");

// __________________________________________________ MIDDLEWARE
module.exports = function (req, res, next) {
  // Скипаем данный метод
  if (req.method === "OPTIONS") {
    next(); // запускаем следующий по ходу middleware
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // Получаем токен из шапки запроса

    // Если токена нет
    if (!token) {
      res.status(403).json({ message: `Пользователь не авторизован` });
    }

    const decodedData = jwt.verify(token, SERVER_SECRET_KEY); // Декодируем токен с использованием секретного серверного ключа

    req.userData = decodedData; // Помещаем токен в запрос чтобы дальше с ним работать

    next(); // запускаем следующий по ходу middleware
  } catch (err) {
    // Обработаем ошибки по необходимости
    res.status(403).json({ message: `Пользователь не авторизован` });
  }
};
