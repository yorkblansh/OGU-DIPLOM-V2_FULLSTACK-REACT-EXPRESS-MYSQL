class AccountController {
  async register(req, res) {
    try {
      const { fio1, fio2, fio3, loginUser, passwordUser } = req.body;

      let [rowsCheckWorkerAccount] = await global.connectMySQL.execute(
        `SELECT * FROM worker WHERE loginUser = '${loginUser}'`
      );

      if (rowsCheckWorkerAccount.length > 0) {
        return res
          .status(400)
          .json(`Аккаунт с логином ${loginUser} уже существует.`);
      }

      let [rowsCreateWorker] = await global.connectMySQL.execute(
        `INSERT INTO worker (FIO, loginUser, passwordUser, Function, IDbase) VALUES ('${fio1} ${fio2} ${fio3}', '${loginUser}', '${passwordUser}', '0', '0')`
      );

      if (!rowsCreateWorker["affectedRows"]) {
        return res
          .status(400)
          .json(
            `Неизвестная ошибка при создании аккаунта #1. (NODE: EXPRESS JS)`
          );
      }

      res
        .status(200)
        .json(`Аккаунт с логином ${loginUser} успешно зарегистрирован`);

      // res.json(req.body);
    } catch (errorObject) {
      // console.log(errorObject);
      // res
      //   .status(400)
      //   .json({ message: `Ошибка создания аккаунта`, error: errorObject });
    }
  }

  async login(req, res) {
    try {
      res.json(2);
    } catch (errorObject) {
      console.log(errorObject);

      res
        .status(400)
        .json({ message: `Ошибка авторизации аккаунта`, error: errorObject });
    }
  }

  async getAllUsers(req, res) {
    try {
      res.json(3);
    } catch (errorObject) {
      console.log(errorObject);

      res.status(400).json({
        message: `Ошибка получения пользователей`,
        error: errorObject,
      });
    }
  }
}

module.exports = new AccountController();
