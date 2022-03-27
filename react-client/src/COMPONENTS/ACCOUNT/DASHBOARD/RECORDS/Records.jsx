import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Toast from "./../../../../Toast";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import deleteRecord from "./DeleteRecord";
import beginUpdateRecord from "./BeginUpdateRecord";
import eventChangedRecord from "./EventChangedRecord";
import eventCreatedRecord from "./EventCreatedRecord";

const Records = ({ funcRequest, workerAccount }) => {
  let [statusAccessEditing, setStatusAccessEditing] = useState(false);
  let [allRecords, setRecords] = useState([]);
  let [changedRecord, setChangedRecord] = useState(null);
  let [inputObjectRecord, setInputObjectRecord] = useState({
    ID: null,
    IDsheet: null,
    IDcar: null,
    IDdriver: null,
    NumberPL: null,
    IDgsm: null,
    Liter: null,
  });
  let [allSheets, setSheets] = useState([]);
  let [allVehicles, setVehicles] = useState([]);
  let [allWorkers, setWorkers] = useState([]);
  let [allTypesGSM, setTypesGSM] = useState([]);
  let [createRecord, setCreateRecord] = useState(null);

  useEffect(loadRecords, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadRecords() {
    let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    const tempGetAccess = await funcRequest(
      "/api/record/access",
      "GET",
      null,
      tempUserAuthCookie
    );

    setStatusAccessEditing(tempGetAccess.responseFetch.access);

    const records = await funcRequest(`/api/records/get/`);

    setRecords(records.responseFetch);

    const sheets = await funcRequest(`/api/sheets/get`);

    sheets.responseFetch = sheets.responseFetch.filter((sheet) => {
      return sheet.IDsigner.ID === workerAccount.ID;
    });

    setSheets(sheets.responseFetch);

    const vehicles = await funcRequest(`/api/vehicles/get`);

    setVehicles(vehicles.responseFetch);

    let workers = await funcRequest(`/api/workers/get`);

    workers.responseFetch = workers.responseFetch.filter((worker) => {
      return worker.Function.ID === 1;
    });

    setWorkers(workers.responseFetch);

    const typesGSM = await funcRequest(`/api/type-gsm/get`);

    setTypesGSM(typesGSM.responseFetch);
  }

  return (
    <div className="Records">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID путевого листа</th>
              <th>Ведомость (ID)</th>
              <th>Автомобиль (ID)</th>
              <th>Водитель (ID)</th>
              <th>Номер путевого листа</th>
              <th>ГСМ (ID)</th>
              <th>Литры</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {allRecords.length ? (
              allRecords.map((record) => {
                return (
                  <tr key={record.ID}>
                    <td>{record.ID}</td>
                    <td>
                      {record.IDsheet.NumberSheet} ({record.IDsheet.ID})
                    </td>
                    <td>
                      {record.IDcar.Model} : {record.IDcar.Number} (
                      {record.IDcar.ID})
                    </td>
                    <td>
                      {record.IDdriver.FIO} ({record.IDdriver.ID})
                    </td>
                    <td>{record.NumberPL}</td>
                    <td>
                      {record.IDgsm.Name} ({record.IDgsm.ID})
                    </td>
                    <td>{record.Liter}</td>
                    <td>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          deleteRecord(
                            record,
                            funcRequest,
                            loadRecords,
                            statusAccessEditing
                          );
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => {
                          beginUpdateRecord(
                            record,
                            changedRecord,
                            setChangedRecord,
                            setInputObjectRecord,
                            workerAccount,
                            statusAccessEditing
                          );
                        }}
                      >
                        <BorderColorIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8">Путевых листов не найдено</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {statusAccessEditing ? (
        <div className="editing-wrapper">
          <div className="changed-wrapper">
            {changedRecord !== null ? (
              <div>
                <h4>Редактирование путевого листа {changedRecord.ID}</h4>

                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="record-change-select-sheet">
                    Выберите ведомость
                  </InputLabel>
                  <Select
                    labelId="record-change-select-sheet"
                    label="Выберите ведомость"
                    defaultValue={99999}
                    onChange={(e) => {
                      let tempSheet = e.target.value;

                      if (tempSheet === 99999) {
                        new Toast({
                          title: "Ошибка при выборе",
                          text: "Этот пукнт не доступен к выбору",
                          theme: "danger",
                          autohide: true,
                          interval: 10000,
                        });
                        return;
                      }

                      let tempThisRecord = {
                        ...inputObjectRecord,
                        ID: changedRecord.ID,
                        IDsheet: tempSheet,
                      };

                      setInputObjectRecord(tempThisRecord);
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

                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="record-change-select-auto">
                    Выберите автомобиль
                  </InputLabel>
                  <Select
                    labelId="record-change-select-auto"
                    label="Выберите автомобиль"
                    defaultValue={99999}
                    onChange={(e) => {
                      let tempVehicle = e.target.value;

                      if (tempVehicle === 99999) {
                        new Toast({
                          title: "Ошибка при выборе",
                          text: "Этот пукнт не доступен к выбору",
                          theme: "danger",
                          autohide: true,
                          interval: 10000,
                        });
                        return;
                      }

                      let tempThisRecord = {
                        ...inputObjectRecord,
                        ID: changedRecord.ID,
                        IDcar: tempVehicle,
                      };

                      setInputObjectRecord(tempThisRecord);
                    }}
                  >
                    <MenuItem value={99999}>Выберите автомобиль</MenuItem>
                    {allVehicles.map((vehicle) => {
                      return (
                        <MenuItem key={vehicle.ID} value={vehicle.ID}>
                          {vehicle.Model} : {vehicle.Number}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="record-change-select-worker">
                    Выберите водителя
                  </InputLabel>
                  <Select
                    labelId="record-change-select-worker"
                    label="Выберите водителя"
                    defaultValue={99999}
                    onChange={(e) => {
                      let tempWorker = e.target.value;

                      if (tempWorker === 99999) {
                        new Toast({
                          title: "Ошибка при выборе",
                          text: "Этот пукнт не доступен к выбору",
                          theme: "danger",
                          autohide: true,
                          interval: 10000,
                        });
                        return;
                      }

                      let tempThisRecord = {
                        ...inputObjectRecord,
                        ID: changedRecord.ID,
                        IDdriver: tempWorker,
                      };

                      setInputObjectRecord(tempThisRecord);
                    }}
                  >
                    <MenuItem value={99999}>Выберите водителя</MenuItem>
                    {allWorkers.map((worker) => {
                      return (
                        <MenuItem key={worker.ID} value={worker.ID}>
                          {worker.FIO} ({worker.ID})
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <TextField
                  id="standard-basic"
                  label="Введите номер путевого листа"
                  variant="standard"
                  fullWidth
                  sx={{ mt: 1 }}
                  onChange={(e) => {
                    setInputObjectRecord({
                      ...inputObjectRecord,
                      ID: changedRecord.ID,
                      NumberPL: e.target.value,
                    });
                  }}
                />

                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="record-change-select-type-gsm">
                    Выберите ГСМ
                  </InputLabel>
                  <Select
                    labelId="record-change-select-type-gsm"
                    label="Выберите ГСМ"
                    defaultValue={99999}
                    onChange={(e) => {
                      let tempGSM = e.target.value;

                      if (tempGSM === 99999) {
                        new Toast({
                          title: "Ошибка при выборе",
                          text: "Этот пукнт не доступен к выбору",
                          theme: "danger",
                          autohide: true,
                          interval: 10000,
                        });
                        return;
                      }

                      let tempThisRecord = {
                        ...inputObjectRecord,
                        ID: changedRecord.ID,
                        IDgsm: tempGSM,
                      };

                      setInputObjectRecord(tempThisRecord);
                    }}
                  >
                    <MenuItem value={99999}>Выберите ГСМ</MenuItem>
                    {allTypesGSM.map((gsm) => {
                      return (
                        <MenuItem key={gsm.ID} value={gsm.ID}>
                          {gsm.Name} ({gsm.ID})
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <TextField
                  id="standard-basic"
                  label="Введите количество литров"
                  variant="standard"
                  fullWidth
                  sx={{ mt: 1 }}
                  onChange={(e) => {
                    setInputObjectRecord({
                      ...inputObjectRecord,
                      ID: changedRecord.ID,
                      Liter: e.target.value,
                    });
                  }}
                />

                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 1 }}
                  fullWidth
                  onClick={() =>
                    eventChangedRecord(
                      funcRequest,
                      loadRecords,
                      inputObjectRecord,
                      setChangedRecord,
                      setInputObjectRecord
                    )
                  }
                >
                  Изменить
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="created-wrapper">
            <h4>
              Создать путевой лист{" "}
              {createRecord !== null
                ? ` - Номер: ${createRecord.NumberPL}`
                : ""}
            </h4>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="record-change-select-sheet">
                Выберите ведомость
              </InputLabel>
              <Select
                labelId="record-change-select-sheet"
                label="Выберите ведомость"
                defaultValue={99999}
                onChange={(e) => {
                  let tempSheet = e.target.value;

                  if (tempSheet === 99999) {
                    new Toast({
                      title: "Ошибка при выборе",
                      text: "Этот пукнт не доступен к выбору",
                      theme: "danger",
                      autohide: true,
                      interval: 10000,
                    });
                    return;
                  }

                  let tempThisRecord = {
                    ...createRecord,
                    IDsheet: tempSheet,
                  };

                  setCreateRecord(tempThisRecord);
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

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="record-change-select-auto">
                Выберите автомобиль
              </InputLabel>
              <Select
                labelId="record-change-select-auto"
                label="Выберите автомобиль"
                defaultValue={99999}
                onChange={(e) => {
                  let tempVehicle = e.target.value;

                  if (tempVehicle === 99999) {
                    new Toast({
                      title: "Ошибка при выборе",
                      text: "Этот пукнт не доступен к выбору",
                      theme: "danger",
                      autohide: true,
                      interval: 10000,
                    });
                    return;
                  }

                  let tempThisRecord = {
                    ...createRecord,
                    IDcar: tempVehicle,
                  };

                  setCreateRecord(tempThisRecord);
                }}
              >
                <MenuItem value={99999}>Выберите автомобиль</MenuItem>
                {allVehicles.map((vehicle) => {
                  return (
                    <MenuItem key={vehicle.ID} value={vehicle.ID}>
                      {vehicle.Model} : {vehicle.Number}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="record-change-select-worker">
                Выберите водителя
              </InputLabel>
              <Select
                labelId="record-change-select-worker"
                label="Выберите водителя"
                defaultValue={99999}
                onChange={(e) => {
                  let tempWorker = e.target.value;

                  if (tempWorker === 99999) {
                    new Toast({
                      title: "Ошибка при выборе",
                      text: "Этот пукнт не доступен к выбору",
                      theme: "danger",
                      autohide: true,
                      interval: 10000,
                    });
                    return;
                  }

                  let tempThisRecord = {
                    ...createRecord,
                    IDdriver: tempWorker,
                  };

                  setCreateRecord(tempThisRecord);
                }}
              >
                <MenuItem value={99999}>Выберите водителя</MenuItem>
                {allWorkers.map((worker) => {
                  return (
                    <MenuItem key={worker.ID} value={worker.ID}>
                      {worker.FIO} ({worker.ID})
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              id="standard-basic"
              label="Введите номер путевого листа"
              variant="standard"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => {
                setCreateRecord({
                  ...createRecord,
                  NumberPL: e.target.value,
                });
              }}
            />

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="record-change-select-type-gsm">
                Выберите ГСМ
              </InputLabel>
              <Select
                labelId="record-change-select-type-gsm"
                label="Выберите ГСМ"
                defaultValue={99999}
                onChange={(e) => {
                  let tempGSM = e.target.value;

                  if (tempGSM === 99999) {
                    new Toast({
                      title: "Ошибка при выборе",
                      text: "Этот пукнт не доступен к выбору",
                      theme: "danger",
                      autohide: true,
                      interval: 10000,
                    });
                    return;
                  }

                  let tempThisRecord = {
                    ...createRecord,
                    IDgsm: tempGSM,
                  };

                  setCreateRecord(tempThisRecord);
                }}
              >
                <MenuItem value={99999}>Выберите ГСМ</MenuItem>
                {allTypesGSM.map((gsm) => {
                  return (
                    <MenuItem key={gsm.ID} value={gsm.ID}>
                      {gsm.Name} ({gsm.ID})
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              id="standard-basic"
              label="Введите количество литров"
              variant="standard"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => {
                setCreateRecord({
                  ...createRecord,
                  Liter: e.target.value,
                });
              }}
            />

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 1 }}
              fullWidth
              onClick={() =>
                eventCreatedRecord(
                  funcRequest,
                  loadRecords,
                  createRecord,
                  setCreateRecord
                )
              }
            >
              Создать
            </Button>
          </div>
        </div>
      ) : (
        <h4>У вас нет доступа для создания или изменения ведомостей</h4>
      )}
    </div>
  );
};

export default Records;
