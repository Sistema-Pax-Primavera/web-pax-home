import React from 'react';
import './new-ticker.css';
import ChatPax from "../../../assets/png/chat-pax.png";
import Manual from "../../../assets/png/manual.png";
import Site from "../../../assets/png/site.png"
import noticia1 from "../../../assets/png/exemploNoticia1.png";
import noticia2 from "../../../assets/png/exemploNoticia2.png";
import { Slide } from "react-slideshow-image";

const Noticias = ({ }) => {

    const slideImages = [ChatPax, noticia1, Manual, noticia2, Site];

    return (
        <div className="slide-noticias">
            <div className="slide-container">
                <Slide indicators={true}>
                    {slideImages.map((each, index) => (
                        <div key={index} className="each-slide">
                            <div
                                style={{ backgroundImage: `url(${each})` }}
                            />
                        </div>
                    ))}
                </Slide>
            </div>
        </div>
    );
};

export default Noticias;
