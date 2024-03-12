import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo-pax-branco.svg";
import "./home.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Menu, MenuItem } from "@mui/material";
import FloatingWindow from "../components/modal/recebimento";
import BemVindo from "../../assets/bem-vindo.png";
import Dinheiro from "../../assets/dinheiro.png";
import Atendimento from "../../assets/atendimento.png";
import Atendimento2 from "../../assets/atendimento2.png";
import { useNavigate } from "react-router-dom";
import Parcel from "single-spa-react/parcel";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ChatPax from "../../assets/chat-pax.png";
import Manual from "../../assets/manual.png";
import Site from "../../assets/site.png";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HttpsIcon from "@mui/icons-material/Https";
import ManualScreen from "./manual/manual";
import PageChat from "./chat/chat";
import Solicitacao from "./solicitação";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Switch from "@mui/material/Switch";
import idiomas from "../utils/info";
import { useUnidade } from "../services/api-config";
import Carregando from "../components/carregando";
import InactivityHOC from "../services/inactivityHOC";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    borderRadius: 5,
    p: 4,
};

const Home = () => {
    const { getUnidades } = useUnidade();
    const [usuario, setUsuario] = useState("");
    const [idioma, setIdioma] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilial, setIsFilial] = useState(true);
    const [unidades, setUnidades] = useState([]);
    const [unidadeAtual, setUnidadeAtual] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeRoute, setActiveRoute] = useState("");
    const [selectedOption, setSelectedOption] = useState("Adesão");
    const [showTable, setShowTable] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ParcelWithInactivity = InactivityHOC(Parcel);


    const dadosAdesao = [
        {
            estado: "MS",
            planos: [
                { nome: "Plano 1", valor: 120.0 },
                { nome: "Plano 2", valor: 180.0 },
                { nome: "Plano 3" },
            ],
        },
        {
            estado: "PR",
            planos: [
                { nome: "Plano 1", valor: 130.0 },
                { nome: "Plano 2", valor: 110.0 },
                { nome: "Plano 3", valor: 160.0 },
            ],
        },
        {
            estado: "GO",
            planos: [{ nome: "Plano 1", valor: 160.0 }],
        },
    ];

    const slideImages = [ChatPax, Manual, Site];

    const dadosPromocao = [
        { parcela: 1, valor: 10.0 },
        { parcela: 2, valor: 13.0 },
    ];

    const SwitchIdioma = () => {
        setIdioma(!idioma);
    };

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
        const savedUsuario = localStorage.getItem("usuario");
        if (savedUsuario) {
            const pageContent = localStorage.getItem("page");
            setActiveRoute(pageContent);
            const usuarioObj = JSON.parse(savedUsuario);
            setUsuario(usuarioObj);
            setIdioma(usuarioObj.idioma === "BR" ? false : true);
        }
        getUnidades().then((data) => {
            setUnidades(data);
            setUnidadeAtual(data[0].id)
        });
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const savedUsuario = localStorage.getItem("usuario");
        if (savedUsuario) {
            const usuarioObj = JSON.parse(savedUsuario);
            usuarioObj.idioma = idioma ? "PY" : "BR";
            localStorage.setItem("usuario", JSON.stringify(usuarioObj));
        }
    }, [idioma]);

    useEffect(() => {
        setIsFilial(true)
        const savedUsuario = localStorage.getItem("usuario");
        if (savedUsuario) {
            const usuarioObj = JSON.parse(savedUsuario);
            usuarioObj.unidadeAtual = unidadeAtual;
            localStorage.setItem("usuario", JSON.stringify(usuarioObj));
        }
        setTimeout(() => {
            setIsFilial(false);
        }, 1000);
    }, [unidadeAtual]);


    return (
        isLoading ? (
            <div className="loading">
                <Carregando />
            </div>
        ) : (
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
                        <label>
                            {idioma
                                ? idiomas.es_PY.menu.atendimento.titulo
                                : idiomas.pt_BR.menu.atendimento.titulo}
                        </label>
                        <button
                            onClick={() => handleMenuClick("/pax-primavera/associado")}
                            className={
                                activeRoute === "/pax-primavera/associado" ? "active" : ""
                            }
                        >
                            <AccountCircleIcon fontSize={"small"} />
                            {idioma
                                ? idiomas.es_PY.menu.atendimento.botoesAcao.associado
                                : idiomas.pt_BR.menu.atendimento.botoesAcao.associado}
                        </button>
                        <button
                            onClick={() => handleMenuClick("/pax-primavera/vendas")}
                            className={activeRoute === "/pax-primavera/vendas" ? "active" : ""}
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
                        >
                            <AutoAwesomeMosaicIcon fontSize={"small"} />
                            {idioma
                                ? idiomas.es_PY.menu.controle.botoesAcao.cobranca
                                : idiomas.pt_BR.menu.controle.botoesAcao.cobranca}
                        </button>
                        <label>
                            {idioma
                                ? idiomas.es_PY.menu.configurações.titulo
                                : idiomas.pt_BR.menu.configurações.titulo}
                        </label>
                        <button
                            onClick={() => handleMenuClick("/pax-primavera/configuracoes/cadastro")}
                            className={
                                activeRoute === "/pax-primavera/configuracoes/cadastro" ? "active" : ""
                            }
                        >
                            <FactCheckIcon fontSize={"small"} />
                            {idioma
                                ? idiomas.es_PY.menu.configurações.botoesAcao.cadastro
                                : idiomas.pt_BR.menu.configurações.botoesAcao.cadastro}
                        </button>
                    </div>
                </div>
                <div className="container-dashboard2">
                    <div className="perfil">
                        <div className="perfil-localizacao">
                            <div className="cidade-home">
                                <label>
                                    {idioma
                                        ? idiomas.es_PY.menuUsuario.unidade
                                        : idiomas.pt_BR.menuUsuario.unidade}
                                </label>
                                <select
                                    value={unidadeAtual}
                                    onChange={(event) =>
                                        setUnidadeAtual(event.target.value)
                                    }>
                                    {unidades.map((unidade) => (
                                        <option key={unidade.id} value={unidade.id}>
                                            {unidade.nome_unidade}
                                        </option>
                                    ))}
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
                            <div className="tradutor">
                                <label>
                                    {idioma
                                        ? idiomas.es_PY.menuUsuario.idioma.message
                                        : idiomas.pt_BR.menuUsuario.idioma.message}
                                </label>
                                <br />
                                <label>
                                    {idioma
                                        ? idiomas.es_PY.menuUsuario.idioma.br
                                        : idiomas.pt_BR.menuUsuario.idioma.br}
                                </label>
                                <Switch checked={idioma} onChange={SwitchIdioma} size="small" />
                                <label>
                                    {idioma
                                        ? idiomas.es_PY.menuUsuario.idioma.py
                                        : idiomas.pt_BR.menuUsuario.idioma.py}
                                </label>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <div className="icones-nome">
                                <label onClick={handleOpen}>
                                    <LockIcon fontSize={"small"} />{" "}
                                    {idioma
                                        ? idiomas.es_PY.menuUsuario.senha
                                        : idiomas.pt_BR.menuUsuario.senha}
                                </label>
                            </div>
                        </MenuItem>
                        {/* Opção: Sair */}
                        <MenuItem onClick={Logout}>
                            <div className="icones-nome">
                                <label>
                                    <LogoutIcon fontSize={"small"} />{" "}
                                    {idioma
                                        ? idiomas.es_PY.menuUsuario.sair
                                        : idiomas.pt_BR.menuUsuario.sair}
                                </label>
                            </div>
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
                                <div className="icones-nome">
                                    <label>
                                        <HttpsIcon fontSize={"small"} />
                                        Alterar Senha{" "}
                                    </label>
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
                    {isFilial ?
                        <div className="loading">
                            <Carregando />
                        </div>
                        :
                        <>
                            {activeRoute === "/pax-primavera/associado" ? (
                                <ParcelWithInactivity
                                    key={activeRoute}
                                    config={() => System.import("@pax/pax-associado")}
                                />
                            ) : activeRoute === "/pax-primavera/vendas" ? (
                                <ParcelWithInactivity
                                    key={activeRoute}
                                    config={() => System.import("@pax/pax-venda")}
                                />
                            ) : activeRoute === "/pax-primavera/cobranca" ? (
                                <ParcelWithInactivity
                                    key={activeRoute}
                                    config={() => System.import("@pax/pax-cobranca")}
                                />
                            ) : activeRoute === "/pax-primavera/configuracoes/cadastro" ? (
                                <ParcelWithInactivity
                                    key={activeRoute}
                                    config={() => System.import("@pax/pax-cadastro")}
                                />
                            ) : activeRoute === "/pax-primavera/manual-sistema" ? (
                                <ManualScreen />
                            ) : activeRoute === "/pax-primavera/chat" ? (
                                <PageChat />
                            ) : activeRoute === "/pax-primavera/solicitacao" ? (
                                <Solicitacao />
                            ) : activeRoute === "/pax-primavera" ? (
                                <>
                                    <div className="bem-vindo">
                                        <div className="bem-vindo2">
                                            <h1>
                                                {idioma
                                                    ? idiomas.es_PY.message.titulo
                                                    : idiomas.pt_BR.message.titulo}{" "}
                                                {usuario.usuario}
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

                                        {showFloatingWindow && (
                                            <FloatingWindow onClose={closeFloatingWindow}></FloatingWindow>
                                        )}
                                        <button>
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
                                        <button onClick={() => handleMenuClick("/pax-primavera/chat")}>
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
                                    <div className="mixed-chart">
                                        <div className="button-group-container">
                                            <div className="tabela-botao-associado">
                                                <ButtonGroup
                                                    disableElevation
                                                    variant="contained"
                                                    aria-label=" elevation buttons"
                                                    style={{ background: "#006b33" }}
                                                >
                                                    <Button
                                                        onClick={() => handleButtonClick("Promoção")}
                                                        style={{
                                                            border: "3px white",
                                                            background: "#006b33",
                                                            borderBottom:
                                                                selectedOption === "Promoção"
                                                                    ? "3px solid yellow"
                                                                    : "",
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
                                                            borderBottom:
                                                                selectedOption === "Adesão" ? "3px solid yellow" : "",
                                                        }}
                                                    >
                                                        <div className="adesao-promocao">
                                                            <label>Adesão</label>
                                                        </div>
                                                    </Button>
                                                    <Button
                                                        style={{
                                                            background: "#006b33",
                                                            borderBottom:
                                                                selectedOption === "Adesão" ? "3px solid yellow" : "",
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

                                            {showTable && selectedOption === "Adesão" && (
                                                <div className="tabela-abaixo-botoes">
                                                    <TableContainer
                                                        component={Paper}
                                                        className="TableContainer"
                                                    >
                                                        <Table sx={{ maxWidth: 1100 }} aria-label="simple table">
                                                            <TableHead className="TableHead">
                                                                <TableCell align="center">Estado</TableCell>
                                                                {dadosAdesao[0]?.planos.map((plano, index) => (
                                                                    <TableCell key={index} align="center">
                                                                        {plano.nome}
                                                                    </TableCell>
                                                                ))}
                                                            </TableHead>
                                                            <TableBody className="TableBody">
                                                                {dadosAdesao.map((row, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell align="center">{row.estado}</TableCell>
                                                                        {row.planos.map((plano, planoIndex) => (
                                                                            <TableCell key={planoIndex} align="center">
                                                                                {plano.valor}
                                                                            </TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>
                                            )}
                                            {showTable && selectedOption === "Promoção" && (
                                                <div className="tabela-abaixo-botoes">
                                                    <TableContainer
                                                        component={Paper}
                                                        className="TableContainer"
                                                    >
                                                        <Table sx={{ maxWidth: 1100 }} aria-label="simple table">
                                                            <TableHead className="TableHead">
                                                                <TableRow>
                                                                    <TableCell align="center">Parcela</TableCell>
                                                                    <TableCell align="center">Valor R$</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody className="TableBody">
                                                                {dadosPromocao.map((row, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell align="center">
                                                                            {row.parcela}
                                                                        </TableCell>
                                                                        <TableCell align="center">{row.valor}</TableCell>
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
                                                            <div style={{ backgroundImage: `url(${each})` }} />
                                                        </div>
                                                    ))}
                                                </Slide>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    }
                </div>
            </div>
        )

    );
};

export default Home;
