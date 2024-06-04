import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Parcel from "single-spa-react/parcel";
import "react-slideshow-image/dist/styles.css";
import Switch from "@mui/material/Switch";
import { useUnidade } from "../services/api-config";
import Carregando from "../components/carregando";
import InactivityHOC from "../services/inactivityHOC";
import ErrorComponent from "../components/show-message";
import Header from "../components/header";
import HeaderPerfil from "../components/header-perfil";
import Modulos from "../components/modulos";

const Home = () => {
  const { getUnidades } = useUnidade();
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [idioma, setIdioma] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilial, setIsFilial] = useState(true);
  const [unidades, setUnidades] = useState([]);
  const [permissao, setPermissao] = useState([]);
  const [permissaoGlobal, setPermissaoGlobal] = useState([]);
  const [unidadeAtual, setUnidadeAtual] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (route) => {
    navigate(route);
    localStorage.setItem("page", route);
    setActiveRoute(route);
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
          <Carregando message={idioma ? 'Cargando' : 'Carregando'} />
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
              <Modulos
                activeRoute={activeRoute}
                idioma={idioma}
                handleMenuClick={handleMenuClick}
                usuario={usuario.usuario}
                carregando={carregando} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
