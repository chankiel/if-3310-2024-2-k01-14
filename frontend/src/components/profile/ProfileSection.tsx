import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { ProfileData } from "../../pages/Profile";
import { Link } from "react-router-dom";
import { API_PHOTO } from "../../constant";
import { ClockIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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

interface ProfileDataProps {
  data: ProfileData;
  isAuthenticated: boolean;
  currentId: number;
  user_id: number;
  isConnected: boolean;
  room_id: number;
  hasRequested: boolean;
  onUpdate: (updatedData: ProfileData) => void;
  handleConnect: (user_id: number, isConnected: boolean) => Promise<void>;
}

export default function ProfileSection({
  data,
  isAuthenticated,
  currentId,
  user_id,
  isConnected,
  room_id,
  hasRequested,
  onUpdate,
  handleConnect,
}: ProfileDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log(data.profile_photo)

  return (
    <>
      <div className="relative flex flex-col rounded-lg mb-4 border bg-white overflow-hidden pb-4 min-w-full">
        <div>
          <img
            src="/bg-image-profile.png"
            alt="Profile Background"
            className="w-full h-48 object-cover sticky"
          />
          <img
            src={data.profile_photo ? `${API_PHOTO}/${data.profile_photo}` : "/perry-casino.webp"}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white relative left-8"
            style={{ marginTop: "-110px" }}
          />
          {currentId === user_id && (
            <svg
              className="absolute top-52 right-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
              onClick={handleEditProfileClick}
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          )}
        </div>
        <div className="ml-4 p-4">
          <h1 className="text-2xl font-bold">{data.full_name}</h1>
          <h1 className="text-sm font-semibold">{data.username}</h1>
          <a href={`/connections/${user_id}`} className="text-gray-500 hover:text-blue-500 hover:underline">
            <p>{data.connection_count} connections</p>
          </a>
        </div>
        <div className="ml-4 h-12 pt-2 text-base pl-4 flex">
          {currentId === user_id ? (
            // Profile owner
            <button
              className="rounded-2xl py-1 px-3 font-semibold"
              style={{ backgroundColor: "rgb(10, 102, 194)" }}
              onClick={handleEditProfileClick}
            >
              <span className="px-3 py-3 text-white">Edit profile</span>
            </button>
          ) : isAuthenticated && isConnected ? (
            // Authenticated and connected
            <>
              <AlertDialog>
                <AlertDialogTrigger>
                  <button className="border border-[rgb(10,102,194)] rounded-2xl py-2 px-4 font-semibold flex items-center text-[rgb(10, 102, 194)] hover:bg-gray-200 transition-colors duration-150 ease-in-out">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="rgb(10, 102, 194)"
                      className="mr-1"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                    <span className="text-[rgb(10, 102, 194)]">Connected</span>
                  </button>
                  {/* onClick={() => handleConnect(user_id, true)} */}
                </AlertDialogTrigger>
                <AlertDialogContent className="lg:w-1/2 w-3/4 rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold py-2 border-b-2 border-b-linkin-border">
                      Delete Connection
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-md text-black pb-2 border-b-2 border-b-linkin-border">
                      Are you sure you want to delete this connection? This
                      action cannot be undone and will remove the connection
                      permanently.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="button-blue text-lg">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleConnect(user_id, true)} // Trigger the delete action here
                      className="button-white bg-white text-lg"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Link
                to={`/chat/${room_id}`}
                className="border border-[rgb(10,102,194)] rounded-2xl ml-2 py-1 px-3 font-semibold flex items-center text-[rgb(10, 102, 194)] hover:bg-gray-200 transition-colors duration-150 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="rgb(10, 102, 194)"
                  className="mr-1"
                  style={{ transform: "rotate(-45deg)" }}
                >
                  <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                </svg>
                <span className="text-[rgb(10, 102, 194)]">Message</span>
              </Link>
            </>
          ) : isAuthenticated && !isConnected ? (
            // Authenticated but not connected
            <>
              <button
                className="text-white rounded-2xl py-1 px-4 font-semibold flex items-center hover:bg-gray-200 transition-colors duration-150 ease-in-out"
                style={{ backgroundColor: "rgb(10, 102, 194)" }}
                onClick={() => handleConnect(user_id, hasRequested)}
                disabled={hasRequested}
              >
                {hasRequested ? (
                  <>
                    <ClockIcon width={27} height={27} />
                    <p className="ml-2 text-lg">Waiting</p>
                  </>
                ) : (
                  <>
                    <UserPlusIcon width={27} height={27} />
                    <p className="ml-2 text-lg">Connect</p>
                  </>
                )}
              </button>
            </>
          ) : (
            // Not authenticated
            <Link
              to="/login"
              className="rounded-2xl pt-1 px-3 font-semibold block text-center w-48 justify-center"
              style={{ backgroundColor: "rgb(10, 102, 194)" }}
            >
              <span className="px-3 py-3 text-white">Sign in to connect</span>
            </Link>
          )}
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={data}
        user_id={user_id}
        onUpdate={onUpdate}
      />
    </>
  );
}
