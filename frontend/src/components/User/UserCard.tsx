import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

interface UserCardProps{
  id: string;
  username: string;
  name: string | null;
  profile_photo_path: string;
}

const UserCard = ({
  id,
  username,
  name,
  profile_photo_path,
}: UserCardProps) => {
  return (
    <div className="flex p-5 items-center border-b-2 border-linkin-lightgray">
      <Avatar className="h-16 w-16">
        <AvatarImage src={profile_photo_path} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full ml-3">
        <h2 className="text-lg font-bold">{username}</h2>
        {name && <h3 className="text-gray-600">{name}</h3>}
      </div>
      <div className="flex items-center p-4 ">
        <Button
          variant={"outline"}
          className="border-linkin-blue text-linkin-blue rounded-[20px] px-5"
        >
          <PlusIcon width={27} height={27}/>
          <p className="text-lg">Connect</p>
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
