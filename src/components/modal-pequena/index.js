import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./modal-pequena.css";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: 3,
  border: "none",
  boxShadow: 24,
  padding: 3,
};

const ModalPequena = ({
  conteudo,
  height,
  width,
  openModal,
  onCloseModal,
  children,
  icon,
  title,
  corFundoBotao,
  corTextoBotao,
  fontSizeBotao,
  fontWeightBotao,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (typeof onCloseModal === "function") {
      onCloseModal(); // Chamando a função de fechamento da modal, se necessário
    }
  };

  return (
    <>
      <div className="teste333">
        <Button
          onClick={handleOpen}
          style={{
            backgroundColor: corFundoBotao,
            color: corTextoBotao,
            fontSize: fontSizeBotao,
            fontWeight: fontWeightBotao,
          }}
        >
          {icon} {title}
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`modal-pequena ${open ? "open" : ""}`}
      >
        <Box sx={{ ...style, height, width }}>
          <Typography>
            <div className="container-modal-pequena">
              <div className="fecha-container-modal-pequena">
                <button onClick={handleClose}><HighlightOffIcon fontSize={'small'}/></button>
              </div>
              <div className="conteudo-container-modal">{conteudo}</div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ModalPequena;
