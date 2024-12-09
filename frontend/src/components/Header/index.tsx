import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  ChatIcon,
  GroupIcon,
  HomeIcon,
  LinkedInIcon,
} from "../Icons";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { API_PHOTO } from "../../constant";
import { useState } from "react";

const Header: React.FC = () => {
  const { isAuthenticated, logout, username, currentId, profile_photo, name } =
    useAuth();
  const [isOpen, setIsOpen] = useState(false); 
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

  const protectedPaths = [
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
  ];

  const publicPaths = [
    {
      path: "/users",
      name: "People",
      icon: <UserGroupIcon height={27} width={27}/>,
    },
  ];

  const paths = isAuthenticated
    ? [...publicPaths, ...protectedPaths]
    : publicPaths;

  return (
    <header className=" sticky top-0 z-20 h-16 py-1 px-4 mb-2 text-gray-800 bg-white">
      <div className="container flex justify-between items-center h-full mx-auto">
        <a className="md:w-full h-full" href="/">
          <LinkedInIcon color="#0a66c2" size={50} />
        </a>
        <nav className={`${isAuthenticated ? "w-full" : "lg:w-1/4 w-2/3"}`}>
          <ul className="flex justify-around gap-2 text-sm text-gray-500 items-center">
            {paths.map((path, index) => (
              <li
                className={`hover:text-black relative flex items-center justify-center md:min-w-20 ${
                  path.path === location.pathname ? "text-black" : ""
                }`}
                key={index}
              >
                <Link to={path.path} className="flex flex-col items-center">
                  {path.icon}
                  <p className="hidden md:block text-nowrap">{path.name}</p>
                </Link>

                <div
                  className={`absolute -bottom-1 left-0 right-0 h-1 ${
                    path.path === location.pathname ? "bg-black" : "hidden"
                  }`}
                />
              </li>
            ))}

            {isAuthenticated ? (
              <li className="flex flex-col items-center relative md:min-w-20">
                <Popover open={isOpen} onOpenChange={(open)=>{
                  setIsOpen(open);
                }}>
                  <PopoverTrigger>
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={`${API_PHOTO}/${profile_photo}`} alt="profile-photo"/>
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
                    <div className="flex gap-2 mb-4 items-center">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={`${API_PHOTO}/${profile_photo}`} alt="profile-photo"/>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <h1 className="font-medium text-xl">{name}</h1>
                        <h1 className="font-medium text-gray-500">{username}</h1>
                      </div>
                    </div>
                    <Link
                      to={`/profile/${currentId}`}
                      className="block mb-3 text-linkin-blue font-semibold border border-linkin-blue rounded-xl px-2 text-center transition-all duration-100 ease-in hover:ring-linkin-dark-blue hover:ring-2 hover:bg-linkin-hoverblue"
                      onClick={()=> setIsOpen(false)}
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
            ) : (
              <>
                <li>
                  <Link
                    to="/register"
                    className="font-semibold text-[#181818] py-3 px-7 rounded-full text-lg hover:bg-[#F5F5F5] transition-colors duration-100 ease-in"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="font-semibold py-3 px-7 rounded-full text-lg border-2 border-blue-600 text-blue-600 hover:bg-[#F0F7FE] transition-colors duration-100 ease-in"
                  >
                    Login
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
