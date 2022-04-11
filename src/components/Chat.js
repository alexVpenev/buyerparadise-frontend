import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import "../componentsStyle/Chat.css";
// Set the backend location
const ENDPOINT = "http://localhost:8080/ws";

function App() {

  const [stompClient, setStompClient] = useState(null);
  const [msgToSend, setSendMessage] = useState("Enter your message here!");
  const [msgReceived, setReceivedMessage] = useState("Your Messages:");


  useEffect(() => {
    // use SockJS as the websocket client
    const socket = SockJS(ENDPOINT);

    // Set stomp to use websockets
    const stompClient = Stomp.over(socket);

    // connect to the backend
    stompClient.connect({}, () => {
      //subscribe to the backend
      stompClient.subscribe('/topic/greetings', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      stompClient.subscribe('/topic/broadcast', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    });

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, []);

  // send the data using Stomp
  function sendMessage() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': msgToSend}));
  }

  // disconnect from Stomp
  function disconnect() {
    stompClient.disconnect();
  }

    // connect with Stomp
  function connect() {

      console.log(stompClient);
        // connect to the backend
        stompClient.connect({}, () => {
            // subscribe to the backend
            stompClient.subscribe('/topic/greetings', (data) => {
                console.log(data);
                onMessageReceived(data);
            });

            stompClient.subscribe('/topic/broadcast', (data) => {
                console.log(data);
                onMessageReceived(data);
            });
         });
  }

  // display the received data
  function onMessageReceived(data) {
    const result=  JSON.parse(data.body);
    // alert(result.content);
    setReceivedMessage(result.content);
  }

  //TODO, add a solution for disconnection

  return (
      <div className="App">
          <div >
          <textarea className="receivedMessages" value={msgReceived} readOnly/>
          </div>
          <div className="sendMessage" >
          <input className='sendMessage-input' onChange={(event) => setSendMessage(event.target.value)}/>
          <button onClick={sendMessage}>Send Message</button>
          </div>
          <br/>
          <button onClick={connect}>Connect</button>
          <button  onClick={disconnect}>Disconnect</button>
      </div>
  );
}

export default App;