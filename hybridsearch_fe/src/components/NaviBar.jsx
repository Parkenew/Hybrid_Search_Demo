import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NaviBar(){
    const navigate = useNavigate();
    return (
        <div className="shrink-0 w-full border-b border-gray-300 dark:border-gray-600 py-2 px-6 flex justify-between items-center">
        <img
          src="/lloydk_black.png"
          alt="logo"
          className="w-36 block dark:hidden cursor-pointer"
          onClick={() => navigate("/")}
        />
        <img
          src="/lloydk_white.png"
          alt="logo"
          className="w-36 hidden dark:block cursor-pointer"
          onClick={() => navigate("/")}
        />
        <ThemeToggle />
      </div>
    );

}