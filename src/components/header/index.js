import React, { useState } from 'react';
import './header.css';
import idiomas from '../../utils/info';
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/svg/logo-pax-branco.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const Header = ({ activeRoute, setActiveRoute, idioma, permissao, permissaoGlobal }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = (route) => {
        // Navegar para a rota específica
        navigate(route);
        // Salvar a rota no localStorage
        localStorage.setItem("page", route);
        // Atualizar a rota ativa
        setActiveRoute(route);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const isItemActive = (moduleName, item) => {
        const modulePermission =
            permissao[moduleName] || permissaoGlobal[moduleName];
        if (modulePermission && modulePermission[item]) {
            return modulePermission[item].ativo === true;
        }
        return false;
    };

    return (
        <div className={`container-menus ${isCollapsed ? 'container-menus-collapsed' : ''}`}>
            <img
                onClick={() => handleMenuClick("/pax-primavera")}
                src={Logo}
                alt="Logo"
                title="Clique para acessar a Home"
                className={`logo ${isCollapsed ? 'logo-collapsed' : ''}`}
            />
            <div
                className={`menus-lateral  ${isCollapsed ? 'menus-lateral-collapsed' : ''}`}>
                <label>
                    {idioma
                        ? idiomas.es_PY.menu.atendimento.titulo
                        : idiomas.pt_BR.menu.atendimento.titulo}
                </label>
                <button
                    key={"atendimento"}
                    onClick={() => handleMenuClick("/pax-primavera/associado")}
                    className={
                        activeRoute === "/pax-primavera/associado" ? "active" : ""
                    }
                    style={{
                        display: isItemActive("atendimento", "associado")
                            ? "flex"
                            : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.atendimento.botoesAcao.associado
                        : idiomas.pt_BR.menu.atendimento.botoesAcao.associado}
                >
                    <AccountCircleIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.atendimento.botoesAcao.associado
                        : idiomas.pt_BR.menu.atendimento.botoesAcao.associado}
                </button>
                <button
                    onClick={() => handleMenuClick("/pax-primavera/vendas")}
                    className={
                        activeRoute === "/pax-primavera/vendas" ? "active" : ""
                    }
                    style={{
                        display: isItemActive("atendimento", "vendas")
                            ? "flex"
                            : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.atendimento.botoesAcao.webVendedor
                        : idiomas.pt_BR.menu.atendimento.botoesAcao.webVendedor}
                >
                    <MonetizationOnIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.atendimento.botoesAcao.webVendedor
                        : idiomas.pt_BR.menu.atendimento.botoesAcao.webVendedor}
                </button>
                <button
                    onClick={() => handleMenuClick("/pax-primavera/financeiro")}
                    className={
                        activeRoute === "/pax-primavera/financeiro" ? "active" : ""
                    }
                    style={{
                        display: isItemActive("atendimento", "financeiro")
                            ? "flex"
                            : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.atendimento.botoesAcao.financeiro
                        : idiomas.pt_BR.menu.atendimento.botoesAcao.financeiro}
                >
                    <AddBusinessIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.atendimento.botoesAcao.financeiro
                        : idiomas.pt_BR.menu.atendimento.botoesAcao.financeiro}
                </button>
                <label>
                    {idioma
                        ? idiomas.es_PY.menu.controle.titulo
                        : idiomas.pt_BR.menu.controle.titulo}
                </label>
                <button
                    onClick={() => handleMenuClick("/pax-primavera/cobranca")}
                    className={
                        activeRoute === "/pax-primavera/cobranca" ? "active" : ""
                    }
                    style={{
                        display: isItemActive("controle", "cobranca")
                            ? "flex"
                            : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.controle.botoesAcao.cobranca
                        : idiomas.pt_BR.menu.controle.botoesAcao.cobranca}
                >
                    <RequestPageIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.controle.botoesAcao.cobranca
                        : idiomas.pt_BR.menu.controle.botoesAcao.cobranca}
                </button>
                <button
                    onClick={() =>
                        handleMenuClick("/pax-primavera/parcelas")
                    }
                    className={
                        activeRoute === "/pax-primavera/parcelas"
                            ? "active"
                            : ""
                    }
                    style={{
                        display: isItemActive("controle", "parcela") ? "flex" : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.controle.botoesAcao.parcela
                        : idiomas.pt_BR.menu.controle.botoesAcao.parcela}
                >
                    <ContactPageIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.controle.botoesAcao.parcela
                        : idiomas.pt_BR.menu.controle.botoesAcao.parcela}
                </button>
                <button
                    onClick={() =>
                        handleMenuClick("/pax-primavera/boletos")
                    }
                    className={
                        activeRoute === "/pax-primavera/boletos"
                            ? "active"
                            : ""
                    }
                    style={{
                        display: isItemActive("controle", "boleto") ? "flex" : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.controle.botoesAcao.boleto
                        : idiomas.pt_BR.menu.controle.botoesAcao.boleto}
                >
                    <AutoAwesomeMosaicIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.controle.botoesAcao.boleto
                        : idiomas.pt_BR.menu.controle.botoesAcao.boleto}
                </button>
                <label>
                    {idioma
                        ? idiomas.es_PY.menu.gerencial.titulo
                        : idiomas.pt_BR.menu.gerencial.titulo}
                </label>
                <button
                    onClick={() =>
                        handleMenuClick("/pax-primavera/relatorios")
                    }
                    className={
                        activeRoute === "/pax-primavera/relatorios"
                            ? "active"
                            : ""
                    }
                    style={{
                        display: isItemActive("gerencial", "relatorio")
                            ? "flex"
                            : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.gerencial.botoesAcao.relatorio
                        : idiomas.pt_BR.menu.gerencial.botoesAcao.relatorio}
                >
                    <AssessmentIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.gerencial.botoesAcao.relatorio
                        : idiomas.pt_BR.menu.gerencial.botoesAcao.relatorio}
                </button>
                <label>
                    {idioma
                        ? idiomas.es_PY.menu.configurações.titulo
                        : idiomas.pt_BR.menu.configurações.titulo}
                </label>
                <button
                    onClick={() =>
                        handleMenuClick("/pax-primavera/configuracoes/cadastro")
                    }
                    className={
                        activeRoute === "/pax-primavera/configuracoes/cadastro"
                            ? "active"
                            : ""
                    }
                    style={{
                        display: isItemActive("configuracoes", "cadastro")
                            ? "flex"
                            : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.configurações.botoesAcao.cadastro
                        : idiomas.pt_BR.menu.configurações.botoesAcao.cadastro}
                >
                    <FactCheckIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.configurações.botoesAcao.cadastro
                        : idiomas.pt_BR.menu.configurações.botoesAcao.cadastro}
                </button>
                <button
                    onClick={() => handleMenuClick("/pax-primavera/suporte")}
                    className={
                        activeRoute === "/pax-primavera/suporte" ? "active" : ""
                    }
                    style={{
                        display: isItemActive("configuracoes", "suporte")
                            ? "flex"
                            : "none",
                    }}
                    title={idioma
                        ? idiomas.es_PY.menu.configurações.botoesAcao.suporte
                        : idiomas.pt_BR.menu.configurações.botoesAcao.suporte}
                >
                    <SupportAgentIcon fontSize={"small"} />
                    {idioma
                        ? idiomas.es_PY.menu.configurações.botoesAcao.suporte
                        : idiomas.pt_BR.menu.configurações.botoesAcao.suporte}
                </button>
                <div className={`toggle-button ${isCollapsed ? 'toggle-button-collapsed' : ''}`} >
                    <button
                        onClick={toggleCollapse}
                        title={isCollapsed ? "Expandir" : "Recolher"}>
                        {
                            isCollapsed ?
                                <ArrowForwardIosIcon fontSize={"small"} />
                                :
                                <ArrowBackIosIcon fontSize={"small"} />
                        }

                    </button>
                </div>
            </div>

        </div>
    );
}

export default Header;
