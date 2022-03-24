async function beginUpdateAutoGaraga(
  autogarage = null,
  changedAutoGarage,
  setChangedAutoGarage,
  setInputObjectAutoGarage
) {
  if (changedAutoGarage === null && autogarage !== null) {
    setChangedAutoGarage(autogarage);

    setInputObjectAutoGarage({
      ID: null,
      Name: "",
      IDbase: null,
    });
  } else if (
    changedAutoGarage !== null &&
    autogarage !== null &&
    changedAutoGarage !== autogarage
  ) {
    setChangedAutoGarage(autogarage);

    setInputObjectAutoGarage({
      ID: null,
      Name: "",
      IDbase: null,
    });
  } else {
    setChangedAutoGarage(null);
  }
}

export default beginUpdateAutoGaraga;
