import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Toast from "./../../../../Toast";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import eventSelectedSheet from "./EventSelectedSheet";

const ReportSheet = ({ funcRequest }) => {
  let [statusAccessEditing, setStatusAccessEditing] = useState(false);
  let [allSheets, setSheets] = useState([]);
  let [sheetSelected, setSheetSelected] = useState(null);
  let [divSheetHidden, setDivSheetHidden] = useState(false);
  let [sheetReport, setSheetReport] = useState([]);

  useEffect(loadComponent, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadComponent() {
    let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    const tempGetAccess = await funcRequest(
      "/api/sheet/access",
      "GET",
      null,
      tempUserAuthCookie
    );

    setStatusAccessEditing(tempGetAccess.responseFetch.access);

    const sheets = await funcRequest(`/api/sheets/get`);

    setSheets(sheets.responseFetch);
  }

  return (
    <div className="ReportSheet">
      {divSheetHidden === false ? (
        <div>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="signer-user-select-sheet">
              Выберите ведомость
            </InputLabel>
            <Select
              labelId="signer-user-select-sheet"
              label="Выберите ведомость"
              defaultValue={99999}
              onChange={(e) => {
                if (e.target.value === 99999) {
                  new Toast({
                    title: "Ошибка при выборе",
                    text: "Этот пукнт не доступен к выбору",
                    theme: "danger",
                    autohide: true,
                    interval: 10000,
                  });
                  return;
                }

                setSheetSelected(e.target.value);
              }}
            >
              <MenuItem value={99999}>Выберите ведомость</MenuItem>
              {allSheets.map((sheet) => {
                return (
                  <MenuItem key={sheet.ID} value={sheet.ID}>
                    {sheet.NumberSheet}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="success"
            sx={{ mt: 1 }}
            fullWidth
            onClick={() =>
              eventSelectedSheet(
                sheetSelected,
                setDivSheetHidden,
                funcRequest,
                setSheetReport,
                statusAccessEditing
              )
            }
          >
            Установить
          </Button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Гараж</th>
                <th>Номер ведомости</th>
                <th>Дата</th>
                <th>Подписант</th>
              </tr>
            </thead>
            <tbody>
              {sheetReport[0]?.map((rep, index) => {
                return (
                  <tr key={index}>
                    <td>{rep.Name}</td>
                    <td>{rep.NumberSheet}</td>
                    <td>{rep.DateSheet}</td>
                    <td>{rep.FIO}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <br />
          <br />
          <br />

          <table>
            <thead>
              <tr>
                <th>Автомобиль</th>
                <th>Номер</th>
                <th>Номер путевого листа</th>
                <th>Водитель</th>
                <th>ГСМ</th>
                <th>Литры</th>
              </tr>
            </thead>
            <tbody>
              {sheetReport[1]?.map((rep, index) => {
                return (
                  <tr key={index}>
                    <td>{rep.Model}</td>
                    <td>{rep.Number}</td>
                    <td>{rep.NumberPL}</td>
                    <td>{rep.FIO}</td>
                    <td>{rep.Name}</td>
                    <td>{rep.Liter}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Button
            variant="contained"
            color="success"
            sx={{ mt: 1 }}
            fullWidth
            onClick={() => {
              setDivSheetHidden(false);
            }}
          >
            Сбросить таблицу
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportSheet;
