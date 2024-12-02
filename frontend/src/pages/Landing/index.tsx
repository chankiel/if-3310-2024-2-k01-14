import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkedInIcon } from "../../components/Icons";

export default function LandingPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#FFFFFF";
    document.body.style.overflowX = "hidden";
    
    return () => {
      document.body.style.backgroundColor = "#f4f2ee";
    };
  }, []);

  return (
    <div className="flex lg:justify-between justify-center min-h-[calc(100vh-135px)] flex-col lg:flex-row items-center bg-white">
      <div className=" p-2 max-w-[600px]">
        <h1 className="text-5xl md:text-7xl md:mb-10 mb-5 text-[#526A6E]">
          Welcome to your professional community
        </h1>
        <div className="lg:w-[60%] lg:mx-0 mx-auto">
          <div className="w-full">
            <p className="text-linkin-gray text-sm">Already have an account?</p>
            <Link
              to={"/login"}
              className="rounded-full py-2 w-full mt-2 text-center gap-3 border-2 border-black flex justify-center items-center"
            >
              <LinkedInIcon className="text-linkin-blue" size={35} />
              <span className="text-linkin-blue font-bold text-2xl">
                Sign In
              </span>
            </Link>
          </div>
          <p className="relative flex items-center justify-center text-center font-bold text-2xl mt-2">
            <span className="bg-white px-3 z-10">or</span>
            <span className="absolute left-0 w-full border-t border-gray-300 top-1/2"></span>
          </p>
          <h1 className="mt-5 text-center text-lg font-semibold">
            New to LinkedIn?{" "}
            <a
              href="/register"
              className="text-linkin-blue hover:text-linkin-dark-blue hover:underline"
            >
              Join now
            </a>
          </h1>
        </div>
      </div>
      <img
        src="/images/landing-page-image.svg"
        className="lg:m-5 lg:w-[800px] lg:h-[800px] w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
      />
    </div>
  );
}
