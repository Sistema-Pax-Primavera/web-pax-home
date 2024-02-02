import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo-pax-branco.svg";
import "./home.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Menu, MenuItem } from "@mui/material";
import FloatingWindow from "../components/modal/recebimento";
import BemVindo from "../../assets/bem-vindo.png";
import Dinheiro from "../../assets/dinheiro.png";
import Chat from "../../assets/chat.png";
import Atendimento from "../../assets/atendimento.png";
import Atendimento2 from "../../assets/atendimento2.png";
import { useNavigate } from "react-router-dom";
import Parcel from "single-spa-react/parcel";
import NewsTicker from "../components/noticias";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const Home = () => {
    const [page, setPage] = useState(null);
    const [usuario, setUsuario] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeRoute, setActiveRoute] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [showTable, setShowTable] = useState(false);

    const dadosAdesao = [
        {
            estado: 'MS', planos: [
                { nome: 'Plano 1', valor: 120.00 },
                { nome: 'Plano 2', valor: 180.00 },
            ]
        },
        {
            estado: 'PR', planos: [
                { nome: 'Plano 1', valor: 130.00 },
                { nome: 'Plano 2', valor: 110.00 },
                { nome: 'Plano 3', valor: 160.00 },
            ]
        },
        {
            estado: 'GO', planos: [
                { nome: 'Plano 1', valor: 160.00 },
            ]
        },
    ];

    const dadosPromocao = [
        { parcela: 1, valor: 10.00 },
        { parcela: 2, valor: 13.00 },
    ];

    const handleButtonClick = (option) => {
        setSelectedOption(option);
        setShowTable(true);
    };


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
                    <div className="perfil-localizacao">
                        <div className="cidade-home">
                            <select>
                                <option>Dourados</option>
                                <option>Itaporã</option>
                            </select>
                        </div>
                        <a onClick={handleMenuOpen}>
                            <AccountCircleIcon />
                        </a>
                    </div>

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
                                <label>Acesse o menu para as opções !</label><br></br>
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
                            <button>
                                <a className="dinheiro-recebimento">
                                    <img src={Atendimento2} alt="Manual"></img>Manual do Sistema
                                </a>
                            </button>
                            <button>
                                <a className="dinheiro-recebimento">
                                    <img src={Atendimento2} alt="Manual"></img>Pax Primavera
                                </a>
                            </button>
                        </div>
                        <div className="mixed-chart">
                            <div className="button-group-container">
                                <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    aria-label=" elevation buttons"
                                    style={{ background: "#006b33", }}
                                >
                                    <Button
                                        onClick={() => handleButtonClick("Promoção")}
                                        style={{
                                            border: "3px white",
                                            background: "#006b33",
                                            borderBottom: selectedOption === "Promoção" ? "3px solid yellow" : "",
                                        }}
                                    >
                                        Promoções
                                    </Button>
                                    <Button
                                        onClick={() => handleButtonClick("Adesão")}
                                        style={{
                                            background: "#006b33",
                                            borderBottom: selectedOption === "Adesão" ? "3px solid yellow" : "",
                                        }}
                                    >
                                        Adesão
                                    </Button>
                                </ButtonGroup>
                            </div>

                            {showTable && selectedOption === 'Adesão' && (
                                <div className="tabela-abaixo-botoes">
                                    <TableContainer component={Paper} className="TableContainer">
                                        <Table sx={{ maxWidth: 1100 }} aria-label='simple table'>
                                            <TableHead className="TableHead">
                                                <TableCell align='center'>Estado</TableCell>
                                                {dadosAdesao[0]?.planos.map((plano, index) => (
                                                    <TableCell key={index} align='center'>{plano.nome}</TableCell>
                                                ))}
                                            </TableHead>
                                            <TableBody className="TableBody">
                                                {dadosAdesao.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align='center'>{row.estado}</TableCell>
                                                        {row.planos.map((plano, planoIndex) => (
                                                            <TableCell key={planoIndex} align='center'>{plano.valor}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </div>
                            )}
                            {showTable && selectedOption === 'Promoção' && (
                                <div className="tabela-abaixo-botoes">
                                    <TableContainer component={Paper} className="TableContainer">
                                        <Table sx={{ maxWidth: 1100 }} aria-label='simple table'>
                                            <TableHead className="TableHead">
                                                <TableRow>
                                                    <TableCell align='center'>Parcela</TableCell>
                                                    <TableCell align='center'>Valor R$</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className="TableBody">
                                                {dadosPromocao.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align='center'>{row.parcela}</TableCell>
                                                        <TableCell align='center'>{row.valor}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </div>
                            )}
                            <div className="slide-noticias">
                                <h3 className="noticias-title">Avisos</h3>
                                <NewsTicker news={newsData} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
