import React, { useEffect, useState } from "react";
import "./home.css";
import { toast } from "react-toastify";
import FloatingWindow from "../components/modal/recebimento";
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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
import ErrorComponent from "../components/show-message";
import Desenvolvimento from "../components/em-desenvolvimento";
import Perfil from "../pages/perfil/index";
import Header from "../components/header";
import Telemarketing from "../components/telemarketing";
import AcessoRapido from "../components/menu-acesso-rapido";
import HeaderPerfil from "../components/header-perfil";

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


const Home = () => {
  const { getUnidades } = useUnidade();
  const [atendimentoClose, setAtendimentoClose] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [idioma, setIdioma] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilial, setIsFilial] = useState(true);
  const [unidades, setUnidades] = useState([]);
  const [permissao, setPermissao] = useState([]);
  const [permissaoGlobal, setPermissaoGlobal] = useState([]);
  const [unidadeAtual, setUnidadeAtual] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [selectedOption, setSelectedOption] = useState("Adesão");
  const [showTable, setShowTable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const ParcelWithInactivity = InactivityHOC(Parcel);
  const [isAtendimentoModal, setIsAtendimentoModal] = useState(false);
  const navigate = useNavigate();

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

  //janela flutuante do recebimento
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);

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

  const isItemActive = (moduleName, item) => {
    const modulePermission =
      permissao[moduleName] || permissaoGlobal[moduleName];
    if (modulePermission && modulePermission[item]) {
      return modulePermission[item].ativo === true;
    }
    return false;
  };

  useEffect(() => {
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      const pageContent = localStorage.getItem("page");
      setActiveRoute(pageContent);
      const usuarioObj = JSON.parse(savedUsuario);
      setUsuario(usuarioObj);
      setIdioma(usuarioObj.idioma === "BR" ? false : true);
      setUnidades(usuario.unidades);
      setPermissaoGlobal(usuarioObj.permissoes);
      try {
        getUnidades()
          .then((data) => {
            const unidadesFiltradas = data.filter((unidade) =>
              usuarioObj.unidades.some(
                (userUnidade) => userUnidade.unidadeId === unidade.id
              )
            );
            setUnidades(unidadesFiltradas);
            setUnidadeAtual(unidadesFiltradas[0].id);
            const permissaoUnidadeAtual = usuarioObj.unidades.find(
              (unidade) => unidade.unidadeId === unidadesFiltradas[0].id
            );
            if (permissaoUnidadeAtual) {
              setPermissao(permissaoUnidadeAtual.permissao);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            let errorCode = 500;
            if (error.response && error.response.status) {
              errorCode = error.status;
            }
            if (error.message === "Network Error") {
              setErrorMessage(
                "Erro de conexão. Por favor, verifique sua conexão com a internet e tente novamente."
              );
            } else {
              setErrorMessage(error.message);
              errorCode = error.status;
            }
            setErrorCode(errorCode);
            setIsLoading(false);
          });
      } catch (error) {
        let errorCode = 500;
        if (error.response && error.response.status) {
          errorCode = error.response.status;
        }
        if (error.message === "Network Error") {
          setErrorMessage(
            "Erro de conexão. Por favor, verifique sua conexão com a internet e tente novamente."
          );
        } else {
          setErrorMessage(error.message);
        }
        setErrorCode(errorCode);
        setIsLoading(false);
      }
    }
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
    setIsFilial(true);
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      const usuarioObj = JSON.parse(savedUsuario);
      usuarioObj.unidadeAtual = unidadeAtual;
      localStorage.setItem("usuario", JSON.stringify(usuarioObj));
      const permissaoUnidadeAtual = usuarioObj.unidades.find(
        (unidade) => unidade.unidadeId === parseInt(unidadeAtual)
      );
      if (permissaoUnidadeAtual) {
        setPermissao(permissaoUnidadeAtual.permissao);
      }
      localStorage.setItem("page", "/pax-primavera");
      localStorage.removeItem("page-associado");
      setActiveRoute("/pax-primavera");
      navigate("/pax-primavera");
    }
    setTimeout(() => {
      setIsFilial(false);
    }, 1000);
  }, [unidadeAtual]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Carregando />
        </div>
      ) : errorMessage ? (
        <ErrorComponent message={errorMessage} errorCode={errorCode} />
      ) : (
        <div className="container-dashboard">
          <Header
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
            idioma={idioma}
            permissao={permissao}
            permissaoGlobal={permissaoGlobal}
          />
          <div className="container-dashboard2">

            <HeaderPerfil
              activeRoute={activeRoute}
              unidadeAtual={unidadeAtual}
              setUnidadeAtual={setUnidadeAtual}
              unidades={unidades}
              idioma={idioma}
              setIdioma={setIdioma}
              usuario={usuario.usuario}
              handleMenuClick={handleMenuClick}
            />
            {isFilial ? (
              <div className="loading">
                <Carregando />
              </div>
            ) : (
              <>
                {activeRoute === "/pax-primavera/associado" ? (
                  <ParcelWithInactivity
                    key={activeRoute}
                    config={() => {
                      try {
                        return System.import("@pax/pax-associado")
                      } catch (error) {
                        <Desenvolvimento tela="Associados" />;
                      }
                    }}
                  />
                ) : activeRoute === "/pax-primavera/vendas" ? (
                  <ParcelWithInactivity
                    key={activeRoute}
                    config={() => {
                      try {
                        return System.import("@pax/pax-venda")
                      } catch (error) {
                        <Desenvolvimento tela="Web Vendedor" />;
                      }
                    }}
                  />
                ) : activeRoute === "/pax-primavera/financeiro" ? (
                  // <Desenvolvimento tela="Financeiro" />
                  <ParcelWithInactivity
                    key={activeRoute}
                    config={() => System.import("@pax/pax-financeiro")}
                  />
                ) :
                  activeRoute === "/pax-primavera/cobranca" ? (
                    <ParcelWithInactivity
                      key={activeRoute}
                      config={() => {
                        try {
                          return System.import("@pax/pax-cobranca")
                        } catch (error) {
                          <Desenvolvimento tela="Cobrança" />;
                        }
                      }}
                    />
                  ) : activeRoute === "/pax-primavera/parcelas" ? (
                    <ParcelWithInactivity
                      key={activeRoute}
                      config={() => {
                        try {
                          return System.import("@pax/pax-parcelas")
                        } catch (error) {
                          <Desenvolvimento tela="Parcelas" />;
                        }
                      }}
                    />
                  ) : activeRoute === "/pax-primavera/boletos" ? (
                    <ParcelWithInactivity
                      key={activeRoute}
                      config={() => {
                        try {
                          return System.import("@pax/pax-boletos");
                        } catch (error) {
                          <Desenvolvimento tela="Boletos" />;
                        }
                      }}
                    />
                  ) : activeRoute === "/pax-primavera/gerencial" ? (
                    <Desenvolvimento tela="Gerencial" />
                  ) : activeRoute === "/pax-primavera/configuracoes/cadastro" ? (
                    <ParcelWithInactivity
                      key={activeRoute}
                      config={() => {
                        try {
                          return System.import("@pax/pax-cadastro")
                        } catch (error) {
                          <Desenvolvimento tela="Cadastro" />;
                        }
                      }}
                    />
                  ) : activeRoute === "/pax-primavera/suporte" ? (
                    <ParcelWithInactivity
                      key={activeRoute}
                      config={() => {
                        try {
                          return System.import("@pax/pax-suporte");
                        } catch (error) {
                          <Desenvolvimento tela="Suporte" />;
                        }
                      }}
                    />
                  ) : activeRoute === "/pax-primavera/manual-sistema" ? (
                    <ManualScreen />
                  ) : activeRoute === "/pax-primavera/chat" ? (
                    <PageChat />
                  ) : activeRoute === "/pax-primavera/perfil" ? (
                    <Perfil />
                  ) : activeRoute === "/pax-primavera/solicitacao" ? (
                    <Solicitacao />
                  ) : activeRoute === "/pax-primavera" ? (
                    <>
                      <AcessoRapido
                        idioma={idioma}
                        setShowFloatingWindow={setShowFloatingWindow}
                        setIsAtendimentoModal={setIsAtendimentoModal}
                        handleMenuClick={handleMenuClick}
                        usuario={usuario.usuario}
                      />
                      {showFloatingWindow && (
                        <FloatingWindow
                          onClose={closeFloatingWindow}
                        ></FloatingWindow>
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
                                    selectedOption === "Adesão"
                                      ? "3px solid yellow"
                                      : "",
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
                                    selectedOption === "Adesão"
                                      ? "3px solid yellow"
                                      : "",
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
                                <Table
                                  sx={{ maxWidth: 1100 }}
                                  aria-label="simple table"
                                >
                                  <TableHead className="TableHead">
                                    <TableCell align="center">Estado</TableCell>
                                    {dadosAdesao[0]?.planos.map(
                                      (plano, index) => (
                                        <TableCell key={index} align="center">
                                          {plano.nome}
                                        </TableCell>
                                      )
                                    )}
                                  </TableHead>
                                  <TableBody className="TableBody">
                                    {dadosAdesao.map((row, index) => (
                                      <TableRow key={index}>
                                        <TableCell align="center">
                                          {row.estado}
                                        </TableCell>
                                        {row.planos.map((plano, planoIndex) => (
                                          <TableCell
                                            key={planoIndex}
                                            align="center"
                                          >
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
                                <Table
                                  sx={{ maxWidth: 1100 }}
                                  aria-label="simple table"
                                >
                                  <TableHead className="TableHead">
                                    <TableRow>
                                      <TableCell align="center">
                                        Parcela
                                      </TableCell>
                                      <TableCell align="center">
                                        Valor R$
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody className="TableBody">
                                    {dadosPromocao.map((row, index) => (
                                      <TableRow key={index}>
                                        <TableCell align="center">
                                          {row.parcela}
                                        </TableCell>
                                        <TableCell align="center">
                                          {row.valor}
                                        </TableCell>
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
                                  <div
                                    style={{ backgroundImage: `url(${each})` }}
                                  />
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
