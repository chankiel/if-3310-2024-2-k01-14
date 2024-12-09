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
import { API_PHOTO } from "../../constant";

interface UserCardProps {
  user: UserFormat;
  handleRequest: (
    id: string,
    isStore: boolean,
    gotRequest?: boolean,
    isAccept?: boolean
  ) => Promise<void>;
  isFirst: boolean;
}

const UserCard = ({ user, handleRequest, isFirst }: UserCardProps) => {
  const { isAuthenticated } = useAuth();
  return (
    <div
      className={`flex p-5 items-center ${
        !isFirst && "border-t-2"
      } border-linkin-lightgray hover:bg-gray-200 transition-colors duration-150 ease-in-out`}
    >
      <Link to={`/profile/${user.id}`} className="w-full flex items-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src={`${API_PHOTO}/${user.profile_photo}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full ml-5">
          <h2 className="text-lg font-bold"><span className="hover:underline hover:text-linkin-blue">{user.username}</span></h2>
          {user.name && <h3 className="text-gray-600">{user.name}</h3>}
        </div>
      </Link>
      {isAuthenticated && (
        <div className="flex items-center p-4 ">
          {user.is_connected ? (
            <Button asChild variant={"outline"} className="button-blue px-5">
              <Link to={`/chat/${user.room_id}`}>
                <ChatBubbleOvalLeftEllipsisIcon width={27} height={27} />
                <p className="text-lg">Chat</p>
              </Link>
            </Button>
          ) : !user.got_request ? (
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
          ) : (
            <div className="flex items-center py-1 gap-4">
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
                      You are about to reject this connection request. This
                      action cannot be undone. The person will not be notified,
                      but the request will be removed from your list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="button-blue text-lg">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRequest(user.id!, false, true, false )}
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
                onClick={() => handleRequest(user.id!, false, true, true)}
              >
                Accept
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
