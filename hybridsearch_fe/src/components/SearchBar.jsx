import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar({ loading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query");
    if (q) setQuery(q);
  }, [location.search]);

  const handleSearch = () => {
    if (!query.trim() || loading) return;
    navigate(`/result?query=${encodeURIComponent(query)}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        {/* 왼쪽 로고 */}
        <img
          src="/logo.png"
          alt="logo"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-6 opacity-70 pointer-events-none"
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={loading}
          placeholder="검색어를 입력해주세요."
          className="
            w-full h-14
            border rounded-full shadow
            pl-14 pr-20
            bg-white text-gray-800
            font-bold
          "
        />

        {/* 🔥 스피너: 실제 검색 상태 기반 */}
        {loading && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-[#e30313] rounded-full animate-spin" />
          </div>
        )}

        {/* 검색 버튼 */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            w-8 h-8 flex items-center justify-center
            rounded-full bg-gray-100
          "
        >
          <img src="/search_icon.png" alt="search" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
