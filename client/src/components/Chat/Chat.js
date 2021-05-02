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
    
    return (
        <div className="outerContainer">
          <div className="container">
              In Room
              {/* <InfoBar room={room} />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
          </div>
          {/* <TextContainer users={users}/> */}
        </div>
      );
};

export default Chat;