import { useState } from "react";

interface User {
  role: string;
  nama: string;
}

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const togglePopover = () => setPopoverVisible((prev) => !prev);

  return (
    <header className="bg-white sticky top-0 z-20 h-16 py-1 px-4 mb-2 text-gray-800">
      <div className="container flex justify-between items-center h-full mx-auto">
        <a className="w-2/3 h-full" href="/">
          <img
            src="/public/images/linkedin.svg"
            width="150"
            height="100"
            alt="logo"
            className="h-auto max-h-full border-transparent"
          />
        </a>
        <nav>
          <ul className="flex items-center gap-2">
            {user ? (
              <>
                <li className="flex flex-col items-center relative">
                  <a href="/">
                    <span className="material-symbols-outlined text-3xl">
                      home
                    </span>
                    <p>Home</p>
                  </a>
                </li>
                {user.role === "jobseeker" && (
                  <li className="flex flex-col items-center relative">
                    <a href="/applications">
                      <span className="material-symbols-outlined text-3xl">
                        history
                      </span>
                      <p>History</p>
                    </a>
                  </li>
                )}
                <li className="flex flex-col items-center relative" onClick={togglePopover}>
                  <img
                    src="/public/images/perry-casino.webp"
                    alt="logo"
                    className="h-7 w-7 rounded-full"
                  />
                  <p className="flex items-center">
                    Me{" "}
                    <span className="material-symbols-outlined">
                      arrow_drop_down
                    </span>
                  </p>
                  {popoverVisible && (
                    <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-72 p-2 z-10">
                      <div className="flex gap-2 mb-4">
                        <img
                          src="/public/images/perry-casino.webp"
                          alt="profile-pic"
                          className="h-20 w-20 object-cover rounded-full"
                        />
                        <div className="text-left">
                          <h1 className="font-medium text-sm">{user.nama}</h1>
                          <h2 className="font-bold text-sm capitalize">
                            {user.role}
                          </h2>
                        </div>
                      </div>
                      {user.role === "company" && (
                        <a href="/profile/company" className="block mb-3 text-blue-600 border border-blue-600 rounded-lg p-2">
                          View Profile
                        </a>
                      )}
                      <form action="/logout" method="POST" className="text-gray-600">
                        <button type="submit" className="w-full text-left underline">
                          Logout
                        </button>
                      </form>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className="py-2 px-4 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-100">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register" className="py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                    Register
                  </a>
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