function changeAccessData(setDataAccess, workerAccount, setChangedAccessData) {
  setDataAccess({
    loginUser: workerAccount.loginUser,
    passwordUser: workerAccount.passwordUser,
  });

  setChangedAccessData(true);
}

export default changeAccessData;
