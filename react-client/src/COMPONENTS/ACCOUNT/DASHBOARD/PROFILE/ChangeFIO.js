function changeFIO(workerAccount, setDataFIO, setChangedFIO) {
  const tempFIOArray = workerAccount?.FIO?.split(" ");

  setDataFIO({
    FIO1: tempFIOArray[0],
    FIO2: tempFIOArray[1],
    FIO3: tempFIOArray[2],
  });

  setChangedFIO(true);
}

export default changeFIO;
