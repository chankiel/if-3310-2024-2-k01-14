import { Link } from "react-router-dom";
import { API_PHOTO } from "../../constant";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface RequestCardProps {
  id: string;
  username: string;
  full_name: string | null;
  profile_photo_path: string | null;
  created_at: Date;
  handleRespond: (id: string, isAccept: boolean) => Promise<void>;
  isFirst: boolean;
}

const RequestCard = ({
  id,
  username,
  full_name,
  profile_photo_path,
  created_at,
  handleRespond,
  isFirst,
}: RequestCardProps) => {
  return (
    <div
      className={`flex p-5 ${!isFirst && "border-t-2"} border-linkin-lightgray hover:bg-gray-200 transition-colors duration-150 ease-in-out`}
    >
      <Avatar className="h-16 w-16">
        <AvatarImage src={`${API_PHOTO}/${profile_photo_path}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between">
        <Link to={`/profile/${id}`} className="w-full ml-3">
          <h2 className="text-lg font-bold">{username}</h2>
          <h3 className="text-gray-600">{full_name}</h3>
          <p className="text-sm">Sent {timeAgo(created_at)}</p>
        </Link>
        <div className="flex items-center px-4 py-1 gap-4">
          <AlertDialog>
            <AlertDialogTrigger className="text-gray-900">
              Reject
            </AlertDialogTrigger>
            <AlertDialogContent className="md:w-1/2 w-2/3">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold py-2 border-b-2 border-b-linkin-border">
                  Reject Request
                </AlertDialogTitle>
                <AlertDialogDescription className="text-md text-black pb-2 border-b-2 border-b-linkin-border">
                  You are about to reject this connection request. This action
                  cannot be undone. The person will not be notified, but the
                  request will be removed from your list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="button-blue text-lg">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleRespond(id, false)}
                  className="button-white bg-white text-lg"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant={"outline"}
            className="border-linkin-blue text-linkin-blue text-[17px] font rounded-[20px] px-5"
            onClick={() => handleRespond(id, true)}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
