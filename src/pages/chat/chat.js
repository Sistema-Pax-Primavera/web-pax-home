import React, { useState } from 'react';
import Message from './Message';
import './chat.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import { faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatPax from '../../../assets/png/chat-pax.png'
import ChatIcon from '@mui/icons-material/Chat';

const PageChat = () => {
    moment.locale('pt-br');
    const contacts = ['Mateus', 'Giovane', 'Marcos'];
    const [selectedContact, setSelectedContact] = useState(null);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([
                ...messages,
                {
                    author: 'Você',
                    text: inputMessage,
                    timestamp: moment(),
                },
            ]);
            setInputMessage('');
        }
    };

    return (
        <div className="page-chat-container">
            <div className="contacts-container">
                <h1><ChatIcon fontSize='small' /> Conversas</h1>
                <ul>
                    {contacts.map((contact, index) => (
                        <li
                            key={index}
                            onClick={() => handleContactClick(contact)}
                            className={selectedContact === contact ? 'selected' : ''}
                        >
                            <FontAwesomeIcon icon={faUser} className="user-icon" />
                            <span className="contact-name">{contact}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedContact ? (
                <div className="chat-container">
                    <div className="chat-header">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                        {selectedContact}
                    </div>
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <Message key={index} message={message} isYou={message.author === 'Você'} />
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Digite a mensagem..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button><FontAwesomeIcon
                            icon={faPaperPlane}
                            className="send-icon"
                            onClick={handleSendMessage}
                        /></button>
                    </div>
                </div>
            ) : (
                <div className="start-conversation-container">
                    <img src={ChatPax} alt="Atendimento2" />
                    <h1 className="start-conversation-text">Inicie uma conversa!</h1>
                </div>
            )}
        </div>
    );
};

export default PageChat;
