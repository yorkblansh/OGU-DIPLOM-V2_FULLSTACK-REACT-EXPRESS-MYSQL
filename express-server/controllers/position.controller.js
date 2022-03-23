// методы (контроллеры)
class PositionController {
  async getAllPositions(req, res) {
    let [rowsAllPositions] = await global.connectMySQL.execute(
      `SELECT * FROM positions`
    );
    res.json(rowsAllPositions);
  }
}

module.exports = new PositionController();
