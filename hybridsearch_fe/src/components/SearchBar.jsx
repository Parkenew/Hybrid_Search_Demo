import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");

  // URL 파라미터로 검색어 유지
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query");
    if (q) setQuery(q);
  }, [location.search]);

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/result?query=${encodeURIComponent(query)}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // 🔥 input 클릭하면 커서가 맨 뒤로 이동
  const handleFocus = () => {
    const input = inputRef.current;
    if (input) {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  };

  return (
    <div className="w-full mb-5">
      <div className="relative w-full">
        {/* 왼쪽 로고 */}
        <img
          src="/logo.png"
          alt="logo"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-6 opacity-70 pointer-events-none"
        />

        {/* 검색창 */}
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력해주세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          className="
            w-full h-14
            border rounded-full shadow
            pl-14 pr-14
            bg-white text-gray-800
            placeholder:text-gray-400 placeholder:font-bold
            focus:outline-none
            font-bold
          "
        />

        {/* 오른쪽 검색 아이콘 버튼 */}
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center 
          justify-center hover:scale-110 active:scale-95 transition rounded-full bg-gray-100"
        >
          <img src="/search_icon.png" alt="search" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
