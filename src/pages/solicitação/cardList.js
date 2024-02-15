import React from 'react';

function CardList({ solicitacoes, onCardClick }) {
    return (
        <div className="card-list">
            {solicitacoes.map((solicitacao, index) => (
                <div className="card" key={index} onClick={() => onCardClick(solicitacao)}>
                    <h3>{solicitacao.tipo}</h3>
                    <p>Enviado por: {solicitacao.user}</p>
                    <p>Unidade: {solicitacao.unidade}</p>
                    <p>Data e Hora: {solicitacao.dataHora}</p>
                </div>
            ))}
        </div>
    );
}

export default CardList;
