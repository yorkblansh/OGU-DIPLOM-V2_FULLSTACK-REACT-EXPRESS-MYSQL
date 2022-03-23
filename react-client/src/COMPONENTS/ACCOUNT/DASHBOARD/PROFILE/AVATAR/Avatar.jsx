import React from "react";

import "./Avatar.scss";

import imgKandidat from "./../../../../../IMAGES/1.Кандидат.jpg";
import imgDriver from "./../../../../../IMAGES/2.Водитель.jpg";
import imgPodpisant from "./../../../../../IMAGES/3.Подписант.jpg";
import imgAdmin from "./../../../../../IMAGES/4.Админ.jpg";

const Avatar = ({ FunctionID }) => {
  switch (FunctionID) {
    case 0:
      return <img className="Avatar" src={imgKandidat} />;
    case 1:
      return <img className="Avatar" src={imgDriver} />;
    case 2:
      return <img className="Avatar" src={imgPodpisant} />;
    case 3:
      return <img className="Avatar" src={imgAdmin} />;
    default:
      return <div>stop</div>;
  }
};

export default Avatar;
