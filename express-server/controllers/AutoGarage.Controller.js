// методы (контроллеры)
class AutoGarageController {
  async getAccess(req, res) {
    return res.status(200).json({ access: true, message: "Доступ открыт" });
  }

  // создать авто гараж
  async createAutoGarage(req, res) {
    const { Name, IDbase } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO garage (Name, IDbase) VALUES ('${Name}', '${IDbase}')`
    );

    res
      .status(200)
      .json(`Гараж (название: "${Name}", ID автобазы: "${IDbase}") создан.`);
  }

  // вернуть все авто гаражи
  async getAutoGarage(req, res) {
    let [rowsAllAutoGarages] = await global.connectMySQL.execute(
      `SELECT * FROM garage`
    );

    for (let index = 0; index < rowsAllAutoGarages.length; index++) {
      rowsAllAutoGarages[index].IDbase = await global.funcRequest(
        `/api/autobase/get/${rowsAllAutoGarages[index].IDbase}`
      );
    }

    res.status(200).json(rowsAllAutoGarages);
  }

  // вернуть один авто гараж
  async getOneAutoGarage(req, res) {
    const idGarage = req.params.id;

    let [rowsAutoGarages] = await global.connectMySQL.execute(
      `SELECT * FROM garage WHERE ID = ${idGarage}`
    );

    rowsAutoGarages[0].IDbase = await global.funcRequest(
      `/api/autobase/get/${rowsAutoGarages[0].IDbase}`
    );

    res.status(200).json(rowsAutoGarages[0]);
  }

  // изменить авто гараж
  async updateAutoGarage(req, res) {
    const { ID, Name, IDbase } = req.body;

    const [rowsUpdatedAutoGarage] = await global.connectMySQL.execute(
      `UPDATE garage SET Name = '${Name}', IDbase = '${IDbase}' WHERE ID = ${ID}`
    );
    if (rowsUpdatedAutoGarage["affectedRows"])
      res
        .status(200)
        .json(
          `Гараж (ID: ${ID} Название: ${Name} ID автобазы: ${IDbase}) изменен`
        );
    else res.status(400).json(`Гараж с ID: ${ID} не изменен`);
  }

  // удалить авто гараж
  async deleteAutoGarage(req, res) {
    const idGarage = req.params.id;

    let [checkCarForGarage] = await global.connectMySQL.execute(
      `SELECT * FROM car WHERE IDgarage = ${idGarage}`
    );

    if (checkCarForGarage.length) {
      res
        .status(400)
        .json(`Нельзя удалить гараж, потому что у него есть автомобили`);
    } else {
      let [checkSheetsForGarage] = await global.connectMySQL.execute(
        `SELECT * FROM sheet WHERE IDgarage = ${idGarage}`
      );

      if (checkSheetsForGarage.length) {
        res
          .status(400)
          .json(`Нельзя удалить гараж, потому что у него есть ведомости`);
      } else {
        let [rowsDeletedGarage] = await global.connectMySQL.execute(
          `DELETE FROM garage WHERE ID = ${idGarage}`
        );

        if (rowsDeletedGarage["affectedRows"])
          res.status(200).json(`Гараж с ID: ${idGarage} успешно удален`);
        else
          res.status(400).json(`Удалить гараж с ID: ${idGarage} не получилось`);
      }
    }
  }
}

module.exports = new AutoGarageController();
