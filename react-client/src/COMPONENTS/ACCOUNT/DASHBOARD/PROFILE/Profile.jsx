import React from "react";

import "./Profile.scss";

import Avatar from "./AVATAR/Avatar";

const Profile = ({ workerAccount }) => {
  return (
    <div className="Profile">
      <Avatar FunctionID={workerAccount?.Function?.ID} />
      <div className="content-main">
        <h2>
          {workerAccount?.Function?.Role} {workerAccount?.FIO}
        </h2>
        <p>ID аккаунта: {workerAccount?.ID}</p>
        <p>ID базы: {workerAccount?.IDbase}</p>
        <p>Логин: {workerAccount?.loginUser}</p>
      </div>
    </div>
  );
};

export default Profile;
