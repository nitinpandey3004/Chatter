import { useState } from 'react';

export default function useToken() {

  const getData = (key) => {
    const tokenString = localStorage.getItem('token');
    const userData = JSON.parse(tokenString);
    console.log(userData);
    if(userData) {
      return userData[key];
    }
  }

  const getToken = () => {
    return getData('authToken');
  };

  const [token, setToken, setData] = useState(getData());  

  const saveToken = (userToken) => {
    console.log(userToken);
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const saveData = (data) => {
    console.log("Setting data: " + JSON.stringify(data));
    if(data) {
      localStorage.setItem('token', JSON.stringify(data));
      // setData(data);
    }
  }

  const clearData = (data) => {
    localStorage.removeItem('token');
  }

  return {
    setToken: saveToken,
    setData: saveData,
    token: getToken(),
    saveData,
    getData,
    clearData,
  }
}