import { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

const useWebSocketContext = () => useContext(WebSocketContext);

const WSContextProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    setWs(socket);

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
      setNotifications((prev) => [...prev, { type: "message", data }]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (msg) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  };

  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    setIsModalOpen(true);
  };

  const values = { ws, messages, sendMessage, notifications, openChat };

  return (
    <WebSocketContext.Provider value={values}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { useWebSocketContext, WSContextProvider };
