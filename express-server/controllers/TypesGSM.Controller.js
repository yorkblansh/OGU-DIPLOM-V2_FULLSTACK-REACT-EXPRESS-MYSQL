// методы (контроллеры)
class TypesGSMController {
  async getAccess(req, res) {
    return res.status(200).json({ access: true, message: "Доступ открыт" });
  }

  // создать тип ГСМ
  async createTypeGSM(req, res) {
    const { Name, ForKilo } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO gsm (Name, ForKilo) VALUES ('${Name}', '${ForKilo}')`
    );

    res
      .status(200)
      .json(`Вид ГСМ (название: "${Name}", вес: "${ForKilo}") создан.`);
  }

  // вернуть все типы ГСМ
  async getTypesGSM(req, res) {
    let [rowsAllGSM] = await global.connectMySQL.execute(`SELECT * FROM gsm`);

    res.status(200).json(rowsAllGSM);
  }

  // вернуть один тип ГСМ
  async getOneTypeGSM(req, res) {
    const idGSM = req.params.id;

    let [rowsAllAutoBase] = await global.connectMySQL.execute(
      `SELECT * FROM gsm WHERE ID = ${idGSM}`
    );

    res.status(200).json(rowsAllAutoBase[0]);
  }

  // изменить тип ГСМ
  async updateTypeGSM(req, res) {
    const { ID, Name, ForKilo } = req.body;

    const [rowsUpdatedAutoBase] = await global.connectMySQL.execute(
      `UPDATE gsm SET Name = '${Name}', ForKilo = '${ForKilo}' WHERE ID = ${ID}`
    );
    if (rowsUpdatedAutoBase["affectedRows"])
      res
        .status(200)
        .json(`ГСМ с ID: ${ID} изменен. Название: ${Name}, вес: ${ForKilo}`);
    else res.status(400).json(`Изменить ГСМ с ID: ${ID} не получилось`);
  }

  // удалить тип ГСМ
  async deleteTypeGSM(req, res) {
    const idGSM = req.params.id;

    let [checkRecordsForGSM] = await global.connectMySQL.execute(
      `SELECT * FROM record WHERE IDgsm = ${idGSM}`
    );

    if (checkRecordsForGSM.length) {
      res
        .status(400)
        .json(`Нельзя удалить вид ГСМ, у него есть связанные путевые листы`);
    } else {
      let [rowsDeletedGSM] = await global.connectMySQL.execute(
        `DELETE FROM gsm WHERE ID = ${idGSM}`
      );

      if (rowsDeletedGSM["affectedRows"])
        res.status(200).json(`Вид ГСМ с ID: ${idGSM} успешно удален`);
      else res.status(400).json(`Удалить вид ГСМ с ID: ${idGSM} не получилось`);
    }
  }
}

module.exports = new TypesGSMController();
