import { addUser, removeUser, getUser, getUsersInRoom } from "./../tempUsers.js";
import {decodeToken} from "./../middlewares/jwt.js";
class WebSockets {
    users = [];
    connection(client) {
      console.log("User Connected");
      client.on('join', async ({ token, roomId }, callback) => {

        const {name, email, userId} = await decodeToken(token);
        console.log(token + "  " + roomId);
        const { error, user } = addUser({ id: client.id, name, room: roomId });
    
        if(error) {
          return callback(error)
        }
    
        client.join(user.room);
    
        client.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        client.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    
        global.io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
        callback();
      });
    
      client.on('sendMessage', (message, callback) => {
        const user = getUser(client.id);
        if(user) {
          global.io.to(user.room).emit('message', { user: user.name, text: message });
        }
    
        callback();
      });
    
      client.on('disconnect', () => {
        const user = removeUser(client.id);
    
        if(user) {
          global.io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          global.io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
      });

      client


    //   // event fired when the chat room is disconnected
    //   client.on("disconnect", () => {
    //     console.log("User disconnect");
    //     if(this.users) {
    //       this.users = this.users.filter((user) => user.socketId !== client.id);
    //     }
    //   });
    //   // add identity of user mapped to the socket id
    //   client.on("identity", (userId) => {
    //     this.users.push({
    //       socketId: client.id,
    //       userId: userId,
    //     });
    //   });
    //   // subscribe person to chat & other user as well
    //   client.on("subscribe", (room, otherUserId = "") => {
    //     console.log("User Subscribed : " + room);
    //     this.subscribeOtherUser(room, otherUserId);
    //     client.join(room);
    //   });
    //   // mute a chat room
    //   client.on("unsubscribe", (room) => {
    //     client.leave(room);
    //   });
    //   // receive message
    //   client.on('save-message', (data) => {
    //     console.log("Got data here: " + JSON.stringify(data));

    //     // send data to all
    //     io.emit('new-message', { message: data });
    //   });
    // }
  
    // subscribeOtherUser(room, otherUserId) {
    //   const userSockets = this.users.filter(
    //     (user) => user.userId === otherUserId
    //   );
    //   userSockets.map((userInfo) => {
    //     const socketConn = global.io.sockets.connected(userInfo.socketId);
    //     if (socketConn) {
    //       socketConn.join(room);
    //     }
    //   });
    }
  }
  
  export default WebSockets;