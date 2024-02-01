// NewsTicker.js
import React, { useState, useEffect } from 'react';
import './new-ticker.css';

const NewsTicker = ({ news }) => {
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

    useEffect(() => {
        const tickerInterval = setInterval(() => {
            setCurrentNewsIndex((prevIndex) =>
                prevIndex === news.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000); // Reduzi o intervalo para tornar a rolagem mais rápida

        return () => clearInterval(tickerInterval);
    }, [news]);

    return (
        <div className="news-ticker-container">

            <div className="news-ticker">
                <div className="ticker-content">
                    {news.map((item, index) => (
                        <div key={index} className="ticker-item">
                            <h3 className="news-title">{item.title}</h3>
                            <p className="news-text">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default NewsTicker;
