class WebSockets {
    users = [];
    connection(client) {
      console.log("User Connected");
      // event fired when the chat room is disconnected
      client.on("disconnect", () => {
        console.log("User disconnect");
        if(this.users) {
          this.users = this.users.filter((user) => user.socketId !== client.id);
        }
      });
      // add identity of user mapped to the socket id
      client.on("identity", (userId) => {
        this.users.push({
          socketId: client.id,
          userId: userId,
        });
      });
      // subscribe person to chat & other user as well
      client.on("subscribe", (room, otherUserId = "") => {
        console.log("User Subscribed : " + room);
        this.subscribeOtherUser(room, otherUserId);
        client.join(room);
      });
      // mute a chat room
      client.on("unsubscribe", (room) => {
        client.leave(room);
      });
      // receive message
      client.on('save-message', (data) => {
        console.log("Got data here: " + JSON.stringify(data));

        // send data to all
        io.emit('new-message', { message: data });
      });
    }
  
    subscribeOtherUser(room, otherUserId) {
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
      );
      userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);
        if (socketConn) {
          socketConn.join(room);
        }
      });
    }
  }
  
  export default WebSockets;