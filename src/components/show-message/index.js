import React, { useEffect, useState } from 'react';
import ButtonText from '../button-texto';
import { useNavigate } from 'react-router-dom';
import Error from "../../../assets/404.gif";

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
            <img
                src={Error}
                style={{ width: '30%', height: 'auto' }}
            />
            <p>{message}</p>
            <ButtonText title={titulo} funcao={() => Redirecionar()} />
        </div>
    );
};

export default ErrorComponent;
