const users = [];

export const addUser = ({ id, name, room, email, userId }) => {
  if(!name || !room) return { error: 'Username and room are required.' };
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.userId === userId);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room, email, userId };

  users.push(user);

  return { user };
}

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

export const getUser = (id) => users.find((user) => user.id === id);

export const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// export default { addUser, removeUser, getUser, getUsersInRoom };