import { useEffect, useState, useRef } from "react";
import socket from "../api/socket";
import { useAuth } from "../auth/AuthProvider";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

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

    socket.on("chat:joined", () => {});

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
        setMessages(res?.data?.messages || []);
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
    <div className="flex flex-col h-full max-h-screen bg-white border border-gray-200 rounded-xl overflow-hidden md:m-4 m-2">
      {/* Header */}
      <div className="p-4 sticky top-0 z-10 flex items-center gap-3 bg-gray-50 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-pink-700 flex items-center justify-center text-white text-lg shadow-sm">
          💬
        </div>
        <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
          Conversation
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
        {loading ? (
          <p className="text-center text-gray-500 text-sm">
            Loading messages...
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No messages yet</p>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.sender._id === user._id;
            return (
              <div
                key={msg._id}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-sm md:max-w-md text-sm shadow-sm transition ${
                    isOwnMessage
                      ? "bg-gray-700 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <div>{msg.content}</div>
                  <div
                    className={`text-[10px] mt-1 opacity-70 ${
                      isOwnMessage
                        ? "text-white/80 text-right"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-50 sticky bottom-0 z-10 border-t border-gray-200">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
