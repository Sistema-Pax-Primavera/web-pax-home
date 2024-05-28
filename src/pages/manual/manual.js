import React, { useState } from "react";
import "./manual.css";
import Logo from "../../../assets/svg/logo-pax-verde.svg";
import Perguntas from "./perguntas";
import Carregando from "../../components/carregando";
import SearchIcon from "@mui/icons-material/Search";
import { Slide } from "react-slideshow-image";

const ManualScreen = () => {
  const [query, setQuery] = useState("");
  const [perguntaSelecionada, setPerguntaSelecionada] = useState(null);
  const [mostrarCarregando, setMostrarCarregando] = useState(false);

  const handleQueryChange = (event) => {
    setQuery(event.target.value.toLowerCase());
    // Limpa a pergunta selecionada ao alterar a consulta
    setPerguntaSelecionada(null);
  };

  // Função para lidar com o clique em uma pergunta
  const handleQuestionClick = (pergunta) => {
    // Exibe o componente de carregamento
    setMostrarCarregando(true);
    // Limpa a pergunta selecionada
    setPerguntaSelecionada(null);
    // Simula um tempo de carregamento antes de exibir a pergunta selecionada
    setTimeout(() => {
      setPerguntaSelecionada(pergunta);
      // Oculta o componente de carregamento após o tempo de simulação
      setMostrarCarregando(false);
    }, 2000); // Tempo de simulação: 2 segundos
  };

  return (
    <div className="container-manual">
      <div className="fundo-container-manual">
        <div className="pesquisa-manual">
          <SearchIcon fontSize={"small"} />
          <input
            placeholder="Escreva a sua dúvida aqui!"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        {/* Renderiza as instruções se não houver consulta */}
        {query === "" && (
          <>
            <h1>Bem Vindo ao Manual do Sistema!</h1>
            <label>Aqui estão algumas instruções importantes ...</label>
            <img src={Logo} alt="Logo" />
          </>
        )}
        {/* Renderiza o componente Perguntas se houver consulta */}
        {query !== "" && (
          <Perguntas query={query} onQuestionClick={handleQuestionClick} />
        )}
        {/* Renderiza o componente de carregamento */}
        {mostrarCarregando && (
          <div className="carregando-manual">
            <Carregando />
          </div>
        )}
        {/* Renderiza a pergunta selecionada */}
        {perguntaSelecionada && (
          <div className="pergunta-selecionada">
            <h2>{perguntaSelecionada.pergunta}</h2>
            <p>{perguntaSelecionada.resposta}</p>
            {/* Renderiza o slideshow com os textos e imagens correspondentes */}
            <div className="slide-container2">
              <Slide indicators={true} autoplay={false}>
                {perguntaSelecionada.imagens.map((imagem, index) => (
                  <div key={index} className="each-slide2">
                    <p>{perguntaSelecionada.textos[index]}</p>
                    <img src={imagem} alt={`Imagem ${index}`} />
                    {/* Exibe o texto correspondente ao slide atual */}
                  </div>
                ))}
              </Slide>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualScreen;
