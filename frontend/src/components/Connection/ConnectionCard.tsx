import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  TrashIcon,
  EllipsisHorizontalIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { timeAgo } from "../../lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { API_PHOTO } from "../../constant";

type ConnectionCardProps = {
  id: string;
  username: string;
  full_name: string | null;
  profile_photo: string | null;
  created_at: Date;
  onDelete: (id: string) => void;
  isSelf: boolean;
  isFirst: boolean;
  room_id?: number;
};

const ConnectionCard = ({
  id,
  username,
  full_name,
  profile_photo,
  created_at,
  onDelete,
  isSelf,
  isFirst,
  room_id,
}: ConnectionCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div
      className={`flex p-5 items-center ${
        !isFirst && "border-t-2"
      } border-linkin-lightgray hover:bg-gray-200 transition-colors duration-150 ease-in-out`}
    >
      <Link to={`/profile/${id}`} className="w-full flex items-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src={`${API_PHOTO}/${profile_photo}`} alt="profile-photo"/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full ml-3">
          <h2 className="text-lg font-bold hover:underline hover:text-linkin-blue">{full_name}</h2>
          <h3 className="text-gray-600 hover:underline hover:text-linkin-blue">@{username}</h3>
          <p className="text-sm">Connected {timeAgo(created_at)}</p>
        </div>
      </Link>
      {isSelf && (
        <div className="flex items-center p-4 gap-4">
          <Button asChild variant={"outline"} className="button-blue px-5">
            <Link to={`/chat/${room_id}`}>
              <ChatBubbleOvalLeftEllipsisIcon width={27} height={27} />
              <p className="text-lg">Chat</p>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisHorizontalIcon height={30} width={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                  <AlertDialogTrigger
                    className="text-gray-500 flex items-center gap-3"
                    onClick={() => setOpenDialog(true)}
                  >
                    <TrashIcon height={27} width={27} />
                    <p>Delete Connection</p>
                  </AlertDialogTrigger>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* AlertDialog */}
          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent className="lg:w-1/2 w-3/4 rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold py-2 border-b-2 border-b-linkin-border">
                  Delete Connection
                </AlertDialogTitle>
                <AlertDialogDescription className="text-md text-black pb-2 border-b-2 border-b-linkin-border">
                  Are you sure you want to delete this connection? This action
                  cannot be undone and will remove the connection permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="button-blue text-lg">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(id)} // Trigger the delete action here
                  className="button-white bg-white text-lg"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default ConnectionCard;
