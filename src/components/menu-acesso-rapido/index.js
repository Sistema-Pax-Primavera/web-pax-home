import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import idiomas from '../../utils/info';
import Dinheiro from "../../../assets/png/dinheiro.png";
import Atendimento from "../../../assets/png/atendimento.png";
import Atendimento2 from "../../../assets/png/atendimento2.png";
import Manual from "../../../assets/png/manual.png";
import BemVindo from "../../../assets/png/bem-vindo.png";
import Site from "../../../assets/png/site.png";
import ChatPax from "../../../assets/png/chat-pax.png";
import './acesso-rapido.css';
import { Modal, Box } from "@mui/material";
import FloatingWindow from '../modal/recebimento';
import Telemarketing from '../telemarketing';

const styleAtendimento = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "85%",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    borderRadius: 5,
    p: 4,
    overflowY: "auto",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
};


const AcessoRapido = ({ idioma, handleMenuClick, usuario }) => {
    const [showFloatingWindow, setShowFloatingWindow] = useState(false);
    const [isAtendimentoModal, setIsAtendimentoModal] = useState(false);
    const [atendimentoClose, setAtendimentoClose] = useState(true);

    const openFloatingWindow = () => {
        setShowFloatingWindow(true);
    };

    const openModalAtendimento = () => {
        setIsAtendimentoModal(true);
    };

    const closeFloatingWindow = () => {
        setShowFloatingWindow(false);
    };

    const closeAtendimento = () => {
        if (atendimentoClose) {
            setIsAtendimentoModal(false);
        } else {
            toast.warning('Não é possível fechar a modal agora.');
        }
    }

    return (
        <>
            <div className="bem-vindo">
                <div className="bem-vindo2">
                    <h1>
                        {idioma
                            ? idiomas.es_PY.message.titulo
                            : idiomas.pt_BR.message.titulo}{" "}
                        {usuario}
                    </h1>
                    <label>
                        {idioma
                            ? idiomas.es_PY.message.texto
                            : idiomas.pt_BR.message.texto}
                    </label>
                    <br></br>
                </div>
                <img src={BemVindo} alt="Bem-vindo"></img>
            </div>
            <div className="navegacao-home">
                <button onClick={openFloatingWindow}>
                    <a className="dinheiro-recebimento">
                        <img src={Dinheiro} alt="Dinheiro"></img>
                        {idioma
                            ? idiomas.es_PY.botoesAcao.recebimento
                            : idiomas.pt_BR.botoesAcao.recebimento}
                    </a>
                </button>
                <button onClick={openModalAtendimento}>
                    <a className="dinheiro-recebimento">
                        <img src={Atendimento} alt="Atendimento"></img>
                        {idioma
                            ? idiomas.es_PY.botoesAcao.atendimento
                            : idiomas.pt_BR.botoesAcao.atendimento}
                    </a>
                </button>
                <button
                    onClick={() => handleMenuClick("/pax-primavera/solicitacao")}
                >
                    <a className="dinheiro-recebimento">
                        <img src={Atendimento2} alt="Atendimento2"></img>
                        {idioma
                            ? idiomas.es_PY.botoesAcao.solicitacao
                            : idiomas.pt_BR.botoesAcao.solicitacao}
                    </a>
                </button>
                <button
                    onClick={() => handleMenuClick("/pax-primavera/chat")}
                >
                    <a className="dinheiro-recebimento">
                        <img src={ChatPax} alt="Atendimento2"></img>
                        Chat
                    </a>
                </button>
                <button
                    onClick={() => handleMenuClick("/pax-primavera/manual-sistema")}
                >
                    <a className="dinheiro-recebimento">
                        <img src={Manual} alt="Manual"></img>
                        {idioma
                            ? idiomas.es_PY.botoesAcao.manual
                            : idiomas.pt_BR.botoesAcao.manual}
                    </a>
                </button>
                <button>
                    <a
                        href="https://paxprimavera.com.br/"
                        className="dinheiro-recebimento"
                        target="_blank"
                    >
                        <img src={Site} alt="Manual"></img> Site Pax Primavera
                    </a>
                </button>
            </div>
            {showFloatingWindow && (
                <FloatingWindow
                    onClose={closeFloatingWindow}
                />
            )}
            <Modal
                open={isAtendimentoModal}
                onClose={closeAtendimento}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleAtendimento}>
                    <Telemarketing
                        setAtendimentoClose={setAtendimentoClose} />
                </Box>
            </Modal>
        </>
    )
}

export default AcessoRapido;
