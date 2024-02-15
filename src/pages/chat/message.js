import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import './chat.css';

const Message = ({ message, isYou }) => {
    moment.locale('pt-br');

    const messageClass = isYou ? 'you' : 'other';

    return (
        <div className={`message-container ${messageClass}`}>
            <div className={`message ${messageClass}`}>
                {message && message.text && (
                    <>
                        <div className="message-text">{message.text}</div>
                        <div className="message-timestamp">
                            {message.timestamp && moment(message.timestamp).format('LLL')}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Message;
