import React, { useState } from 'react';
import './header-perfil.css';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Brasil from "../../../assets/png/brasil.png";
import Paraguai from "../../../assets/png/paraguai.png";
import idiomas from '../../utils/info';
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HttpsIcon from "@mui/icons-material/Https";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import { Modal, Box, Menu, MenuItem, Typography, Button } from "@mui/material";
import { useUnidade } from '../../services/api-config';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

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

const HeaderPerfil = (
    { activeRoute, unidadeAtual, setUnidadeAtual, unidades, idioma, setIdioma, usuario, handleMenuClick }) => {
    const navigate = useNavigate();
    const { alterarSenha } = useUnidade();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [open, setOpen] = useState(false);
    const [senha, setSenha] = useState("");
    const [senhaAtual, setSenhaAtual] = useState("");
    const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleMenuLingua = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleCloseLingua = () => {
        setAnchorEl2(null);
    };

    const handleSelectPais = () => {
        setIdioma(!idioma);
        handleCloseLingua();
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const atualizaSenha = async () => {
        try {
            const response = await alterarSenha(senhaAtual, senha, usuario.usuario);
            if (response.ok) {
                toast.success("Senha alterada com sucesso");
                setSenha("");
                setSenhaAtual("");
            } else {
                toast.error("Erro ao alterar senha");
            }
        } catch (error) {
            toast.error("Erro ao realizar solicitação");
        }
    };

    const Logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            <div className="perfil">
                <div className="perfil-localizacao">
                    {(activeRoute === "/pax-primavera" ||
                        activeRoute === "/pax-primavera/associado") && (
                            <div className="cidade-home">
                                <div className="localizacao-unidade">
                                    <label>
                                        <LocationOnIcon fontSize={"small"} />
                                    </label>
                                    <select
                                        value={unidadeAtual}
                                        onChange={(event) => setUnidadeAtual(event.target.value)}
                                    >
                                        {unidades.map((unidade) => (
                                            <option key={unidade.id} value={unidade.id}>
                                                {unidade.nome_unidade}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    <Button
                        id="basic-button"
                        aria-controls={anchorEl2 ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        className="botao-br-py"
                        onClick={handleMenuLingua}
                        style={{ textTransform: "none" }} // Evita que o texto do botão seja capitalizado
                    >
                        {idioma ?
                            <img
                                src={Paraguai}
                                alt="Paraguai"
                                style={{
                                    width: "30px",
                                    height: "20px",
                                    borderRadius: "3px",
                                }} />
                            :
                            <img
                                src={Brasil}
                                alt="BR"
                                style={{
                                    width: "30px",
                                    height: "20px",
                                    borderRadius: "3px",
                                }} />
                        }
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={Boolean(anchorEl2)}
                        onClose={handleCloseLingua}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        transformOrigin={{
                            vertical: "top",

                            horizontal: "right",
                        }}
                        style={{
                            // Ajusta a distância do topo
                            marginLeft: "47px", // Ajusta a distância da direita
                            width: "200px", // Define a largura do menu
                        }}
                    >
                        <MenuItem onClick={() => handleSelectPais()}>
                            <div className="pais-lingua">
                                <img
                                    src={Brasil}
                                    alt="Brasil"
                                    style={{ width: "35px", height: "20px" }} />
                                <label>Brasil</label>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={() => handleSelectPais()}>
                            <div className="pais-lingua">
                                <img
                                    src={Paraguai}
                                    alt="Paraguai"
                                    style={{ width: "33px", height: "20px" }} />
                                <label>Paraguai</label>
                            </div>
                        </MenuItem>
                    </Menu>
                    {activeRoute === "/pax-primavera" ||
                        activeRoute === "/pax-primavera/associado" ? (
                        <div className="perfil-acessos3">
                            <a onClick={handleMenuOpen}>
                                <AccountCircleIcon />
                            </a>
                        </div>
                    ) : (
                        <>
                            <div className="perfil-acessos">
                                <a onClick={handleMenuOpen}>
                                    <AccountCircleIcon />
                                </a>
                            </div>

                            <p style={{ color: "white" }}>{usuario}</p>
                        </>
                    )}
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    <div className="icones-nome">
                        <a onClick={() => handleMenuClick("/pax-primavera/perfil")}>
                            <label>
                                <PersonAddAlt1Icon fontSize={"small"} />{" "}
                                {idioma
                                    ? idiomas.es_PY.menuUsuario.perfil
                                    : idiomas.pt_BR.menuUsuario.perfil}
                            </label>
                        </a>
                    </div>
                </MenuItem>
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
                                Alterar Senha
                            </label>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="alterar-senha">
                            <div className="campos-alterasenha">
                                <label>Senha Atual</label>
                                <input
                                    value={senhaAtual}
                                    type={mostrarSenhaAtual ? "text" : "password"}
                                    onChange={(e) => setSenhaAtual(e.target.value)}
                                />
                            </div>
                            <div className="campos-alterasenha">
                                <label>Nova Senha</label>
                                <input
                                    value={senha}
                                    type={mostrarSenha ? "text" : "password"}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                            <button onClick={atualizaSenha}>CONFIRMAR</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default HeaderPerfil;
