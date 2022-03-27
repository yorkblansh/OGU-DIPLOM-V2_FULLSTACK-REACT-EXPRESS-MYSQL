// из путевых
const Router = require("express");
const reportController = require("../controllers/Report.Controller");
const roleMiddleware = require("../middlewares/Role.Middleware"); // Middleware проверки на доступ по должности

const router = new Router();

router.get(
  "/gsm-day-garage/get",
  roleMiddleware(["Подписант"]),
  reportController.getGSMDayGarage
);
router.get(
  "/gsm-day-garage/get-sheet/get/:id",
  roleMiddleware(["Подписант"]),
  reportController.getSheetsToGarage
);
router.post(
  "/gsm-day-garage/get-report/get",
  roleMiddleware(["Подписант"]),
  reportController.getReport
);
router.get(
  "/report-sheet/get/:id",
  roleMiddleware(["Подписант"]),
  reportController.sheetReport
);

module.exports = router;
