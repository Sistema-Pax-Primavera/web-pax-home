import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./modal-filtro-solicitacao.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FilterAltIcon from "@mui/icons-material/FilterAlt"; // Importe o ícone FilterAltIcon, se necessário
import ButtonIconTextoStart from "../button-icon-texto-start";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: 3,
  width: 500,
  border: "none",
  boxShadow: 24,
  padding: 3,
};

const ModalSolicitacaoFiltro = ({ openModal, onCloseModal }) => {
  const handleClose = () => {
    onCloseModal();
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`modal-pequena ${openModal ? "open" : ""}`}
      >
        <Box sx={style}>
          <Typography>
            <div className="container-modal-pequena">
              <div className="fecha-container-modal-pequena">
                <label>Filtro</label>
                <button onClick={handleClose}>
                  <HighlightOffIcon fontSize={"small"} />
                </button>
              </div>
              <div className="conteudo-container-modal-solicitacao">
                <input placeholder="Informe o nome da solicitação"></input>
                <select placeholder="Informe o setor">
                  <option>Financeiro</option>
                  <option>Manutenção</option>
                  <option>RH</option>
                  <option>Adminitrativo</option>
                </select>
                <div>
                  <ButtonIconTextoStart
                    title={"PESQUISAR"}
                    corFundoBotao={"#006b33"}
                    fontSizeBotao={"12px"}
                    corTextoBotao={"#ffff"}
                    fontWeightBotao={"700"}
                  />
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalSolicitacaoFiltro;
