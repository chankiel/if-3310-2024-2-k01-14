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
import { toast } from "react-toastify";

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

type ConnectionCardProps = {
  id: string;
  username: string;
  full_name: string | null;
  profile_photo: string | null;
  created_at: Date;
  onDelete: (id: string) => void;
  isSelf: boolean;
  isFirst: boolean;
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
}: ConnectionCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className={`flex p-5 items-center ${!isFirst && "border-t-2"} border-linkin-lightgray`}>
      <Avatar className="h-16 w-16">
        <AvatarImage src={profile_photo ?? ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full ml-3">
        <h2 className="text-lg font-bold">{full_name}</h2>
        <h3 className="text-gray-600">@{username}</h3>
        <p className="text-sm">Connected {timeAgo(created_at)}</p>
      </div>
      {isSelf && (
        <div className="flex items-center p-4 gap-4">
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
              Are you sure you want to delete this connection? This action cannot be undone and will remove the connection permanently.
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
