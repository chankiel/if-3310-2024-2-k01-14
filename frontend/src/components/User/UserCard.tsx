import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

const UserCard: React.FC = () => {
  return (
    <div className="flex p-5 items-center border-b-2 border-linkin-lightgray">
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full ml-3">
        <h2 className="text-lg font-bold">Suthasoma Mahardika</h2>
        <h3 className="text-gray-600">@Suthasoma</h3>
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
