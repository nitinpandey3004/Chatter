import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chat.css';
import InfoBar from "./../InfoBar/InfoBar";
import Input from "./../Input/Input";
import Messages from "./../Messages/Messages";
import TextContainer from "./../TextContainer/TextContainer";
import ChatHelper from './ChatHelper.js';
import useToken from "../../helpers/useToken";
import '../../../node_modules/jquery.nicescroll/dist/jquery.nicescroll.js';

let socket;
const ENDPOINT = 'http://localhost:4000/';

const Chat = ({location}) => {
    const { token, getData } = useToken();
    const [roomId, setRoomId] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { roomId } = queryString.parse(location.search);

        socket = io(ENDPOINT, {
            rememberUpgrade: true
        });

        setRoomId(roomId);

        socket.emit('join', { token, roomId }, (error) => {
            if(error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);
    
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    
    // return (
    //     <div className="outerContainer">
    //       <div className="container">
    //           {/* <InfoBar room={room} />
    //           <Messages messages={messages} name={name} /> */}
    //           {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
    //       </div>
    //       {/* <TextContainer users={users}/> */}
    //     </div>
    // );

    // https://www.bootdey.com/snippets/view/facebook-messenger-chat

    return (
        <div>
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
          <div className="container">
            <div className="content container-fluid bootstrap snippets bootdey">
              <div className="row row-broken">
                
                <div className="col-sm-12 col-xs-12 chat" style={{overflow: 'auto', outline: 'none'}} tabIndex={5001}>
                  <div className="col-inside-lg decor-default">
                    <div className="chat-body">
                      <h6>Mini Chat</h6>
                      <Messages messages={messages} userId={getData('userId')} />
                      <div className="answer-add" style={{ outline: 'none'}}>
                        {/* <input autoFocus placeholder="Write a message" style={{ outline: 'none'}} />
                        <span className="answer-btn answer-btn-1" />
                        <span className="answer-btn answer-btn-2" /> */}
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

};

export default Chat;