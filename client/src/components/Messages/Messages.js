import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, userId }) => {
  console.log(messages);
  return (
  
    <ScrollToBottom className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message} userId={userId}/></div>)}
    </ScrollToBottom>
  )
};

export default Messages;