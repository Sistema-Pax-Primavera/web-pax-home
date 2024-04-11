import React from "react";
import "./perfil.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";

const Perfil = () => {
  return (
    <div className="container-perfil-usuario">
      <div className="foto-usuario">
        <AccountCircleOutlinedIcon fontSize={"large"} />
        <h1>Luiz Henrique Souza</h1>
      </div>
      <div className="dados-perfil-usuario">
        <div className="linha-dados-usuario">
          <div className="linha-dados-usuario01">
            <label>Usuário</label>
            <input></input>
          </div>
          <div className="linha-dados-usuario02">
            <label>Senha</label>
            <input></input>
          </div>
          <div className="linha-dados-usuario02">
            <label>Confirmação de Senha</label>
            <input></input>
          </div>
        </div>
        <div className="linha-dados-usuario">
          <div className="linha-dados-usuario01">
            <label>Email</label>
            <input></input>
          </div>
          <div className="linha-dados-usuario02">
            <label>Cidade</label>
            <input></input>
          </div>
          <div className="linha-dados-usuario02">
            <label>Estado</label>
            <input></input>
          </div>
        </div>
        <div className="linha-dados-usuario">
          <div className="linha-dados-usuario02">
            <label>Telefone/WhatsApp</label>
            <input></input>
          </div>
          <div className="linha-dados-usuario03">
            <label>Setor</label>
            <input></input>
          </div>
          <div className="linha-dados-usuario03">
            <label>Função</label>
            <input></input>
          </div>
        </div>
        <div className="linha-dados-usuario04">
          <div className="salva-dados-usuario">
          <ButtonIconTextoStart
              title={"SALVAR"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"800"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
