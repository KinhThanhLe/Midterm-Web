import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const menuItems = [
  {
    href: "/home",
    title: "Home",
  },
  {
    href: "/",
    title: "About us",
  },
  {
    href: "/",
    title: "Services",
  },
];

function Header({ isLight }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <div
      className={`w-full flex justify-center absolute top-0 left-0 z-2 ${
        isLight && "bg-white shadow-md"
      }`}
    >
      <div className="w-9/12 flex justify-between items-center h-16">
        <Link to="/" className="font-black hover:cursor-pointer text-gray-500">
          <h1 className="text-2xl">GROUPXX</h1>
        </Link>
        <div className="flex gap-10 items-center">
          {menuItems.map((item) => (
            <Link to={item.href}>
              <h6
                className={`font-semibold ${
                  isLight ? "text-blue-gray-900" : "text-white"
                } hover:text-gray-500`}
              >
                {item.title}
              </h6>
            </Link>
          ))}
          {!user && (
            <Link
              to="/sign-in"
              className={`font-semibold ${
                isLight ? "text-blue-gray-900" : "text-white"
              } hover:text-gray-500`}
              href="#"
            >
              Sign in
            </Link>
          )}

          {user && <UserMenu user={user} isLight={isLight}></UserMenu>}
        </div>
      </div>
    </div>
  );
}

export default Header;
