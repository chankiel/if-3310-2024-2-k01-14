import { Link, useLocation } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";
import {
  ChatIcon,
  GroupIcon,
  HomeIcon,
  LinkedInIcon,
  NotificationIcon,
} from "../Icons";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { isAuthenticated, logout, username, currentId, profile_photo } =
    UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response.message);
      navigate("/feed");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const paths = [
    {
      path: "/users",
      name: "Users",
      icon: <UserGroupIcon height={24} width={24} />,
    },
    {
      path: "/feed",
      name: "Home",
      icon: <HomeIcon />,
    },
    {
      path: "/mynetworks/connections",
      name: "My Connections",
      icon: <GroupIcon />,
    },
    {
      path: "/mynetworks/pending",
      name: "Requests",
      icon: <ClockIcon height={27} width={27} />,
    },
    {
      path: "/chat",
      name: "Chat",
      icon: <ChatIcon />,
    },
    {
      path: "/notification",
      name: "Notification",
      icon: <NotificationIcon />,
    },
  ];

  return (
    <header className="bg-white sticky top-0 z-20 h-16 py-1 px-4 mb-2 text-gray-800">
      <div className="container flex justify-between items-center h-full mx-auto">
        <a className="md:w-full h-full" href="/">
          <LinkedInIcon color="#0a66c2" size={50} />
        </a>
        <nav className="w-full">
          <ul className="flex justify-around gap-2 text-sm text-gray-500 ">
            {isAuthenticated ? (
              <>
                {paths.map((path, index) => (
                  <li
                    className={`hover:text-black relative flex items-center justify-center md:min-w-14 ${
                      path.path === location.pathname ? "text-black" : ""
                    }`}
                    key={index}
                  >
                    <Link to={path.path} className="flex flex-col items-center">
                      {path.icon}
                      <p className="hidden md:block text-nowrap">{path.name}</p>
                    </Link>

                    {/* Add bottom border when active */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 ${
                        path.path === location.pathname ? "bg-black" : "hidden"
                      }`}
                    />
                  </li>
                ))}
                <li className="flex flex-col items-center relative">
                  <Popover>
                    <PopoverTrigger>
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={profile_photo ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <p className="md:flex items-center hidden">
                        Me{" "}
                        <span className="material-symbols-outlined">
                          arrow_drop_down
                        </span>
                      </p>
                    </PopoverTrigger>
                    <PopoverContent align="end" sideOffset={15}>
                      <div className="flex gap-2 mb-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/images/perry-casino.webp" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <h1 className="font-medium text-lg">{username}</h1>
                        </div>
                      </div>
                      <Link
                        to={`/profile/${currentId}`}
                        className="block mb-3 text-linkin-blue font-semibold border border-linkin-blue rounded-xl px-2 text-center transition-all duration-100 ease-in hover:ring-linkin-dark-blue hover:ring-2 hover:bg-linkin-hoverblue"
                      >
                        View Profile
                      </Link>
                      <div className="text-gray-600">
                        <button
                          className="w-full text-left hover:underline"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="py-2 px-4 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-100"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
