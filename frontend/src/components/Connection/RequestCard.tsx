import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const RequestCard = () => {
  return (
    <div className="flex p-5 border-b-2 border-linkin-lightgray">
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col md:flex-row md:justify-between">
        <div className="w-full ml-3">
          <h2 className="text-lg font-bold">Suthasoma Mahardika</h2>
          <h3 className="text-gray-600">@Suthasoma</h3>
          <p className="text-sm">Dikirimkan 2 bulan yang lalu</p>
        </div>
        <div className="flex items-center p-4 gap-4">
          <Button
            variant={"secondary"}
            className="border-linkin-blue text-[17px] rounded-[20px] px-5"
          >
            Reject
          </Button>
          <Button
            variant={"outline"}
            className="border-linkin-blue text-linkin-blue text-[17px] font rounded-[20px] px-5"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
