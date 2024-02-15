import React, { useState } from 'react';
import './solicitacao.css';
import Modal from 'react-modal';
function SolicitacaoTela() {
    const [cards, setCards] = useState([]);
    const [formularioVisivel, setFormularioVisivel] = useState(false);
    const [cardSelecionado, setCardSelecionado] = useState(null);
    const [contadorPendentes, setContadorPendentes] = useState(0);
    const [contadorAtendimento, setContadorAtendimento] = useState(0);
    const [contadorFinalizada, setContadorFinalizada] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoSolicitacao, setTipoSolicitacao] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

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
            descricao: descricao,
            status: 'pendente',
            usuario: 'ADMIN',
            data: new Date(),
            userResponsavel: null,
            dataFinalizada: null,
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
            const updatedCards = cards.filter((card) => card.id !== cardSelecionado.id);
            setCards(updatedCards);
            if (cardSelecionado.status === 'pendente') {
                setContadorPendentes(contadorPendentes - 1);
            } else if (cardSelecionado.status === 'emAtendimento') {
                setContadorAtendimento(contadorAtendimento - 1);
            } else if (cardSelecionado.status === 'finalizado') {
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
            const usuarioAtendimento = 'Usuário Atendente'; // Substitua pelo usuário real que atendeu
            const updatedCards = cards.map((card) =>
                card.id === cardSelecionado.id ? { ...card, status: 'emAtendimento', userResponsavel: usuarioAtendimento } : card
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
                card.id === cardSelecionado.id ? { ...card, status: 'finalizado', dataFinalizada: dataFinal } : card
            );
            setCards(updatedCards);
            setContadorAtendimento(contadorAtendimento - 1);
            setContadorFinalizada(contadorFinalizada + 1);
            // Feche o formulário
            setFormularioVisivel(false);
            setCardSelecionado(null);
        }
    };

    const pendentes = cards.filter((card) => card.status === 'pendente');
    const emAtendimento = cards.filter((card) => card.status === 'emAtendimento');
    const finalizadas = cards.filter((card) => card.status === 'finalizado');

    return (
        <div className="solicitacao-tela">
            <div className="opcoes">
                <button onClick={openModal}>Enviar Solicitação</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Enviar Solicitação"
            >
                <h2>Enviar Solicitação</h2>
                <select onChange={(e) => setTipoSolicitacao(e.target.value)}>
                    <option value="">Escolha o tipo de solicitação</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="cobrança">Cobrança</option>
                    <option value="manutencao">Manutenção</option>
                </select>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <button onClick={handleEnviarSolicitacao}>Enviar</button>
                <button onClick={closeModal}>Cancelar</button>
            </Modal>
            <div className="cards-container">
                <div className="column">
                    <h3>Pendentes <span>{contadorPendentes}</span></h3>
                    {pendentes.map((card) => (
                        <div
                            key={card.id}
                            className="card"
                            onClick={() => handleCardClique(card.id)}
                        >
                            <p>Tipo: {card.tipo}</p>
                            <p>Usuário: {card.usuario}</p>
                            <p>Data: {card.data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>

                        </div>
                    ))}
                </div>
                <div className="column">
                    <h3>Em Atendimento <span>{contadorAtendimento}</span></h3>
                    {emAtendimento.map((card) => (
                        <div
                            key={card.id}
                            className="card"
                            onClick={() => handleCardClique(card.id)}
                        >
                            <p>Tipo: {card.tipo}</p>
                            <p>Usuário: {card.usuario}</p>
                            <p>Data: {card.data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
                            <p>Usuario responsavel: {card.userResponsavel}</p>
                        </div>
                    ))}
                </div>
                <div className="column">
                    <h3>Finalizadas <span>{contadorFinalizada}</span></h3>
                    {finalizadas.map((card) => (
                        <div
                            key={card.id}
                            className="card"
                            onClick={() => handleCardClique(card.id)}
                        >
                            <p>Tipo: {card.tipo}</p>
                            <p>Usuário: {card.usuario}</p>
                            <p>Data: {card.data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
                            <p>Data de Finalização: {card.dataFinalizada.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
                        </div>
                    ))}
                </div>
            </div>
            {formularioVisivel && (
                <div className="formulario-flutuante">
                    <h2>Detalhes da Solicitação</h2>
                    {/* Renderize as informações do card selecionado aqui */}
                    <button onClick={handleExcluir} className="finalizar-excluir-button">Excluir</button>
                    <button onClick={handleFinalizar} className="finalizar-excluir-button">Finalizar</button>
                    <button onClick={handleFecharFormulario} className="fechar-button">Fechar</button>
                    {cardSelecionado && cardSelecionado.status === 'pendente' && (
                        <button onClick={handleAtender} className="atender-button">Atender</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default SolicitacaoTela;
