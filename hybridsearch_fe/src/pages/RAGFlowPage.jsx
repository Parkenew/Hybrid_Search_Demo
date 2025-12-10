import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NaviBar from "../components/NaviBar";
import FooterSection from "../components/FooterSection";
import StepFlow from "../components/StepFlow";
import RightContent from "../components/RightContent";
import SearchBar from "../components/SearchBar";

export default function RagFlowPage() {
  const [step, setStep] = useState(1);

  // 검색어
  const [query, setQuery] = useState("");

  // 로딩 상태
  const [isEmbedding, setIsEmbedding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // 결과 상태
  const [embedVector, setEmbedVector] = useState(null);
  const [keywordResult, setKeywordResult] = useState([]);
  const [vectorResult, setVectorResult] = useState([]);

  const location = useLocation();

  /** URL에서 query 가져오기 */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get("query");

    if (urlQuery) {
      handleSearch(urlQuery);
    }
  }, [location.search]);

  /** 검색 실행 */
  const handleSearch = (text) => {
    setQuery(text);
    setStep(1);

    // 초기화
    setEmbedVector(null);
    setKeywordResult([]);
    setVectorResult([]);

    fetchEmbedding(text);
  };

  /** Step1 — 임베딩 요청 */
  const fetchEmbedding = (text) => {
    if (!text) return;

    setIsEmbedding(true);

    fetch("http://localhost:8080/api/embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: text }),
    })
      .then((r) => r.json())
      .then((data) => {
        setEmbedVector(data.vector || null);
      })
      .finally(() => setIsEmbedding(false));
  };

  /** Step2 — DB 검색 */
  const fetchSearch = () => {
    setIsSearching(true);

    fetch("http://localhost:8080/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        vector: embedVector,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        const keyword = data.find((d) => d.type === "keyword");
        const vector = data.find((d) => d.type === "vector");

        setKeywordResult(keyword?.result || []);
        setVectorResult(vector?.result || []);
      })
      .finally(() => setIsSearching(false));
  };

  /** Step 이동 */
  const goNext = () => {
    if (step === 1) fetchSearch();
    setStep((prev) => prev + 1);
  };

  const goPrev = () => {
    if (step === 1) fetchSearch();
    setStep((prev) => prev - 1);
  };
  const handleStepClick = (targetStep) => {
    setStep(targetStep);
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-800 dark:text-white overflow-hidden">
      <NaviBar />

      {/* 검색창 */}
      <div className="shrink-0 flex justify-center pt-10 pb-10">
        <div className="w-full max-w-[750px]">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-hidden flex justify-center">
        <div
          className="w-full max-w-6xl h-full rounded-2xl border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-900 shadow-sm overflow-hidden"
        >
          <div className="h-full flex overflow-hidden">
            {/*  LEFT — StepFlow */}
            <div className="hidden lg:block w-[300px] border-r border-gray-300 dark:border-gray-700 p-8 overflow-y-auto">
              <StepFlow currentStep={step} onStepClick={handleStepClick} />
            </div>

            {/*  RIGHT — Step Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              <RightContent
                step={step}
                query={query}
                embedVector={embedVector}
                keyword={keywordResult}
                vector={vectorResult}
                isEmbedding={isEmbedding}
                isSearching={isSearching}
                onNext={goNext}
                onPrev={goPrev}
              />
            </div>

          </div>
        </div>
      </div>

      <footer className="shrink-0">
        <FooterSection />
      </footer>
    </div>
  );
}
