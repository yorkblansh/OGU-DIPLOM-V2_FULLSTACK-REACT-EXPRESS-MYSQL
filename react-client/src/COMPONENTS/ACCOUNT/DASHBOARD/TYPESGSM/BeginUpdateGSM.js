async function beginUpdateGSM(
  itemGsm = null,
  changedGSM,
  setChangedGSM,
  setInputObjectGSM
) {
  if (changedGSM === null && itemGsm !== null) {
    setChangedGSM(itemGsm);

    setInputObjectGSM({
      ID: null,
      Name: "",
      ForKilo: "",
    });
  } else if (
    changedGSM !== null &&
    itemGsm !== null &&
    changedGSM !== itemGsm
  ) {
    setChangedGSM(itemGsm);

    setInputObjectGSM({
      ID: null,
      Name: "",
      ForKilo: "",
    });
  } else {
    setChangedGSM(null);
  }
}

export default beginUpdateGSM;
