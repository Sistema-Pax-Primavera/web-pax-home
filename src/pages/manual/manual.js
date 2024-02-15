import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './manual.css';
import { useNavigate } from 'react-router-dom';
import Logo from "../../../assets/logo-pax-verde.svg";
import Recebimento from "../../../assets/dinheiro.png";
import Chat from "../../../assets/chat-pax.png";
import Atendimento from "../../../assets/atendimento.png";
import Solicitação from "../../../assets/atendimento2.png";

const manualData = [
    {
        title: 'Bem-vindo ao Manual do Sistema!',
        message: 'Aqui estão algumas instruções importantes...',
        image: Logo,
    },
    {
        title: 'Como usar o Recebimento..',
        message: 'Descrição sobre como usar o recebimento...',
        image: Recebimento,
    },
    {
        title: 'Como usar o Chat..',
        message: 'Descrição sobre como usar o chat...',
        image: Chat,
    },
    {
        title: 'Como usar a Central de Solicitação..',
        message: 'Descrição sobre como usar a Central de Solicitação...',
        image: Solicitação,
    },
    {
        title: 'Como usar a Central de Atendimento..',
        message: 'Descrição sobre como usar a Central de Atendimento...',
        image: Atendimento,
    },
];


const ManualScreen = () => {
    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState("");

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleMenuClick = (route) => {
        // Navegar para a rota específica
        navigate(route);
        // Salvar a rota no localStorage
        localStorage.setItem("page", route);
        // Atualizar a rota ativa
        setActiveRoute(route);
    };

    return (
        <div className="manual-screen">
            <Slider {...settings}>
                {manualData.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${slide.image ? 'slide-image' : 'slide-text'}`}
                    >
                        {slide.image ? (
                            <>
                                <h2>{slide.title}</h2>
                                <p>{slide.message}</p>
                                <img
                                    src={slide.image}
                                    alt={`Slide ${index}`}
                                    style={{ width: '40%', height: '10%' }}
                                />
                            </>
                        ) : (
                            <>
                                <h2>{slide.title}</h2>
                                <p>{slide.message}</p>
                            </>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ManualScreen;
