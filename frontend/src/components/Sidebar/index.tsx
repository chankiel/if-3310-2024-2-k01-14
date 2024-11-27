import React from "react";
import { UseAuth } from "../../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router";

const Sidebar: React.FC = () => {
  const { username, currentId, name, isAuthenticated } = UseAuth();

  return (
    <aside className="w-[250px] self-start sticky top-[90px] hidden md:block">
      <div className="bg-white rounded-lg overflow-hidden mb-4 border-linkin-border border-2">
        <div className="relative h-16">
          <img
            src="/images/bg-image-profile.png"
            alt="profile-picture"
            className="w-full h-full object-cover"
          />
          <Avatar className="h-20 w-20 absolute bottom-[-80%] left-5">
            <AvatarImage src={
              isAuthenticated
                ? "/images/perry-casino.webp" : "/images/question-mark.jpg"}/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-10 px-5 py-4 w-[230px]">
          {!isAuthenticated ? (
            <>
              <h1 className="max-w-full text-xl font-semibold leading-8 whitespace-nowrap overflow-ellipsis overflow-hidden">Ignatius Jhon Hezkiel Chan</h1>
              <h2 className="text-md text-linkin-gray">@ngentotko</h2>
            </>
          ) : (
            <h1 className="text-xl">Guest</h1>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4 hover:underline px-5 py-4 border-linkin-border border-2">
        <Link to={`/connections/${currentId}`}>
          <h1 className="font-bold">
            Connection
          </h1>
          <p className="text-sm">
            Grow your network in here! 
          </p>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
