import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib/utils";
import { API_PHOTO } from "../../constant";

type InboxCardProps = {
  username: string;
  profile_photo: string | null;
  room_id: number;
  last_message: string | null;
  isLastSender: boolean;
  updated_at: Date;
  isFirst: boolean;
};

const InboxCard = ({
  username,
  profile_photo,
  room_id,
  last_message,
  isLastSender,
  updated_at,
  isFirst,
}: InboxCardProps) => {
  return (
    <Link
      to={`/chat/${room_id}`}
      className={`flex p-5 items-center ${
        !isFirst && "border-t-2"
      } border-linkin-lightgray hover:bg-gray-200 transition-colors duration-150 ease-in-out`}
    >
      <Avatar className="h-16 w-16">
        <AvatarImage src={`${API_PHOTO}/${profile_photo}`}/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full ml-3">
        <h2 className="text-lg font-bold">{username}</h2>
        <p className="text-gray-500">
          {isLastSender && "You: "}
          {last_message}
        </p>
      </div>
        <p className="font-semibold text-gray-500"> {formatDate(updated_at)}</p>

      <div className="flex items-center p-4 gap-4"></div>
    </Link>
  );
};

export default InboxCard;
