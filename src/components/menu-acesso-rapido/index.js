import React, { useEffect, useState } from 'react';
import Manutencao from "../../../assets/manutencao.svg";
import idiomas from '../../utils/info';
import Dinheiro from "../../../assets/dinheiro.png";
import Atendimento from "../../../assets/atendimento.png";
import Atendimento2 from "../../../assets/atendimento2.png";
import Manual from "../../../assets/manual.png";
import BemVindo from "../../../assets/bem-vindo.png";
import Site from "../../../assets/site.png";
import ChatPax from "../../../assets/chat-pax.png";
import './acesso-rapido.css';

const AcessoRapido = ({ idioma, setShowFloatingWindow, setIsAtendimentoModal, handleMenuClick, usuario }) => {
    const openFloatingWindow = () => {
        setShowFloatingWindow(true);
    };

    const openModalAtendimento = () => {
        setIsAtendimentoModal(true);
    };

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
        </>
    )
}

export default AcessoRapido;
