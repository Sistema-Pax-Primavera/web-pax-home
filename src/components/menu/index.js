// Index.js
import React from 'react';
import PropTypes from 'prop-types';
import './menu.css';

const Index = ({ manualLink, paxLink }) => {
    return (
        <div className="index-container">
            <div className="button-container">
                <a
                    href={manualLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                >
                    Clique aqui para acessar o manual do sistema
                </a>
            </div>

            <div className="button-container">
                <a
                    href={paxLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                >
                    Saiba mais sobre a Pax
                </a>
            </div>
        </div>
    );
};

Index.propTypes = {
    manualLink: PropTypes.string.isRequired,
    paxLink: PropTypes.string.isRequired,
};

export default Index;
