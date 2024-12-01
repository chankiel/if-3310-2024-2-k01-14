import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserFormat } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  UserPlusIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

interface UserCardProps {
  user: UserFormat;
  handleRequest: (id: string, isStore: boolean) => Promise<void>;
  isFirst: boolean;
}

const UserCard = ({ user, handleRequest, isFirst }: UserCardProps) => {
  const { isAuthenticated } = useAuth();
  return (
    <div
      className={`flex p-5 items-center ${
        !isFirst && "border-t-2"
      } border-linkin-lightgray`}
    >
      <Avatar className="h-16 w-16">
        <AvatarImage src={user.profile_photo ?? ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full ml-5">
        <h2 className="text-lg font-bold">{user.username}</h2>
        {user.name && <h3 className="text-gray-600">{user.name}</h3>}
      </div>
      {isAuthenticated && (
        <div className="flex items-center p-4 ">
          {user.is_connected ? (
            <Button asChild variant={"outline"} className="button-blue px-5">
              <Link to={`/chat/${user.room_id}`}>
                <ChatBubbleOvalLeftEllipsisIcon width={27} height={27} />
                <p className="text-lg">Chat</p>
              </Link>
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className="button-blue px-5"
              onClick={() => handleRequest(user.id!, !user.is_requested)}
            >
              {user.is_requested ? (
                <>
                  <ClockIcon width={27} height={27} />
                  <p className="text-lg">Waiting</p>
                </>
              ) : (
                <>
                  <UserPlusIcon width={27} height={27} />
                  <p className="text-lg">Connect</p>
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
