import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import './Mensagem.css'; // Estilo personalizado
import $ from 'jquery'; // Importando o jQuery

function Mensagem() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null);

  const fetchMessages = () => {
    $.ajax({
      url: `http://localhost:5000/receber_mensagens?pk_usuario=${3}`,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        setMessages(data);
      },
      error: function (xhr, status, error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      $.ajax({
        url: 'http://localhost:5000/enviar_mensagem',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          conteudo: message,
          pk_emissor: 3,
          pk_receptor: 2
        }),
        success: function () {
          fetchMessages(); // Atualiza as mensagens após enviar uma nova mensagem
          setMessage('');
        },
        error: function (xhr, status, error) {
          console.error('Erro ao enviar mensagem:', error);
        }
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const isImageUrl = (url) => {
    return url && url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <ScrollPanel style={{ width: '100%', height: 'calc(100% - 70px)' }}>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className={msg.pk_emissor === 3 ? 'sent' : 'received'}>
                {msg.conteudo && isImageUrl(msg.conteudo) ? (
                  <img src={msg.conteudo} alt="imagem da mensagem" style={{ maxWidth: '100%' }} />
                ) : (
                  msg.conteudo
                )}
              </li>
            ))}
            <div ref={endOfMessagesRef}></div>
          </ul>
        </ScrollPanel>
      </div>
      <div className="chat-input">
        <InputText
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite uma mensagem ou URL de imagem..."
          className="p-inputtext"
        />
        <Button icon="pi pi-send" onClick={sendMessage} />
      </div>
    </div>
  );
}

export default Mensagem;
