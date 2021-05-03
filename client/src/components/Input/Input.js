import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form form-inline">
    <div className="group" style={{width:'90%'}}>
    <input
      autoFocus
      className="input "
      type="text"
      style={{ outline: 'none'}}
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    </div>
    <button className="sendButton btn btn-primary mb-1" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;