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
import ChatPax from '../../assets/chat-pax.png'
import Manual from '../../assets/manual.png'
import Site from '../../assets/site.png'
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HttpsIcon from '@mui/icons-material/Https';
import ManualScreen from "./manual/manual";
import PageChat from "./chat/chat";
import Solicitacao from "./solicitação";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { navigateToUrl } from 'single-spa';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 5,
    p: 4,
};

const Home = () => {
    const [page, setPage] = useState(null);
    const [usuario, setUsuario] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeRoute, setActiveRoute] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [activeParcel, setActiveParcel] = useState(null);

    const dadosAdesao = [
        {
            estado: 'MS', planos: [
                { nome: 'Plano 1', valor: 120.00 },
                { nome: 'Plano 2', valor: 180.00 },
                { nome: 'Plano 3', },
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


    const slideImages = [
        ChatPax,
        Manual,
        Site
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

    useEffect(() => {
        //provisorio
        localStorage.setItem("page", '/pax-primavera');
        const pageContent = localStorage.getItem("page");
        console.log(pageContent)
        setActiveRoute(pageContent)
    }, [page]);

    useEffect(() => {
        const savedUsuario = localStorage.getItem("usuario");
        // Atualiza o estado
        if (savedUsuario) {
            setUsuario(savedUsuario);
        }
    }, []);

    useEffect(() => {
        // Define o estado inicial para Adesão ao carregar a tela
        setSelectedOption("Adesão");
        setShowTable(true);
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
                        Web Vendedor
                    </button>
                    <button
                        onClick={() => handleMenuClick("/pax-primavera/financeiro")}
                        className={activeRoute === "/pax-primavera/financeiro" ? "active" : ""}
                    >
                        <AddBusinessIcon fontSize={"small"} />
                        Financeiro
                    </button>
                    <label>Controle</label>
                    <button
                        onClick={() => handleMenuClick("/pax-primavera/cobranca")}
                        className={activeRoute === "/pax-primavera/cobranca" ? "active" : ""}
                    >
                        <AccountCircleIcon fontSize={"small"} />
                        Cobrança
                    </button>
                    <label>Configurações</label>
                    <button
                        onClick={() => handleMenuClick("/pax-primavera/cadastro")}
                        className={activeRoute === "/pax-primavera/cadastro" ? "active" : ""}
                    >
                        <AccountCircleIcon fontSize={"small"} />
                        Cadastro
                    </button>
                </div>
            </div>
            <div className="container-dashboard2">
                <div className="perfil">
                    <div className="perfil-localizacao">
                        <div className="cidade-home">
                            <label>Unidade Atual</label>
                            <select>
                                <option>Dourados</option>
                                <option>Itaporã</option>
                            </select>
                        </div>
                        <div className="perfil-acessos">
                            <a onClick={handleMenuOpen}>
                                <AccountCircleIcon />
                            </a>
                        </div>

                    </div>

                </div>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {/* Opção: Mudar Senha */}
                    <MenuItem onClick={handleMenuClose}>
                        <div className='icones-nome'>
                            <label onClick={handleOpen}><LockIcon fontSize={'small'} /> Alterar Senha</label>
                        </div>

                    </MenuItem>
                    {/* Opção: Sair */}
                    <MenuItem onClick={Logout}>
                        <div className='icones-nome'>
                            <label>
                                <LogoutIcon fontSize={'small'} /> Sair
                            </label></div>
                    </MenuItem>
                </Menu>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <div className='icones-nome'>
                                <label><HttpsIcon fontSize={'small'} />Alterar Senha </label>
                            </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className="alterar-senha">
                                <div className="campos-alterasenha">
                                    <label>Senha Atual</label>
                                    <input type="password"></input>
                                </div>
                                <div className="campos-alterasenha">
                                    <label>Nova Senha</label>
                                    <input type="password"></input>
                                </div>
                                <button>CONFIRMAR</button>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
                {activeRoute === '/pax-primavera/associado' ? (
                    <Parcel
                        key={activeRoute}
                        config={() => System.import('@pax/pax-associado')}

                    />
                ) : activeRoute === '/pax-primavera/vendas' ? (
                    <Parcel
                        key={activeRoute}
                        config={() => System.import('@pax/pax-venda')}
                    />
                ) : activeRoute === '/pax-primavera/cobranca' ? (
                    <Parcel
                        key={activeRoute}
                        config={() => System.import('@pax/pax-cobranca')}
                    />
                ) : activeRoute === '/pax-primavera/manual-sistema' ? (
                    <ManualScreen />
                ) : activeRoute === '/pax-primavera/chat' ? (
                    <PageChat />
                ) : activeRoute === '/pax-primavera/solicitacao' ? (
                    <Solicitacao />
                ) : activeRoute === '/pax-primavera' ? (
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
                                </FloatingWindow>
                            )}
                            <button>
                                <a className="dinheiro-recebimento">
                                    <img src={Atendimento} alt="Atendimento"></img>Iniciar<br></br>
                                    Atendimento
                                </a>
                            </button>
                            <button onClick={() => handleMenuClick("/pax-primavera/solicitacao")}>
                                <a className="dinheiro-recebimento">
                                    <img src={Atendimento2} alt="Atendimento2"></img>Acompanhar
                                    Solicitações
                                </a>
                            </button>
                            <button onClick={() => handleMenuClick("/pax-primavera/chat")}>
                                <a className="dinheiro-recebimento">
                                    <img src={ChatPax} alt="Atendimento2"></img>Chat
                                </a>
                            </button>
                            <button
                                onClick={() => handleMenuClick("/pax-primavera/manual-sistema")}>
                                <a className="dinheiro-recebimento">
                                    <img src={Manual} alt="Manual"></img>Manual do Sistema
                                </a>
                            </button>
                            <button>
                                <a href="https://paxprimavera.com.br/" className="dinheiro-recebimento" target="_blank">
                                    <img src={Site} alt="Manual"></img>Pax Primavera
                                </a>
                            </button>
                        </div>
                        <div className="mixed-chart">
                            <div className="button-group-container">
                                <div className="tabela-botao-associado">
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
                                            <div className="adesao-promocao">
                                                <label>Promoções</label>
                                            </div>

                                        </Button>
                                        <Button
                                            onClick={() => handleButtonClick("Adesão")}
                                            style={{
                                                background: "#006b33",
                                                borderBottom: selectedOption === "Adesão" ? "3px solid yellow" : "",
                                            }}
                                        >
                                            <div className="adesao-promocao">
                                                <label>Adesão</label>
                                            </div>

                                        </Button>
                                        <Button

                                            style={{
                                                background: "#006b33",
                                                borderBottom: selectedOption === "Adesão" ? "3px solid yellow" : "",
                                            }}
                                        >
                                            <div className="adesao-promocao">
                                                <select>
                                                    <option>Dourados</option>
                                                    <option>Itaporã</option>
                                                </select>
                                            </div>

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
                            </div>
                            <div className="slide-noticias">
                                <div className="slide-container">
                                    <Slide indicators={true}>
                                        {slideImages.map((each, index) => (
                                            <div key={index} className="each-slide">
                                                <div style={{ 'backgroundImage': `url(${each})` }} />
                                            </div>
                                        ))}
                                    </Slide>
                                </div>
                            </div>

                        </div>
                    </>
                ) : (<></>)}
            </div>
        </div>
    );
};

export default Home;
