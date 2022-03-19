import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./Profile.scss";

const Profile = ({ setProfileUser, profileUser }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (profileUser === false) {
      setTimeout(() => {
        navigate("/account/login");
      }, 5000);
    }
  }, []);

  if (profileUser === false) {
    return (
      <div className="Profile">
        <div className="wrapper">
          <div className="header-window">
            <span>Ошибка</span>
          </div>
          <div className="body-window">
            <p>
              Ваш аккаунт не авторизирован, через 5 секунд вы будете
              перенаправлены на страницу авторизации.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Profile">
        Profile
        <br />
        <pre>{JSON.stringify(profileUser, null, 2)}</pre>
      </div>
    );
  }
};

export default Profile;
