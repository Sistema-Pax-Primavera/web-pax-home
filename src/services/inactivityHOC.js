import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InactivityHOC = (WrappedComponent) => {
    const navigate = useNavigate();
    return (props) => {
        const [lastActivity, setLastActivity] = useState(() => {
            const storedActivity = localStorage.getItem("ultimoAcesso");
            return storedActivity ? new Date(storedActivity) : new Date();
        });

        const handleUserActivity = () => {
            const currentTime = new Date();
            setLastActivity(currentTime);
            localStorage.setItem("ultimoAcesso", currentTime.toISOString());
        };

        const handleUserInactivity = () => {
            // Logout do usuário após 10 minutos de inatividade
            // Você pode personalizar isso conforme necessário
            //console.log("Usuário inativo por 10 minutos. Executando logout...");
            // Limpar o localStorage
            localStorage.clear();
            // Redirecionar para a tela de login
            navigate("/login");
        };

        useEffect(() => {
            // Adicionar ouvintes de eventos para atividade e inatividade do usuário
            window.addEventListener("mousemove", handleUserActivity);
            window.addEventListener("keypress", handleUserActivity);

            // Definir um temporizador para verificar a inatividade a cada minuto
            const inactivityTimer = setInterval(() => {
                const currentTime = new Date();
                const timeDiff = currentTime - lastActivity;
                //console.log(timeDiff.toString());
                const inactivityTimeout = 25 * 60 * 1000;

                if (timeDiff > inactivityTimeout) {
                    handleUserInactivity();
                }
            }, 10000); // Verificar a inatividade a cada minuto

            // Remover os ouvintes de eventos e limpar o temporizador ao desmontar o componente
            return () => {
                window.removeEventListener("mousemove", handleUserActivity);
                window.removeEventListener("keypress", handleUserActivity);
                clearInterval(inactivityTimer);
            };
        }, [lastActivity]);

        return <WrappedComponent {...props} />;
    };
};

export default InactivityHOC;
