import React, { useState } from "react";
import "./solicitacao.css";
import Modal from "react-modal";
import LoupeIcon from "@mui/icons-material/Loupe";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import PlaceIcon from "@mui/icons-material/Place";
import CallIcon from "@mui/icons-material/Call";
import ArticleIcon from "@mui/icons-material/Article";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModalSolicitacaoFiltro from "../../components/modal-filtro-solicitacao";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

function SolicitacaoTela() {
  const [cards, setCards] = useState([]);
  const [formularioVisivel, setFormularioVisivel] = useState(false);
  const [cardSelecionado, setCardSelecionado] = useState(null);
  const [contadorPendentes, setContadorPendentes] = useState(0);
  const [contadorAtendimento, setContadorAtendimento] = useState(0);
  const [contadorFinalizada, setContadorFinalizada] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tipoSolicitacao, setTipoSolicitacao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [contrato, setContrato] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivosSelecionados, setArquivosSelecionados] = useState([]);
  const [openModalFiltro, setOpenModalFiltro] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEnviarSolicitacao = () => {
    // Lógica para enviar a solicitação
    const novoCard = {
      id: cards.length + 1,
      tipo: tipoSolicitacao,
      titulo: titulo,
      descricao: descricao,
      status: "pendente",
      telefone: telefone,
      contrato: contrato,
      usuario: "ADMIN",
      unidade: unidade,
      nome: nome,
      data: new Date(),
      userResponsavel: null,
      dataFinalizada: null,
      anexos: arquivosSelecionados,
      // Adicione outras propriedades como título, descrição, usuário, data e hora, etc.
    };

    setCards([...cards, novoCard]);
    setContadorPendentes(contadorPendentes + 1);

    // Feche o modal
    closeModal();
  };

  const handleCardClique = (id) => {
    setCardSelecionado(cards.find((card) => card.id === id));
    setFormularioVisivel(true);
  };

  const handleFecharFormulario = () => {
    setFormularioVisivel(false);
    setCardSelecionado(null);
  };

  const handleExcluir = () => {
    if (cardSelecionado) {
      const updatedCards = cards.filter(
        (card) => card.id !== cardSelecionado.id
      );
      setCards(updatedCards);
      if (cardSelecionado.status === "pendente") {
        setContadorPendentes(contadorPendentes - 1);
      } else if (cardSelecionado.status === "emAtendimento") {
        setContadorAtendimento(contadorAtendimento - 1);
      } else if (cardSelecionado.status === "finalizado") {
        setContadorFinalizada(contadorFinalizada - 1);
      }
      // Feche o formulário
      setFormularioVisivel(false);
      setCardSelecionado(null);
    }
  };

  const handleAtender = () => {
    // Lógica para atender a solicitação
    // Atualize o status do card para 'emAtendimento' e mova-o para a coluna de emAtendimento
    if (cardSelecionado) {
      const usuarioAtendimento = "Usuário Atendente"; // Substitua pelo usuário real que atendeu
      const updatedCards = cards.map((card) =>
        card.id === cardSelecionado.id
          ? {
              ...card,
              status: "emAtendimento",
              userResponsavel: usuarioAtendimento,
            }
          : card
      );
      setCards(updatedCards);
      setContadorPendentes(contadorPendentes - 1);
      setContadorAtendimento(contadorAtendimento + 1);
      // Feche o formulário
      setFormularioVisivel(false);
      setCardSelecionado(null);
    }
  };

  const handleFinalizar = () => {
    if (cardSelecionado) {
      const dataFinal = new Date();
      const updatedCards = cards.map((card) =>
        card.id === cardSelecionado.id
          ? { ...card, status: "finalizado", dataFinalizada: dataFinal }
          : card
      );
      setCards(updatedCards);
      setContadorAtendimento(contadorAtendimento - 1);
      setContadorFinalizada(contadorFinalizada + 1);
      // Feche o formulário
      setFormularioVisivel(false);
      setCardSelecionado(null);
    }
  };

  const handleAnexoChange = (files) => {
    if (cardSelecionado && files.length > 0) {
      const novosAnexos = Array.from(files);
      const anexosAtualizados = cardSelecionado.anexos
        ? [...cardSelecionado.anexos, ...novosAnexos]
        : [...novosAnexos];
      setCardSelecionado({
        ...cardSelecionado,
        anexos: anexosAtualizados,
      });
    }
  };

  const pendentes = cards.filter((card) => card.status === "pendente");
  const emAtendimento = cards.filter((card) => card.status === "emAtendimento");
  const finalizadas = cards.filter((card) => card.status === "finalizado");

  return (
    <div className="solicitacao-tela">
      <div className="opcoes">
        <button onClick={openModal}>
          <LibraryAddOutlinedIcon fontSize={"small"} />
          CRIAR SOLICITAÇÃO
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enviar Solicitação"
        style={{
          overlay: {
            // Adiciona um fundo translúcido para a modal
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            borderRadius: 10,
            width: "30%", // Define a largura desejada para a modal
            height: "67%", // Define a altura desejada para a modal
            margin: "auto", // Centraliza a modal na tela
            animation: "slideInRight 0.5s forwards", // Adiciona a animação de entrada
          },
        }}
      >
        <div className="envia-solicitacao-home">
          <h2>Enviar Solicitação</h2>
          <select onChange={(e) => setTipoSolicitacao(e.target.value)}>
            <option value="">Escolha o tipo de solicitação</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Cobrança">Cobrança</option>
            <option value="Manutencao">Manutenção</option>
          </select>
          <div className="campos-soliticacao-home">
            <label>Titulo</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="linhas-campos-solicitacao-home">
            <div className="campos-soliticacao-home2">
              <label>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="campos-soliticacao-home2">
              <label>Filial</label>
              <input
                type="text"
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
              />
            </div>
          </div>

          <div className="linhas-campos-solicitacao-home">
            <div className="campos-soliticacao-home2">
              <label>Telefone</label>
              <input
                type="number"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div className="campos-soliticacao-home2">
              <label>Contrato</label>
              <input
                type="number"
                value={contrato}
                onChange={(e) => setContrato(e.target.value)}
              />
            </div>
          </div>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <div className="campos-soliticacao-home">
            <label htmlFor="anexo">Anexo</label>
            <input
              type="file"
              id="anexo"
              onChange={(e) => handleAnexoChange(e.target.files)}
            />
          </div>

          <div className="button-salva-cancela-soli">
            <div className="componente-botao-soli">
              <ButtonIconTextoStart
                title={"SALVAR"}
                funcao={handleEnviarSolicitacao}
                corFundoBotao={"#006b33"}
                fontSizeBotao={12}
                fontWeightBotao={800}
                corTextoBotao={"#ffff"}
              />
            </div>
            <div className="componente-botao-soli">
              <ButtonIconTextoStart
                title={"CANCELAR"}
                funcao={closeModal}
                fontWeightBotao={800}
                corFundoBotao={"#006b33"}
                fontSizeBotao={12}
                corTextoBotao={"#ffff"}
              />
            </div>
          </div>
        </div>
      </Modal>

      <div className="cards-container">
        <div className="column-pendentes">
          <div className="title-icon-soli">
            <h3>
              <AccessTimeIcon />
              Pendentes <span>{contadorPendentes}</span>
            </h3>
            <div className="filter-soli">
              <button onClick={abrirModal}>
                <FilterAltIcon fontSize={"small"} />
              </button>
            </div>
            <ModalSolicitacaoFiltro
              openModal={modalAberto}
              onCloseModal={fecharModal}
            />
          </div>

          {pendentes.map((card) => (
            <div
              key={card.id}
              className="card"
              onClick={() => handleCardClique(card.id)}
            >
              <div className="info-soli-home">
                <p>{card.tipo}</p>
                <a>
                  {card.data.toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </a>
              </div>
              <div className="info-soli-home">
                <label>
                  <CommentIcon fontSize={"small"} />
                  {card.titulo}
                </label>
              </div>
              <div className="info-soli-home">
                <label>
                  <AccountCircleIcon fontSize={"small"} /> {card.nome}
                </label>
                <label>
                  <PlaceIcon fontSize={"small"} /> {card.unidade}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="column-atendimento">
          <div className="title-icon-soli2">
            <h3>
              <SpeakerNotesIcon /> Em Atendimento{" "}
              <span>{contadorAtendimento}</span>
            </h3>
            <div className="filter-soli2">
              <button onClick={abrirModal}>
                <FilterAltIcon fontSize={"small"} />
              </button>
            </div>
            <ModalSolicitacaoFiltro
              openModal={modalAberto}
              onCloseModal={fecharModal}
            />
          </div>
          {emAtendimento.map((card) => (
            <div
              key={card.id}
              className="card-atendimento"
              onClick={() => handleCardClique(card.id)}
            >
              <div className="info-soli-home-atendimento">
                <p>{card.tipo}</p>
                <label>
                  Data:{" "}
                  {card.data.toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </label>
              </div>
              <div className="info-soli-home-atendimento2">
                <label>
                  <CommentIcon fontSize={"small"} />
                  {card.titulo}
                </label>
              </div>
              <div className="info-soli-home-atendimento2">
                <label>
                  <AccountCircleIcon fontSize={"small"} /> {card.nome}
                </label>
                <label>
                  <PlaceIcon fontSize={"small"} /> {card.unidade}
                </label>
              </div>
              <div className="info-soli-home-atendimento2">
                <label>
                  <AddToQueueIcon fontSize={"small"} />
                  {card.descricao}
                </label>
              </div>
              <div className="info-soli-home-atendimento">
                <label>
                  <PersonIcon /> Responsavel: {card.userResponsavel}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="column-pendentes">
          <div className="title-icon-soli">
            <h3>
              <CheckCircleIcon />
              Finalizadas <span>{contadorFinalizada}</span>
            </h3>
            <div className="filter-soli">
              <button onClick={abrirModal}>
                <FilterAltIcon fontSize={"small"} />
              </button>
            </div>
            <ModalSolicitacaoFiltro
              openModal={modalAberto}
              onCloseModal={fecharModal}
            />
          </div>
          {finalizadas.map((card) => (
            <div
              key={card.id}
              className="card"
              onClick={() => handleCardClique(card.id)}
            >
              <div className="info-soli-home">
                <p>{card.tipo}</p>
                <a>
                  {card.data.toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </a>
              </div>
              <div className="info-soli-home">
                <label>
                  <CommentIcon fontSize={"small"} />
                  {card.titulo}
                </label>
              </div>
              <div className="info-soli-home">
                <label>
                  <AccountCircleIcon fontSize={"small"} /> {card.nome}
                </label>
                <label>
                  <PlaceIcon fontSize={"small"} /> {card.unidade}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      {formularioVisivel && (
        <div
          className={`formulario-flutuante ${
            formularioVisivel ? "" : "modal-fechada"
          }`}
        >
          <div className="linhas-detalhes-solicitacao">
            <h3>Detalhes da Solicitação</h3>
            <a onClick={handleFecharFormulario}>
              <HighlightOffIcon fontSize={"small"} />
            </a>
          </div>
          {cardSelecionado && (
            <>
              <div className="detalhes-solicitacao">
                <div className="linhas-detalhes-solicitacao">
                  <div className="campos-detalhes-solicitacao1">
                    <label>{cardSelecionado.tipo}</label>
                  </div>
                  <div className="campos-detalhes-solicitacao2">
                    <label>
                      {cardSelecionado.data.toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </label>
                  </div>
                </div>
                <div className="info-soli-home2">
                  <div className="campos-detalhes-solicitacao3">
                    <label>
                      <CommentIcon fontSize={"small"} />{" "}
                      {cardSelecionado.titulo}
                    </label>
                  </div>
                </div>
                <div className="info-soli-home2">
                  <div className="campos-detalhes-solicitacao3">
                    <label>
                      <AccountCircleIcon fontSize={"small"} />{" "}
                      {cardSelecionado.nome}
                    </label>
                  </div>
                  <div className="campos-detalhes-solicitacao3">
                    <label>
                      <PlaceIcon fontSize={"small"} /> {cardSelecionado.unidade}
                    </label>
                  </div>
                </div>
                <div className="info-soli-home2">
                  <div className="campos-detalhes-solicitacao3">
                    <label>
                      <CallIcon fontSize={"small"} /> {cardSelecionado.telefone}
                    </label>
                  </div>
                  <div className="campos-detalhes-solicitacao3">
                    <label>
                      <ArticleIcon fontSize={"small"} />{" "}
                      {cardSelecionado.contrato}
                    </label>
                  </div>
                </div>
                <div className="info-soli-home2">
                  <textarea disabled>{cardSelecionado.descricao}</textarea>
                </div>
                <div className="campos-detalhes-solicitacao3">
                  <label>Anexos:</label>
                  {/* Mapeie os anexos e exiba os nomes dos arquivos */}
                  {cardSelecionado.anexos.map((anexo, index) => (
                    <p key={index}>{anexo.name}</p>
                  ))}
                </div>
                <div className="info-soli-home3">
                  <div className="option-botao-soli1">
                    <button
                      onClick={handleExcluir}
                      className="finalizar-excluir-button"
                    >
                      EXCLUIR
                    </button>
                  </div>
                  {cardSelecionado.status === "emAtendimento" && (
                    <div className="option-botao-soli2">
                      <button onClick={handleFinalizar}>FINALIZAR</button>
                    </div>
                  )}
                  <div className="option-botao-soli3">
                    {cardSelecionado.status === "pendente" && (
                      <button onClick={handleAtender}>ATENDER</button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SolicitacaoTela;
