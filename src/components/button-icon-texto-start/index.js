import React from "react";
import "./icone-button.css";
import Button from "@mui/material/Button";

const ButtonIconTextoStart = ({ icon, title, funcao, corFundoBotao, corTextoBotao, fontSizeBotao, fontWeightBotao,alinhamentoBotao }) => {
  return (
    <div className="icones-buttons-start">
      <Button onClick={funcao} style={{ backgroundColor: corFundoBotao, color: corTextoBotao, fontSize: fontSizeBotao, fontWeight:fontWeightBotao, alignItems: alinhamentoBotao }}>
        {icon}
        {title}
      </Button>
    </div>
  );
};

export default ButtonIconTextoStart;
