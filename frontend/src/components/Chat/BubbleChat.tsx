import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface BubbleChatProps {
  date: string;
  text: string;
  variant: "sent" | "received";
  chatRef?: React.Ref<HTMLDivElement> | null;
  profile_photo?: string | null;
  showProfile: boolean;
}

const BubbleChat: React.FC<BubbleChatProps> = ({
  date,
  text,
  variant,
  chatRef,
  profile_photo,
  showProfile,
}) => {
  return (
    <div
      className={`flex items-end gap-2 my-2 ${
        variant === "sent" ? "flex-row-reverse" : ""
      }`}
      ref={chatRef ?? null}
    >
      {showProfile && text? (
        <Avatar className="h-10 w-10">
          <AvatarImage src={profile_photo ?? ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <div className="h-10 w-10"></div>
      )}
      <div
        className={`relative max-w-[70%] p-3 rounded-[20px] text-sm ${
          variant === "sent"
            ? "bg-linkin-sent-chat self-end"
            : "bg-gray-200 text-gray-700 self-start"
        }`}
      >
        <div className="text-md break-words">{text}</div>
        {!text && <div className="loader my-1"></div>}
      </div>
      <div
        className={`text-xs text-opacity-75 ${
          variant === "sent" ? "text-right" : "text-left"
        }`}
      >
        {date}
      </div>
    </div>
  );
};

export default BubbleChat;
