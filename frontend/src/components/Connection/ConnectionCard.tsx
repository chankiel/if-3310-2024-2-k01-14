import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { TrashIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { timeAgo } from "../../lib/utils";

type ConnectionCardProps = {
  id: string;
  username: string;
  full_name: string | null;
  profile_photo_path: string | null;
  created_at: Date;
  onDelete: (id: string) => void;
  isSelf: boolean;
};

const ConnectionCard = ({
  id,
  username,
  full_name,
  profile_photo_path,
  created_at,
  onDelete,
  isSelf,
}: ConnectionCardProps) => {
  return (
    <div className="flex p-5 items-center border-b-2 border-linkin-lightgray">
      <Avatar className="h-16 w-16">
        <AvatarImage src={profile_photo_path ?? ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full ml-3">
        <h2 className="text-lg font-bold">{full_name}</h2>
        <h3 className="text-gray-600">@{username}</h3>
        <p className="text-sm">Connected {timeAgo(created_at)}</p>
      </div>
      {isSelf && <div className="flex items-center p-4 gap-4">
        <Button
          asChild
          variant={"outline"}
          className="border-linkin-blue text-linkin-blue rounded-[20px] px-5"
        >
          <Link to={`/chat/${id}`} className="text-[17px]">
            Chat
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisHorizontalIcon height={30} width={30} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-gray-500" onClick={()=> onDelete(id)}>
                <TrashIcon/>
                <p>Delete connection</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>}
    </div>
  );
};

export default ConnectionCard;
