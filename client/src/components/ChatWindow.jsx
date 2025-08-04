import { useEffect, useState, useRef } from "react";
import socket from "../api/socket";
import { useAuth } from "../auth/AuthProvider";
import { api } from "../api/api";
import toast from "react-hot-toast";

const ChatWindow = ({ chatRoomId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatRoomId) return;

    socket.connect();
    socket.emit("chat:join", chatRoomId);

    socket.on("chat:joined", () => {
      console.log("Joined room", chatRoomId);
    });

    socket.on("chat:error", (error) => {
      toast.error(error);
    });

    socket.on("chat:message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
      socket.off("chat:joined");
      socket.off("chat:error");
      socket.off("chat:message");
    };
  }, [chatRoomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/chat/${chatRoomId}/messages`, {
          withCredentials: true,
        });
        setMessages(res?.data?.message || []);
      } catch (err) {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [chatRoomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    socket.emit("chat:send", { roomId: chatRoomId, content: newMessage });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full max-h-screen bg-white rounded-xl shadow-lg border md:m-4 m-2">
      {/* Header */}
      <div className="p-4 border-b bg-white sticky top-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">
          💬
        </div>
        <h2 className="text-lg font-semibold">Conversation</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.sender._id === user._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-sm md:max-w-md text-sm shadow-md ${
                  msg.sender._id === user._id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div>{msg.content}</div>
                <div className="text-[10px] text-right mt-1 opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex items-center gap-2 bg-white sticky bottom-0 z-10">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleSend}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
