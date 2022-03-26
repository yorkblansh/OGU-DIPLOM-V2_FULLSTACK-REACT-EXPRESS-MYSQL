const Router = require("express");
const sheetController = require("../controllers/Sheet.Controller");
const roleMiddleware = require("../middlewares/Role.Middleware"); // Middleware проверки на доступ по должности

const router = new Router();

router.get("/sheets/get", sheetController.getSheets);
router.get("/sheet/get/:id", sheetController.getOneSheet);
router.get(
  "/sheet/access",
  roleMiddleware(["Подписант"]),
  sheetController.getAccess
);
router.delete(
  "/sheet/delete/:id",
  roleMiddleware(["Подписант"]),
  sheetController.deleteSheet
);
router.put(
  "/sheet/change",
  roleMiddleware(["Подписант"]),
  sheetController.updateSheet
);
router.post(
  "/sheet/create",
  roleMiddleware(["Подписант"]),
  sheetController.createSheet
);

module.exports = router;
