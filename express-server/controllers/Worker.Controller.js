// методы (контроллеры)
class WorkerController {
  async getAccess(req, res) {
    return res.status(200).json({ access: true, message: "Доступ открыт" });
  }

  async createWorker(req, res) {
    const { FIO, loginUser, passwordUser, Function, IDbase } = req.body;

    await global.connectMySQL.execute(
      `INSERT INTO worker (FIO, loginUser, passwordUser, worker.Function, IDbase) VALUES ('${FIO}', '${loginUser}', '${passwordUser}', '${Function}', '${IDbase}')`
    );

    res
      .status(200)
      .json(
        `Сотрудник (ФИО: "${FIO}", Логин: "${loginUser}", Пароль: "${passwordUser}", Номер должности: "${Function}", ID автобазы: "${IDbase}") создан.`
      );
  }

  async getWorkers(req, res) {
    let [rowsAllWorkers] = await global.connectMySQL.execute(
      `SELECT * FROM worker`
    );

    for (let index = 0; index < rowsAllWorkers.length; index++) {
      rowsAllWorkers[index].IDbase = await global.funcRequest(
        `/api/autobase/get/${rowsAllWorkers[index].IDbase}`
      );

      rowsAllWorkers[index].Function = await global.funcRequest(
        `/api/position/get/${rowsAllWorkers[index].Function}`
      );
    }

    res.status(200).json(rowsAllWorkers);
  }

  async getOneWoker(req, res) {
    const idWorker = req.params.id;

    let [rowsAllWorkers] = await global.connectMySQL.execute(
      `SELECT * FROM worker WHERE ID = ${idWorker}`
    );

    rowsAllWorkers[0].IDbase = await global.funcRequest(
      `/api/autobase/get/${rowsAllWorkers[0].IDbase}`
    );

    rowsAllWorkers[0].Function = await global.funcRequest(
      `/api/position/get/${rowsAllWorkers[0].Function}`
    );

    res.status(200).json(rowsAllWorkers[0]);
  }

  async updateWorker(req, res) {
    const { ID, FIO, loginUser, passwordUser, Function, IDbase } = req.body;

    const [rowsUpdatedWorker] = await global.connectMySQL.execute(
      `UPDATE worker SET FIO = '${FIO}', loginUser = '${loginUser}', passwordUser = '${passwordUser}', worker.Function = '${Function}', IDbase = '${IDbase}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedWorker["affectedRows"])
      res
        .status(200)
        .json(
          `Сотрудник (ID: ${ID} ФИО: "${FIO}", Логин: "${loginUser}", Пароль: "${passwordUser}", Номер должности: "${Function}", ID автобазы: "${IDbase}") изменен`
        );
    else res.status(400).json(`Сотрудник с ID: ${ID} не изменен`);
  }

  async deleteWorker(req, res) {
    const idWorker = req.params.id;

    let [checkRecordForWorker] = await global.connectMySQL.execute(
      `SELECT * FROM record WHERE IDdriver = ${idWorker}`
    );

    if (checkRecordForWorker.length) {
      res
        .status(400)
        .json(
          `Нельзя удалить сотрудника, потому что у него есть путевой лист как водителя`
        );
    } else {
      let [checkSheetsForWorker] = await global.connectMySQL.execute(
        `SELECT * FROM sheet WHERE IDsigner = ${idWorker}`
      );

      if (checkSheetsForWorker.length) {
        res
          .status(400)
          .json(
            `Нельзя удалить сотрудника, потому что у него есть ведомости как подписанта`
          );
      } else {
        let [rowsDeletedWorker] = await global.connectMySQL.execute(
          `DELETE FROM worker WHERE ID = ${idWorker}`
        );

        if (rowsDeletedWorker["affectedRows"])
          res.status(200).json(`Сотрудник с ID: ${idWorker} успешно удален`);
        else
          res
            .status(400)
            .json(`Удалить сотрудника с ID: ${idWorker} не получилось`);
      }
    }
  }
}

module.exports = new WorkerController();
