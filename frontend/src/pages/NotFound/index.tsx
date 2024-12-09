import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center mt-10">
      <img src="/images/not-found.png" alt="not-found" width={350} />
      <h1 className="font-semibold text-[27px] mt-1">
        This page doest not exist
      </h1>
      <h2 className="w-3/4 text-[18px] text-gray-600 text-center mt-1">
        Check your URL or return to the LinkinPurry homepage.
      </h2>
      <Button
        asChild
        variant={"outline"}
        className="mt-5 button-blue px-5 py-3 bg-linkin-subtleyellow"
      >
        <Link to={`/feed`}>
          <p className="text-lg font-semibold">Go Back to Home</p>
        </Link>
      </Button>
    </div>
  );
}
