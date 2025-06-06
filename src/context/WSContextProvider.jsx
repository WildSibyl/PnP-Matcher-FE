import { createContext, useContext, useEffect, useState, useRef } from "react";
import { getChatMessages } from "../data/chat";
import { useAuth } from "../hooks/useAuth";

export const WebSocketContext = createContext(null);
export const useWebSocketContext = () => useContext(WebSocketContext);

export const WSContextProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  // Notifications will be an object: { chatId: countOfUnreadMessages }
  const [notifications, setNotifications] = useState({});
  const [fetched, setFetched] = useState(false);

  const [activeChatId, setActiveChatId] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();

  // To access latest user and active chat inside WS listener
  const userRef = useRef();
  const activeChatIdRef = useRef();
  const isChatModalOpenRef = useRef();
  const totalUnreadCount = Object.values(notifications).reduce(
    (sum, count) => sum + count,
    0
  );
  const totalInvitesCount = user?.invites?.length || 0;

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);

  useEffect(() => {
    isChatModalOpenRef.current = isChatModalOpen;
  }, [isChatModalOpen]);

  useEffect(() => {
    if (authLoading || !user?._id) return;

    const socket = new WebSocket(
      `${import.meta.env.VITE_APP_PLOT_HOOK_WS_URL}`
    );
    setWs(socket);

    const fetchInitialMessages = async () => {
      try {
        const msgs = await getChatMessages();
        setMessages(msgs);
        setFetched(true);
        console.log("Initial messages fetched:", msgs);
        console.log(user, "WebSocket connection established");
      } catch (err) {
        console.error("Failed to fetch initial messages:", err);
        setFetched(true);
      }
    };

    fetchInitialMessages();

    socket.addEventListener("message", async (event) => {
      try {
        const text = await event.data.text();
        const data = JSON.parse(text);
        console.log("WebSocket received:", data);

        // Add message to state
        setMessages((prev) => [...prev, data]);

        const currentUserId = userRef.current?._id;
        const isFromMe = data.sender === currentUserId;
        const currentActiveChatId = activeChatIdRef.current;
        const chatModalOpen = isChatModalOpenRef.current;

        // If message is from others and chat is not currently open, update notifications
        if (
          !isFromMe &&
          (data.chatId !== currentActiveChatId || !chatModalOpen)
        ) {
          setNotifications((prev) => ({
            ...prev,
            [data.chatId]: (prev[data.chatId] || 0) + 1,
          }));
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    });

    return () => {
      socket.close();
    };
  }, [authLoading, user?._id]);

  // Clear notifications for a chat when user opens it
  const clearNotifications = (chatId) => {
    setNotifications((prev) => {
      if (!prev[chatId]) return prev; // no notifications for this chat

      const updated = { ...prev };
      delete updated[chatId];
      return updated;
    });
  };

  // When user opens a chat (could be used externally)
  useEffect(() => {
    if (activeChatId && isChatModalOpen) {
      clearNotifications(activeChatId);
    }
  }, [activeChatId, isChatModalOpen]);

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
    activeChatId,
    setActiveChatId,
    isChatModalOpen,
    setIsChatModalOpen,
    clearNotifications,
    totalUnreadCount,
    totalInvitesCount,
  };

  return (
    <WebSocketContext.Provider value={values}>
      {children}
    </WebSocketContext.Provider>
  );
};
