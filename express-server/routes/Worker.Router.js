const Router = require("express");
const workerController = require("../controllers/Worker.Controller");
const roleMiddleware = require("../middlewares/Role.Middleware"); // Middleware проверки на доступ по должности

const router = new Router();

router.get("/workers/get", workerController.getWorkers);
router.get("/worker/get/:id", workerController.getOneWoker);
router.get(
  "/worker/access",
  roleMiddleware(["Админ"]),
  workerController.getAccess
);
router.delete(
  "/worker/delete/:id",
  roleMiddleware(["Админ"]),
  workerController.deleteWorker
);
router.put(
  "/worker/change",
  roleMiddleware(["Админ"]),
  workerController.updateWorker
);
router.post(
  "/worker/create",
  roleMiddleware(["Админ"]),
  workerController.createWorker
);

module.exports = router;
