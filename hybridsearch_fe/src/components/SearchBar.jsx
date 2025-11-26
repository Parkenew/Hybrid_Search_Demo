import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("검색:", query);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full mb-5">
      <div className="relative w-full">
        {/* 왼쪽 아이콘 */}
        <img
          src="/search_icon.png"
          alt="search"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-70 pointer-events-none"
        />

        {/* 검색창 */}
        <input
          type="text"
          placeholder="증상, 질병 등의 검색어를 입력하세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className="
            w-full h-14
            border         /* 🔥 기존 보더 유지 */
            bg-white
            text-gray-800
            pl-14                          /* 🔥 왼쪽 아이콘 공간 */
            pr-6                           /* 오른쪽 패딩 */
            rounded-full                    /* 선택: 둥글게 (원하면 제거해도 됨) */
            placeholder:text-gray-500
            focus:outline-none
            shadow
          "
        />
      </div>
    </div>
  );
}
