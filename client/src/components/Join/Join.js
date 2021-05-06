import React, {useState} from "react";
import {useHistory} from 'react-router-dom';

import Constant from '../../config/index';
import useToken from "../../helpers/useToken";
import './Join.css';

// const Join = () => {
//     const [name, setName] = useState("");
//     const [room, setRoom] = useState("");
//     return (
//         <div className="joinOuterContainer">
//             <div className="joinInnerContainer">
//                 <h1 className="heading">Join</h1>
//                 <div>
//                     <input 
//                         placeholder="Name" 
//                         className="joinInput" 
//                         type="text" 
//                         onChange={(event) => setName(event.target.value)} 
//                     />
//                 </div>
//                 <div>
//                     <input 
//                         placeholder="Room" 
//                         className="joinInput mt-20" 
//                         type="text" 
//                         onChange={(event) => setRoom(event.target.value)} 
//                     />
//                 </div>
//                 <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
//                     <button className={'button mt-20'} type="submit">Start Chat</button>
//                 </Link>
//             </div>
//         </div>
//     )
// };

const joinRoom = async (data, token) => {
    return fetch(`${Constant.SERVER_URL}/room/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      .then(data => data.json())
}

const Join = () => {

    const { token, getData } = useToken();

    const [room, setRoom] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Haha " + getData("userId"));
        try {
            const data = await joinRoom({
                userIds: [getData("userId")],
                type: "consumer-to-consumer",
                name: room,
            }, token);
            history.push(`/Chat?roomId=${data['chatRoom']['chatRoomId']}`);
        } catch(e) {
            alert(e.message);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Join</h3>

            {/* <div className="form-group">
                <label>Name</label>
                <input type="email" className="form-control" 
                placeholder="Enter email" 
                onChange={(event) => setName(event.target.value)}
                />
            </div> */}

            <div className="form-group">
                <label>Room</label>
                <input type="text" className="form-control" 
                placeholder="Enter Room Name" 
                onChange={(event) => setRoom(event.target.value)} 
                />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    {/* <label className="custom-control-label" htmlFor="customCheck1">Remember me</label> */}
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="forgot-password text">
                <a href="/sign-up">Sign Up?</a>
            </p>
        </form>
    );
}


export default Join;