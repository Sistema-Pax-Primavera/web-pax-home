import React from "react";
import "./button-icon.css";

const ButtonIcon = ({ icon, funcao }) => {
  return (
    <div className="button-icones">
      <button onClick={funcao}>
        {icon}
      </button>
    </div>
  );
};

export default ButtonIcon;
