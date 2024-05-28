import React, { useState, useEffect } from "react";
import "./perguntas.css";
import ChatPax from "../../../../assets/png/chat-pax.png";
import Recebimento01 from "../../../../assets/png/manual-recebimento-01.png";
import Recebimento02 from "../../../../assets/png/manual-recebimento-02.png";
import Recebimento04 from "../../../../assets/png/manual-recebimento-04.png";
import Recebimento05 from "../../../../assets/png/manual-recebimento-05.png";
import Recebimento06 from "../../../../assets/png/manual-recebimento-06.png";
import Recebimento07 from "../../../../assets/png/manual-recebimento-07.png";
import Recebimento08 from "../../../../assets/png/manual-recebimento-08.png";
import Manual from "../../../../assets/png/manual.png";
import Site from "../../../../assets/png/site.png";
import { Slide } from "react-slideshow-image";


const Perguntas = ({ query, onQuestionClick }) => {
  const [imagensCarregadas, setImagensCarregadas] = useState(false);
  const [botaoClicado, setBotaoClicado] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0); // Estado para controlar o índice do slide atual

  // Lista de perguntase
  const perguntas = [
    {
      id: 1,
      pergunta: "Como fazer o recebimento do cliente?",
      imagens: [
        Recebimento01,
        Recebimento02,
        Recebimento04,
        Recebimento05,
        Recebimento06,
        Recebimento07,
        Recebimento08,
      ],
      palavrasChave: ["recebimento", "pagamento", "cliente"],
      textos: [
        <div className="textos-duvidas-manual">
          <label>Existem duas forma de você fazer o recebimento;</label>
          <p>1. Clicando no atalho na tela home Recebimento;</p>
          <p>2. Clicando em Associados; </p>
        </div>,
        <div className="textos-duvidas-manual">
          <label>Atalho de Recebimento na home</label>
          <p>3. Você pode procurar o cliente pelo Nº do Contrato, Nome ou CPF;</p>
          <p>4. Clique em Pesquisar; </p>
          <p>5. Selecione o Cliente; </p>
        </div>,
        <div className="textos-duvidas-manual">
          <p>6. Informe a quantidade de parcelas, total a pagar e o desconto;</p>
          <p>7. Clique em Aplicar Desconto;</p>
        </div>,
        <div className="textos-duvidas-manual">
          <p>8. Informe a forma de pagamento e o valor a pagar;</p>
          <p>9. Adicione a forma de pagamento ;</p>
          <p>10. Clique em Receber;</p>
        </div>,
        <div className="textos-duvidas-manual">
          <label>Através de Associados</label>
          <p>11. Você pode procurar o cliente pelo Nº do Contrato, Nome ou CPF;</p>
          <p>11. Clique em Pesquisar; </p>
          <p>12. Selecione o Cliente; </p>
        </div>,
        <div className="textos-duvidas-manual">
          <p>13. Selecione o botão Recebimento;</p>
        </div>,
        <div className="textos-duvidas-manual">
          <p>14. Informe a quantidade de parcelas, total a pagar e o desconto;</p>
          <p>15. Clique em Aplicar Desconto; </p>
          <p>16. Informe a forma de pagamento e o valor a pagar; </p>
          <p>17. Clique em Adicionar; </p>
          <p>18. Clique em Receber; </p>
        </div>,
        <div className="textos-duvidas-manual">
          <label>Existem duas forma de você fazer o recebimento</label>
          <p>1. Clicando no atalho na tela home "Recebimento"</p>
          <p>2. Clicando em Associados </p>
        </div>,
      ],
    },
    {
      id: 2,
      pergunta: "Como registrar óbito?",
      resposta: "Instruções sobre como registrar um óbito no sistema.",
      imagens: [ChatPax, Manual, Site],
      textos: [
        "Texto correspondente ao primeiro slide",
        "Texto correspondente ao segundo slide",
        "Texto correspondente ao terceiro slide",
      ],
    },
    // Adicione mais perguntas conforme necessário
  ];
  // Filtra as perguntas com base na consulta
  const filteredPerguntas = perguntas.filter((pergunta) => {
    const perguntaLowerCase = pergunta.pergunta.toLowerCase();
    const queryWords = query.toLowerCase().split(' ');

    // Verifica se alguma palavra da consulta está presente na pergunta ou em suas palavras-chave
    return queryWords.some((word) => {
      return (
        perguntaLowerCase.includes(word) ||
        (pergunta.palavrasChave &&
          pergunta.palavrasChave.some((palavra) =>
            palavra.toLowerCase().includes(word)
          ))
      );
    });
  });





  useEffect(() => {
    // Verifica se todas as imagens foram carregadas
    const todasAsImagensCarregadas = perguntas.every((pergunta) =>
      pergunta.imagens.every((imagem) => imagem.complete)
    );

    // Define o estado das imagens como carregadas se todas estiverem carregadas
    if (todasAsImagensCarregadas) {
      setImagensCarregadas(true);
    }
  }, []);

  // Função para atualizar o índice do slide atual
  const handleSlideChange = (currentIndex) => {
    setSlideIndex(currentIndex);
  };

  return (
    <div className="duvidas-perguntas">
      {filteredPerguntas.length > 0 ? (
        <>
          <h2>Sua dúvida está relacionada a alguns tópicos abaixo!</h2>
          <div className="texto-duvida-perguntas">
            {filteredPerguntas.map((pergunta) => (
              <div className="texto-duvida-perguntas2" key={pergunta.id}>
                <button
                  className={
                    botaoClicado === pergunta.id ? "botao-selecionado" : ""
                  }
                  onClick={() => {
                    onQuestionClick(pergunta);
                    setBotaoClicado(pergunta.id);
                  }}
                >
                  {pergunta.pergunta}
                </button>
                {/* Renderiza o slideshow para cada pergunta */}
                {imagensCarregadas && (
                  <div className="slide-noticias2">
                    <div className="slide-container2">
                      <Slide
                        indicators={true}
                        onChange={handleSlideChange} // Define a função de callback para alteração de slide
                      >
                        {pergunta.imagens.map((imagem, index) => (
                          <div key={index} className="each-slide2">
                            <img src={imagem} alt={`Imagem ${index}`} />
                            {/* Renderiza o texto correspondente ao slide atual */}
                            {index === slideIndex && (
                              <p>{pergunta.textos[index]}</p>
                            )}
                          </div>
                        ))}
                      </Slide>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Nenhuma pergunta encontrada. Por favor, refine sua consulta.</p>
      )}
    </div>
  );
};



export default Perguntas;
