// методы (контроллеры)
class PositionController {
  async getAllPositions(req, res) {
    let [rowsAllPositions] = await global.connectMySQL.execute(
      `SELECT * FROM positions`
    );
    res.json(rowsAllPositions);
  }

  async getOnePosition(req, res) {
    const idPosition = req.params.id;

    let [rowsGetRole] = await global.connectMySQL.execute(
      `SELECT * FROM positions WHERE ID = ${idPosition}` // отправляем запрос для получения актуальных ролей с СуБД MySQL таблицы ролей
    );

    res.json(rowsGetRole[0]);
  }
}

module.exports = new PositionController();
