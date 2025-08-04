import ChatWindow from "../components/ChatWindow";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { chatRoomId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-2 sm:p-4">
      <div className="w-full max-w-4xl h-[80vh]">
        <ChatWindow chatRoomId={chatRoomId} />
      </div>
    </div>
  );
};

export default ChatPage;
