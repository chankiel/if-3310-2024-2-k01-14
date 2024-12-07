import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../contexts/SocketContext";
import { useParams, useNavigate } from "react-router-dom";
import { ChatFormat, UserFormat } from "../../types";
import ChatApi from "../../api/chat-api";
import { useAuth } from "../../contexts/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "../../components";
import BubbleChat from "../../components/Chat/BubbleChat";
import { PaperAirplaneIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

const Chat = () => {
  const { roomId } = useParams();
  const { socket } = useSocket();
  const { currentId, profile_photo } = useAuth();
  const [messages, setMessages] = useState<ChatFormat[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const [receiver, setReceiver] = useState<UserFormat>();
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        if (roomId) {
          const res = await ChatApi.getReceiver(roomId);
          const msg = await ChatApi.getMessages(roomId);
          setReceiver(res);
          setMessages(msg);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchReceiver();
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", roomId, currentId);
      socket.on("receiveMessage", (msg: string) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            from_id: Number(receiver?.id),
            message: msg,
            timestamp: new Date(),
            to_id: Number(currentId),
            room_id: Number(roomId),
          },
        ]);
      });
      socket.on("updateTyping", (isTyping: boolean) => {
        setIsTyping(isTyping);
        console.log("TYPING: ", isTyping);
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveMessage");
      }
    };
  }, [socket]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowScrollButton(!entry.isIntersecting);
      },
      {
        threshold: 1.0,
      }
    );

    const currentRef = messagesEndRef.current;
    if (currentRef) observer.current.observe(currentRef);

    return () => {
      if (currentRef && observer.current)
        observer.current.unobserve(currentRef);
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && newMessage.trim() !== "") {
      socket.emit("sendMessage", currentId, receiver?.id, roomId, newMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          from_id: Number(currentId),
          message: newMessage,
          timestamp: new Date(),
          to_id: Number(receiver?.id),
          room_id: Number(roomId),
        },
      ]);
      setNewMessage("");
      socket.emit("sendTyping", roomId, false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) return null;

  return (
    <>
      <Sidebar />
      <section className="h-[calc(100vh-140px)] relative flex flex-col">
        <div className="flex items-center p-5 gap-3 border-b-2 border-linkin-gray-border">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <Avatar className="h-12 w-12 md:h-16 md:w-16">
            <AvatarImage src={receiver?.profile_photo ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold ml-2">{receiver?.username}</h1>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto md:p-5 p-2">
          {messages.map((msg, index) => {
            const currentDate = new Date(msg.timestamp);

            const previousDate =
              index > 0 ? new Date(messages[index - 1].timestamp) : null;
            const isDifferentDay = previousDate
              ? currentDate.getDate() !== previousDate.getDate() ||
                currentDate.getMonth() !== previousDate.getMonth() ||
                currentDate.getFullYear() !== previousDate.getFullYear()
              : true;

            const isToday =
              currentDate.getDate() === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear();

            const formattedTime = `${currentDate
              .getHours()
              .toString()
              .padStart(2, "0")}:${currentDate
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;
            return (
              <div key={index}>
                {isDifferentDay && (
                  <div className="text-center text-sm text-gray-500">
                    {isToday ? "Today" : currentDate.toLocaleDateString()}
                  </div>
                )}
                <BubbleChat
                  date={formattedTime}
                  text={msg.message}
                  variant={msg.from_id === currentId ? "sent" : "received"}
                  profile_photo={
                    msg.from_id === currentId
                      ? profile_photo
                      : receiver?.profile_photo
                  }
                  showProfile={msg.from_id != messages[index - 1]?.from_id}
                />
              </div>
            );
          })}
          {isTyping && (
            <BubbleChat
              date={""}
              text={""}
              variant={"received"}
              profile_photo={receiver?.profile_photo}
              showProfile={true}
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="relative w-full flex md:flex-col p-5 border-t border-linkin-gray-border items-end">
          {showScrollButton && (
            <button
              className="absolute top-[-50%] right-2 bg-linkin-blue p-3 rounded-[10px] text-white"
              onClick={scrollToBottom}
            >
              <ArrowDownIcon width={20} height={20} />
            </button>
          )}
          <textarea
            className="py-3 px-6 w-full border border-gray-300 rounded-md resize-none no-scrollbar"
            value={newMessage}
            onChange={(e) => {
              if (
                e.target.value.length > 0 &&
                newMessage.length == 0 &&
                socket
              ) {
                socket.emit("sendTyping", roomId, true);
              }
              if (
                e.target.value.length == 0 &&
                newMessage.length > 0 &&
                socket
              ) {
                socket.emit("sendTyping", roomId, false);
              }
              setNewMessage(e.target.value);
            }}
            placeholder="Type a message..."
          />
          <button
            disabled={!newMessage.trim()}
            onClick={handleSendMessage}
            className={`ml-auto mt-2 px-5 py-2 font-bold rounded-[20px] ${
              newMessage.trim()
                ? "bg-linkin-blue hover:bg-linkin-dark-blue text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-300"
            }`}
          >
            <span>
              <PaperAirplaneIcon width={27} height={27} />
            </span>
            <span className="hidden">Send</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Chat;
