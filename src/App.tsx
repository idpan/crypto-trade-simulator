import React, { useState, useEffect, useRef } from 'react';

export default function WebSocketComponent() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('Disconnected');
  
  // Use useRef to persist the socket instance without triggering re-renders
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Initialize the WebSocket connection
    const socket: any = new WebSocket('wss://echo.websocket.events');
    socketRef.current = socket;

    // 2. Event Listener: Connection Opened
    socket.onopen = () => {
      setStatus('Connected');
      console.log('WebSocket Connected');
    };

    // 3. Event Listener: Message Received
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    // 4. Event Listener: Connection Closed
    socket.onclose = () => {
      setStatus('Disconnected');
      console.log('WebSocket Disconnected');
    };

    // 5. Cleanup: Close socket when component unmounts
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(inputValue);
      setInputValue('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Status: {status}</h2>
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      
      <h3>Messages:</h3>
      <ul>
        {messages.map((msg, index) => <li key={index}>{msg}</li>)}
      </ul>
    </div>
  );
}
