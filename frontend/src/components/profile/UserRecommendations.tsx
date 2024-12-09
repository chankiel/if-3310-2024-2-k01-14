import { Link } from "react-router-dom";
import { API_PHOTO } from "../../constant";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRecommendation } from "./RecommendationSection";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";

interface UserRecommendationsProps {
  user: UserRecommendation;
  handleConnect: (id: string) => Promise<void>;
}

export default function UserRecommendations({
  user,
  handleConnect
}: UserRecommendationsProps) {
  return (
    <li className="w-[250px] flex flex-row py-3 px-6 border-b border-gray-300 last:border-b-0">
      <div
        className="flex w-full items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Link to={`/profile/${user.id}`}>
        <Avatar>
          <AvatarImage src={`${API_PHOTO}/${user.profile_photo}`}/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </Link>
        <div className="ml-3">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <Button variant={"outline"} className="button-blue px-3 mt-2" onClick={()=>handleConnect(user.id.toString())
          }>
            <UserPlusIcon width={27} height={27} />
            <p className="text-lg">Connect</p>
          </Button>
        </div>
      </div>
    </li>
  );
}
