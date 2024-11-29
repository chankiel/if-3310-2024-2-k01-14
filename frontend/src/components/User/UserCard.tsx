import { UseAuth } from "../../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  UserPlusIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

interface UserCardProps {
  id: string;
  username: string;
  name: string | null;
  profile_photo_path: string;
  is_connected?: boolean;
  is_requested?: boolean;
  handleRequest: (id: string, isStore: boolean) => Promise<void>;
  isFirst: boolean
}

const UserCard = ({
  id,
  username,
  name,
  profile_photo_path,
  is_connected,
  is_requested,
  handleRequest,
  isFirst
}: UserCardProps) => {
  const { isAuthenticated } = UseAuth();
  return (
    <div className={`flex p-5 items-center ${!isFirst && "border-t-2"} border-linkin-lightgray`}>
      <Avatar className="h-16 w-16">
        <AvatarImage src={profile_photo_path} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full ml-5">
        <h2 className="text-lg font-bold">{username}</h2>
        {name && <h3 className="text-gray-600">{name}</h3>}
      </div>
      {isAuthenticated && (
        <div className="flex items-center p-4 ">
          {is_connected ? (
            <Button variant={"outline"} className="button-blue px-5">
              <ChatBubbleOvalLeftEllipsisIcon width={27} height={27} />
              <p className="text-lg">Chat</p>
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className="button-blue px-5"
              onClick={() => handleRequest(id, !is_requested)}
            >
              {is_requested ? (
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
