// __________________________________________________ ИМПОРТЫ
const jwt = require("jsonwebtoken");

// __________________________________________________ НАСТРОЙКИ
const { SERVER_SECRET_KEY } = require("../ServerConfig.json");

// __________________________________________________ MIDDLEWARE
// Получаем массив ролей текстом
module.exports = function (roles) {
  // с помощью замыкания создаем middleware
  return async function (req, res, next) {
    // Скипаем данный метод
    if (req.method === "OPTIONS") {
      next(); // запускаем следующий по ходу middleware
    }

    try {
      const token = req.headers.authorization.split(" ")[1]; // Получаем токен из шапки запроса

      // Если токена нет
      if (!token) {
        return res
          .status(403)
          .json({ access: false, message: "Пользователь не авторизован" });
      }

      const decodedData = jwt.verify(token, SERVER_SECRET_KEY); // Декодируем токен с использованием секретного серверного ключа

      const { func: UserRoleID } = decodedData; // Берем ID роли из декодированных данных и переименовывем на UserRole

      let tempOnePositions = await global.funcRequest(
        `/api/position/get/${UserRoleID}`
      );

      let hasRole = false; // по умолчанию нет доступа

      // бегаем по переданным ролям в мидлваер
      for (let index = 0; index < roles.length; index++) {
        if (tempOnePositions.Role === roles[index]) {
          hasRole = true;
          break;
        }
      }

      // если роли так и не подошли
      if (!hasRole) {
        return res.status(403).json({ access: false, message: "Нет доступа" });
      }

      req.userData = decodedData; // Помещаем токен в запрос чтобы дальше с ним работать

      next(); // вызываем следующий мидлваер
    } catch (err) {
      console.log(err);
      // Обработаем ошибки по необходимости
      res
        .status(403)
        .json({ access: false, message: `Пользователь не авторизован` });
    }
  };
};
