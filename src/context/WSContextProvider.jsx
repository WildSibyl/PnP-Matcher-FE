import { createContext, useContext, useEffect, useState } from "react";
import { getChatMessages } from "../data/chat";
import { useAuth } from "../hooks/useAuth";

export const WebSocketContext = createContext(null);

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WSContextProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [fetched, setFetched] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading || !user?._id) return;
    const socket = new WebSocket("wss://plothook-api.onrender.com");
    setWs(socket);

    const fetchInitialMessages = async () => {
      try {
        const msgs = await getChatMessages();
        setMessages(msgs);
        setFetched(true); // Mark as loaded
        console.log("Initial messages fetched:", msgs);
        console.log(user, "WebSocket connection established");
      } catch (err) {
        console.error("Failed to fetch initial messages:", err);
        setFetched(true); // Still mark fetched to avoid infinite loading
      }
    };

    fetchInitialMessages();

    socket.addEventListener("message", async (event) => {
      try {
        const text = await event.data.text();
        const data = JSON.parse(text);
        console.log("WebSocket received:", data);
        setMessages((prev) => [...prev, data]);
        setNotifications((prev) => [...prev, { type: "message", data }]);
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    });

    return () => socket.close();
  }, [authLoading, user?._id]);

  const sendMessage = (msg) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  };

  const values = {
    ws,
    messages,
    setMessages,
    sendMessage,
    notifications,
    fetched,
    setFetched,
    authLoading,
  };

  return (
    <WebSocketContext.Provider value={values}>
      {children}
    </WebSocketContext.Provider>
  );
};

//export { useWebSocketContext, WSContextProvider };
