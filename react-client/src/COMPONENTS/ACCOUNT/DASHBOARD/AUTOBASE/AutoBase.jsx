import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import deleteAutoBase from "./DeleteAutoBase";
import beginUpdateAutoBase from "./BeginUpdateAutoBase";
import eventChangedAutoBase from "./EventChangedAutoBase";
import eventCreatedAutoBase from "./EventCreatedAutoBase";

const AutoBase = ({ funcRequest }) => {
  let [allAutoBases, setAutoBases] = useState([]);
  let [statusAccessEditing, setStatusAccessEditing] = useState(false);
  let [changedAutoBase, setChangedAutoBase] = useState(null);
  let [inputNameAutoBase, setInputNameAutoBase] = useState("");
  let [createNameAutoBase, setCreateNameAutoBase] = useState("");

  useEffect(loadAutoBases, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadAutoBases() {
    let tempUserAuthCookie = Cookies.get("OGU_DIPLOM_COOKIE_AUTHTOKEN");

    const tempGetAccess = await funcRequest(
      "/api/autobase/access",
      "GET",
      null,
      tempUserAuthCookie
    );

    setStatusAccessEditing(tempGetAccess.responseFetch.access);

    const autoBases = await funcRequest("/api/autobase/get", "GET", null, null);

    setAutoBases(autoBases.responseFetch);
    return;
  }

  return (
    <div className="AutoBase">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID автобазы</th>
              <th>Название автобазы</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allAutoBases.length ? (
              allAutoBases.map((itemAutoBase) => {
                return (
                  <tr key={itemAutoBase.ID}>
                    <td>{itemAutoBase.ID}</td>
                    <td>{itemAutoBase.Name}</td>
                    <td>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          deleteAutoBase(
                            itemAutoBase,
                            statusAccessEditing,
                            funcRequest,
                            loadAutoBases
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
                          beginUpdateAutoBase(
                            itemAutoBase,
                            statusAccessEditing,
                            changedAutoBase,
                            setChangedAutoBase
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
                <td colSpan="3">Автомобильные базы не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {statusAccessEditing ? (
        <div className="editing-wrapper">
          <div className="changed-wrapper">
            {changedAutoBase !== null ? (
              <div className="controller-changeautobase">
                <h4>
                  Редактирование автомобильной базы {changedAutoBase.ID}:
                  {changedAutoBase.Name}
                </h4>
                <TextField
                  id="standard-basic"
                  label="Введите название автомобильной базы"
                  variant="standard"
                  fullWidth
                  value={inputNameAutoBase}
                  sx={{ mt: 1 }}
                  onChange={(e) => {
                    setInputNameAutoBase(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 1 }}
                  fullWidth
                  onClick={() => {
                    eventChangedAutoBase(
                      funcRequest,
                      loadAutoBases,
                      changedAutoBase,
                      inputNameAutoBase,
                      setChangedAutoBase,
                      setInputNameAutoBase
                    );
                  }}
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
              Создать автомобильную базу
              {createNameAutoBase !== ""
                ? ` - Название новой автомобильной базы: ${createNameAutoBase}`
                : ""}
            </h4>

            <TextField
              id="standard-basic"
              label="Введите название новой автомобильной базы"
              variant="standard"
              fullWidth
              value={createNameAutoBase}
              onChange={(e) => {
                setCreateNameAutoBase(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 1 }}
              fullWidth
              onClick={async () => {
                eventCreatedAutoBase(
                  funcRequest,
                  loadAutoBases,
                  createNameAutoBase,
                  setCreateNameAutoBase
                );
              }}
            >
              Создать
            </Button>
          </div>
        </div>
      ) : (
        <h4>У вас нет доступа для создания или изменения автомобильной базы</h4>
      )}
    </div>
  );
};

export default AutoBase;
