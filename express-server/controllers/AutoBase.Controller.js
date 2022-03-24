class AutoBaseController {
  async getAccess(req, res) {
    return res.status(200).json({ access: true, message: "Доступ открыт" });
  }

  // создать автобазу
  async createAutoBase(req, res) {
    const { Name } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO base (Name) VALUES ('${Name}')`
    );

    res
      .status(200)
      .json(`Автомобильная база под названием "${Name}" успешно создана.`);
  }

  // вернуть все автобазы
  async getAutoBase(req, res) {
    let [rowsAllAutoBase] = await global.connectMySQL.execute(
      `SELECT * FROM base`
    );

    res.json(rowsAllAutoBase);
  }

  // вернуть одну автобазу
  async getOneAutoBase(req, res) {
    const idAutoBase = req.params.id;

    let [rowsAllAutoBase] = await global.connectMySQL.execute(
      `SELECT * FROM base WHERE ID = ${idAutoBase}`
    );

    res.status(200).json(rowsAllAutoBase[0]);
  }

  // удалить автобазу
  async deleteAutoBase(req, res) {
    const idAutoBase = req.params.id;

    let [checkGarageForBase] = await global.connectMySQL.execute(
      `SELECT * FROM garage WHERE IDBase = ${idAutoBase}`
    );

    if (checkGarageForBase.length) {
      res
        .status(400)
        .json(`Нельзя удалить автомобильную базу, у неё есть гаражи`);
    } else {
      let [checkGarageForWorker] = await global.connectMySQL.execute(
        `SELECT * FROM worker WHERE IDBase = ${idAutoBase}`
      );

      if (checkGarageForWorker.length) {
        res
          .status(400)
          .json(`Нельзя удалить автомобильную базу, у неё есть сотрудники`);
      } else {
        let [rowsDeletedAutoBased] = await global.connectMySQL.execute(
          `DELETE FROM base WHERE ID = ${idAutoBase}`
        );

        if (rowsDeletedAutoBased["affectedRows"])
          res.status(200).json(`Автобаза с ID: ${idAutoBase} успешна удалена`);
        else
          res
            .status(400)
            .json(`Удалить автобазу с ID: ${idAutoBase} не получилось`);
      }
    }
  }

  // изменить автобазу
  async updateAutoBase(req, res) {
    const { ID, Name } = req.body;

    const [rowsUpdatedAutoBase] = await global.connectMySQL.execute(
      `UPDATE base SET Name = '${Name}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedAutoBase["affectedRows"])
      res
        .status(200)
        .json(`Автобаза с ID: ${ID} изменила название на: ${Name}`);
    else
      res.status(400).json(`Переименовать автобазу с ID: ${ID} не получилось`);
  }
}

module.exports = new AutoBaseController();
