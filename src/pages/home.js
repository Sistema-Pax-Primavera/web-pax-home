import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo-pax-branco.svg";
import Chart from "react-apexcharts";
import "./home.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Menu, MenuItem } from "@mui/material";
import FloatingWindow from "../components/recebimento";
import BemVindo from "../../assets/bem-vindo.png";
import Dinheiro from "../../assets/dinheiro.png";
import Chat from "../../assets/chat.png";
import Atendimento from "../../assets/atendimento.png";
import Atendimento2 from "../../assets/atendimento2.png";
import { useNavigate } from "react-router-dom";
import Parcel from "single-spa-react/parcel";
import NewsTicker from "../components/noticias";
import { AdesaoTable, PromocaoTable } from "../components/tabela";
import Index from "../components/menu";

const newsData = [
    {
        title: 'Título da Notícia 1',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit
        Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.`,
    },
    {
        title: 'Título da Notícia 2',
        text: 'Texto da notícia 2.',
    },
    {
        title: 'Título da Notícia 3',
        text: 'I AM IRON MAN',
    },
];

const manualLink = 'link_para_o_manual_do_sistema';
const paxLink = 'link_sobre_a_pax';

const Home = () => {
    const [page, setPage] = useState(null);
    const [usuario, setUsuario] = useState("");
    const donutSeries = [44, 55, 41, 17, 15];
    const donutLabels = ["A", "B", "C", "D", "E"];
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeRoute, setActiveRoute] = useState("");

    const handleMenuClick = (route) => {
        // Navegar para a rota específica
        navigate(route);
        // Salvar a rota no localStorage
        localStorage.setItem("page", route);
        // Atualizar a rota ativa
        setActiveRoute(route);
    };

    // Função para abrir o menu suspenso
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Função para fechar o menu suspenso
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    //janela flutuante do recebimento
    const [showFloatingWindow, setShowFloatingWindow] = useState(false);

    const openFloatingWindow = () => {
        setShowFloatingWindow(true);
    };

    const closeFloatingWindow = () => {
        setShowFloatingWindow(false);
    };

    const Logout = () => {
        // Limpar o localStorage
        localStorage.clear();
        // Redirecionar para a tela de login
        navigate("/login");
    };

    const chartOptions = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
        colors: ["#0A8645"],
    };

    const chartSeries = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
    ];

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    useEffect(() => {
        const pageContent = localStorage.getItem("page");
        setActiveRoute(pageContent)
    }, [page]);

    useEffect(() => {
        const savedUsuario = localStorage.getItem("usuario");
        // Atualiza o estado
        if (savedUsuario) {
            setUsuario(savedUsuario);
        }
    }, []);

    return (
        <div className="container-dashboard">
            <div className="container-menus">
                <img
                    onClick={() => handleMenuClick("/pax-primavera")}
                    src={Logo}
                    alt="Logo"
                ></img>
                <div
                    className={`menus-lateral ${isSidebarCollapsed ? "collapsed" : ""}`}
                >
                    <label>Atendimento</label>
                    <button
                        onClick={() => handleMenuClick("/pax-primavera/associado")}
                        className={activeRoute === "/pax-primavera/associado" ? "active" : ""}
                    >
                        <AccountCircleIcon fontSize={"small"} />
                        Associados
                    </button>
                    <button
                        onClick={() => handleMenuClick("/pax-primavera/vendas")}
                        className={activeRoute === "/pax-primavera/vendas" ? "active" : ""}
                    >
                        <MonetizationOnIcon fontSize={"small"} />
                        Vendas
                    </button>
                    <button
                        onClick={() => handleMenuClick("/pax-primavera/financeiro")}
                        className={activeRoute === "/pax-primavera/financeiro" ? "active" : ""}
                    >
                        <AddBusinessIcon fontSize={"small"} />
                        Financeiro
                    </button>
                </div>
            </div>
            <div className="container-dashboard2">
                <div className="perfil">
                    <a onClick={handleMenuOpen}>
                        <AccountCircleIcon />
                    </a>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {/* Opção: Mudar Senha */}
                    <MenuItem onClick={handleMenuClose}>
                        <span> Mudar Senha</span>
                        {/* Adicione um ícone se desejar */}
                    </MenuItem>
                    {/* Opção: Sair */}
                    <MenuItem onClick={Logout}>
                        <span> Sair</span>
                        {/* Adicione um ícone se desejar */}
                    </MenuItem>
                </Menu>
                {activeRoute === '/pax-primavera/associado' ? (
                    <Parcel config={() => System.import('@pax/pax-associado')} />
                ) : (
                    <>
                        <div className="bem-vindo">
                            <div className="bem-vindo2">
                                <h1>Bem vindo, {usuario}</h1>
                                <label>Acesse o menu para as opções !</label>
                            </div>
                            <img src={BemVindo} alt="Bem-vindo"></img>
                        </div>
                        <div className="navegacao-home">
                            <button onClick={openFloatingWindow}>
                                <a className="dinheiro-recebimento">
                                    <img src={Dinheiro} alt="Dinheiro"></img>Recebimento
                                </a>
                            </button>

                            {showFloatingWindow && (
                                <FloatingWindow onClose={closeFloatingWindow}>
                                    {/* Conteúdo da janela flutuante */}
                                </FloatingWindow>
                            )}
                            <button>
                                <a className="dinheiro-recebimento">
                                    <img src={Atendimento} alt="Atendimento"></img>Iniciar<br></br>
                                    Atendimento
                                </a>
                            </button>
                            <button>
                                <a className="dinheiro-recebimento">
                                    <img src={Atendimento2} alt="Atendimento2"></img>Acompanhar
                                    Solicitações
                                </a>
                            </button>
                            <button>
                                <a className="dinheiro-recebimento">
                                    <img src={Chat} alt="Atendimento2"></img>Chat
                                </a>
                            </button>
                        </div>
                        <div className="mixed-chart">
                            <div>
                                <AdesaoTable />
                                <PromocaoTable />
                            </div>
                            <NewsTicker news={newsData} />

                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
