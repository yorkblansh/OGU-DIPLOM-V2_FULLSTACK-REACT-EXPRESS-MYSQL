import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Cookies from "js-cookie";

import deleteTypeGSM from "./DeleteTypeGSM";
import beginUpdateGSM from "./BeginUpdateGSM";
import eventChangedTypeGSM from "./EventChangedTypeGSM";
import eventCreatedTypeGSM from "./EventCreatedTypeGSM";

const TypesGSM = ({ funcRequest }) => {
  let [allTypesGSM, setTypesGSM] = useState([]);
  let [statusAccessEditing, setStatusAccessEditing] = useState(false);
  let [changedGSM, setChangedGSM] = useState(null);
  let [inputObjectGSM, setInputObjectGSM] = useState({
    ID: null,
    Name: "",
    ForKilo: "",
  });
  let [createObjectGSM, setCreateObjectGSM] = useState(null);

  useEffect(loadTypesGSM, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadTypesGSM() {
    let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    const tempGetAccess = await funcRequest(
      "/api/type-gsm/access",
      "GET",
      null,
      tempUserAuthCookie
    );

    setStatusAccessEditing(tempGetAccess.responseFetch.access);

    const gsm = await funcRequest("/api/type-gsm/get", "GET", null, null);

    setTypesGSM(gsm.responseFetch);
  }

  return (
    <div className="TypesGSM">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID ГСМ</th>
              <th>Название ГСМ</th>
              <th>Вес (в кг)</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allTypesGSM.length ? (
              allTypesGSM.map((itemGsm) => {
                return (
                  <tr key={itemGsm.ID}>
                    <td>{itemGsm.ID}</td>
                    <td>{itemGsm.Name}</td>
                    <td>{itemGsm.ForKilo}</td>
                    <td>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          deleteTypeGSM(
                            itemGsm,
                            funcRequest,
                            loadTypesGSM,
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
                        sx={{ ml: 1 }}
                        onClick={() => {
                          beginUpdateGSM(
                            itemGsm,
                            changedGSM,
                            setChangedGSM,
                            setInputObjectGSM,
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
                <td colSpan="4">Виды ГСМ не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {statusAccessEditing ? (
        <div className="editing-wrapper">
          <div className="changed-wrapper">
            {changedGSM !== null ? (
              <div className="controller-changegsm">
                <h4>
                  Редактирование автомобильной базы {changedGSM.ID}:
                  {changedGSM.Name}
                </h4>
                <TextField
                  id="standard-basic"
                  label="Введите название вида ГСМ"
                  variant="standard"
                  fullWidth
                  value={inputObjectGSM.Name}
                  sx={{ mt: 1 }}
                  onChange={(e) => {
                    setInputObjectGSM({
                      ...inputObjectGSM,
                      ID: changedGSM.ID,
                      Name: e.target.value,
                    });
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="Введите вес вида ГСМ (Пример: 3.54)"
                  variant="standard"
                  fullWidth
                  value={inputObjectGSM.ForKilo}
                  sx={{ mt: 1 }}
                  onChange={(e) => {
                    setInputObjectGSM({
                      ...inputObjectGSM,
                      ID: changedGSM.ID,
                      ForKilo: e.target.value,
                    });
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 1 }}
                  fullWidth
                  onClick={() =>
                    eventChangedTypeGSM(
                      funcRequest,
                      loadTypesGSM,
                      setChangedGSM,
                      setInputObjectGSM,
                      inputObjectGSM
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
              Создать вид ГСМ{" "}
              {createObjectGSM !== null
                ? ` - Название новой ГСМ: ${createObjectGSM.Name} | Вес: ${createObjectGSM.ForKilo}`
                : ""}
            </h4>

            <TextField
              id="standard-basic"
              label="Введите название нового вида ГСМ"
              variant="standard"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => {
                if (e.target.value === 0) setCreateObjectGSM(null);

                setCreateObjectGSM({
                  ...createObjectGSM,
                  Name: e.target.value,
                });
              }}
            />

            <TextField
              id="standard-basic"
              label="Введите вес нового вида ГСМ (3.54)"
              variant="standard"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => {
                if (e.target.value === 0) setCreateObjectGSM(null);

                setCreateObjectGSM({
                  ...createObjectGSM,
                  ForKilo: e.target.value,
                });
              }}
            />

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 1 }}
              fullWidth
              onClick={() =>
                eventCreatedTypeGSM(
                  funcRequest,
                  createObjectGSM,
                  setCreateObjectGSM,
                  loadTypesGSM
                )
              }
            >
              Создать
            </Button>
          </div>
        </div>
      ) : (
        <h4>У вас нет доступа для создания или изменения типа ГСМ</h4>
      )}
    </div>
  );
};

export default TypesGSM;
