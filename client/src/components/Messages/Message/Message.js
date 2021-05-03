import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, userId: messageUserId, user }, userId }) => {
  let isSentByCurrentUser = false;

  const trimmedName = user.trim().toLowerCase();

  // if(user === trimmedName) {
  //   isSentByCurrentUser = true;
  // }

  if(messageUserId == userId) {
    isSentByCurrentUser = true;
  }

  // return (
  //   isSentByCurrentUser
  //     ? (
  //       <div className="messageContainer justifyEnd">
  //         <p className="sentText pr-10">{trimmedName}</p>
  //         <div className="messageBox backgroundBlue">
  //           <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
  //         </div>
  //       </div>
  //       )
  //       : (
  //         <div className="messageContainer justifyStart">
  //           <div className="messageBox backgroundLight">
  //             <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
  //           </div>
  //           <p className="sentText pl-10 ">{user}</p>
  //         </div>
  //       )
  // );

  return (
    isSentByCurrentUser
      ? (
        <div className="answer right">
          <div className="avatar">
            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="User name" />
            <div className="status online" />
          </div>
          <div className="name">{trimmedName}</div>
          <div className="text">{ReactEmoji.emojify(text)}</div>
          <div className="time">5 min ago</div>
        </div>
        )
        : (
          <div className="answer left">
          <div className="avatar">
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="User name" />
            <div className="status online" />
          </div>
          <div className="name">{user}</div>
          <div className="text">{ReactEmoji.emojify(text)}</div>
          <div className="time">5 min ago</div>
        </div>
        )
  );
}

export default Message;