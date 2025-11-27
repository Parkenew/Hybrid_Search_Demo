import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // 초기값을 localStorage에서 읽기
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true"; // 문자열 "true" → boolean
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        flex items-center justify-center
        w-12 h-12
        bg-gray-100 dark:bg-gray-700
        rounded-full
        transition-all duration-300
        overflow-hidden
      "
    >
      <img
        src="/sun.svg"
        alt="sun"
        className="w-7 h-7 dark:hidden animate-iconSwap"
      />

      <img
        src="/moon.svg"
        alt="moon"
        className="w-7 h-7 hidden dark:block animate-iconSwap"
      />
    </button>
  );
}
