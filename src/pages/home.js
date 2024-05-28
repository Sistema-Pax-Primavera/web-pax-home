import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Parcel from "single-spa-react/parcel";

import ManualScreen from "./manual/manual";
import PageChat from "./chat/chat";
import Solicitacao from "./solicitação";
import "react-slideshow-image/dist/styles.css";
import Switch from "@mui/material/Switch";
import { useUnidade } from "../services/api-config";
import Carregando from "../components/carregando";
import InactivityHOC from "../services/inactivityHOC";
import ErrorComponent from "../components/show-message";
import Desenvolvimento from "../components/em-desenvolvimento";
import Perfil from "../pages/perfil/index";
import Header from "../components/header";
import AcessoRapido from "../components/menu-acesso-rapido";
import HeaderPerfil from "../components/header-perfil";
import Noticias from "../components/noticias";
import Valores from "../components/tabela-adesao-promocao";
import { Box, Skeleton } from "@mui/material";

const Home = () => {
  const { getUnidades } = useUnidade();
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [idioma, setIdioma] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilial, setIsFilial] = useState(true);
  const [unidades, setUnidades] = useState([]);
  const [permissao, setPermissao] = useState([]);
  const [permissaoGlobal, setPermissaoGlobal] = useState([]);
  const [unidadeAtual, setUnidadeAtual] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const ParcelWithInactivity = InactivityHOC(Parcel);

  const navigate = useNavigate();

  const SwitchIdioma = () => {
    setIdioma(!idioma);
  };

  const handleMenuClick = (route) => {
    navigate(route);
    localStorage.setItem("page", route);
    setActiveRoute(route);
  };

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
    setTimeout(() => {
      setCarregando(false);
    }, 3000);
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
                      {carregando ?
                        <Box sx={{ width: '100%' }}>
                          {/* Skeleton grande que ocupa toda a largura */}
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={150} // Aumentado para 120
                            sx={{ marginBottom: 2, borderRadius: 2 }} // Bordas arredondadas
                          />

                          {/* Container para os 6 Skeletons menores */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            {[...Array(6)].map((_, index) => (
                              <Skeleton
                                key={index}
                                variant="rectangular"
                                width="15%"
                                height={60}
                                sx={{ borderRadius: 2 }}
                              />
                            ))}
                          </Box>

                          {/* Container para os 2 Skeletons adicionais */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {[...Array(2)].map((_, index) => (
                              <Skeleton
                                key={index}
                                variant="rectangular"
                                width="48%" // Largura de 48% para dois Skeletons
                                height={190} // Aumentado para 60
                                sx={{ borderRadius: 2 }} // Bordas arredondadas
                              />
                            ))}
                          </Box>
                        </Box>
                        :
                        <><AcessoRapido
                          idioma={idioma}
                          handleMenuClick={handleMenuClick}
                          usuario={usuario.usuario} /><div className="mixed-chart">
                            <Valores />
                            <Noticias />
                          </div></>
                      }

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
