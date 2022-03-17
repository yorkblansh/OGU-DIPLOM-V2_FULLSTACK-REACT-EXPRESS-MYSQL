const autoBaseRouter = require("./routes/autobase.router");
const typesGSMrouter = require("./routes/typesGSM.router");
const autoGarageRouter = require("./routes/autoGarageRouter");
const vehicleRouter = require("./routes/vehicle.router");
const workersRouter = require("./routes/worker.router");
const sheetRouter = require("./routes/sheet.router");
const recordRouter = require("./routes/record.router");
const reportRouter = require("./routes/report.router");
const accountRouter = require("./routes/account.router");

app.use("/api", autoBaseRouter);
app.use("/api", typesGSMrouter);
app.use("/api", autoGarageRouter);
app.use("/api", vehicleRouter);
app.use("/api", workersRouter);
app.use("/api", sheetRouter);
app.use("/api", recordRouter);
app.use("/api", reportRouter);
app.use("/account", accountRouter); // 4. слушаем апи для работы с аккаунтами
