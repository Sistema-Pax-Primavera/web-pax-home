import React, { useEffect, useState } from 'react';
import ButtonText from '../button-texto';
import { useNavigate } from 'react-router-dom';

const ErrorComponent = ({ message, errorCode }) => {
    const [titulo, setTitulo] = useState('');
    const navigate = useNavigate();


    const Redirecionar = () => {
        if (errorCode == 500) {
            localStorage.clear();
            navigate("/login");
        } else {
            window.location.reload();
        }
    };

    useEffect(() => {
        if (errorCode == 500) {
            setTitulo('Voltar')
        } else {
            setTitulo('Recarregar Tela')
        }
    }, [errorCode]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Erro {errorCode}</h2>
            <p>{message}</p>
            <ButtonText title={titulo} funcao={() => Redirecionar()} />
        </div>
    );
};

export default ErrorComponent;
