import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
import FooterSection from "../components/FooterSection";
import SearchResultLayout from "../components/SearchResultLayout";

export default function SearchResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [keywordResult, setKeywordResult] = useState([]);
  const [vectorResult, setVectorResult] = useState([]);
  const [hybridResult, setHybridResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    fetch("http://localhost:8080/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((r) => r.json())
      .then((data) => {
        const keyword = data.find((d) => d.type === "keyword");
        const vector = data.find((d) => d.type === "vector");
        const hybrid = data.find((d) => d.type === "hybrid");

        setKeywordResult(keyword?.result || []);
        setVectorResult(vector?.result || []);
        setHybridResult(hybrid?.result || []);
      })
      .catch((e) => console.error("API ERROR:", e))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-700 dark:text-white overflow-hidden">
      {/* 네비 */}
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

      {/* 메인 영역 전체 flex-1 (중간 영역 전체) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 검색바 */}
        <div className="shrink-0 flex justify-center pt-4 pb-2">
          <div className="w-full max-w-[750px]">
            <SearchBar />
          </div>
        </div>

        {/* 결과 섹션 (🔥 이 부분만 스크롤) */}
        <div className="flex-1 px-6 flex justify-center overflow-y-auto pb-6">
          {loading ? (
            <div className="py-12 flex justify-center w-full">
              <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-[#e30313] rounded-full"></div>
            </div>
          ) : (
            <SearchResultLayout
              keyword={keywordResult}
              vector={vectorResult}
              hybrid={hybridResult}
            />
          )}
        </div>
      </div>

      {/* footer - 항상 화면 하단 */}
      <footer className="shrink-0">
        <FooterSection />
      </footer>
    </div>
  );
}
