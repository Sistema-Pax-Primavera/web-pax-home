import React, { useEffect, useState } from 'react';
import Manutencao from "../../../assets/svg/manutencao.svg";
import "./em-desenvolvimento.css";

const Desenvolvimento = ({ tela }) => {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => {
                switch (prevDots) {
                    case '.':
                        return '..';
                    case '..':
                        return '...';
                    default:
                        return '.';
                }
            });
        }, 400); // Altera a cada 500ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <img
                    src={Manutencao}
                    alt="Manutencao"
                    style={{ width: '80%', height: '80%' }}
                />
                <h3>{tela} em desenvolvimento. Aguarde<span className="dots">{dots}</span></h3>
            </div>
        </div>
    )
}

export default Desenvolvimento;
