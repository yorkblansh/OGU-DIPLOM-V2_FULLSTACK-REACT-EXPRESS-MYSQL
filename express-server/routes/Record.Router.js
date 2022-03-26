const Router = require("express");
const recordController = require("../controllers/Record.Controller");
const roleMiddleware = require("../middlewares/Role.Middleware"); // Middleware проверки на доступ по должности

const router = new Router();

router.get("/records/get", recordController.getRecords);
router.get("/record/get/:id", recordController.getOneRecord);
router.get(
  "/record/access",
  roleMiddleware(["Подписант"]),
  recordController.getAccess
);
router.delete(
  "/record/delete/:id",
  roleMiddleware(["Подписант"]),
  recordController.deleteRecord
);
router.put(
  "/record/change",
  roleMiddleware(["Подписант"]),
  recordController.updateRecord
);
router.post(
  "/record/create",
  roleMiddleware(["Подписант"]),
  recordController.createRecord
);

module.exports = router;
