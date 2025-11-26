import ExplainSection from "./components/ExplainSection";
import SearchBar from "./components/SearchBar";
import LogoSection from "./components/LogoSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 🔥 가운데 카드 섹션 (항상 세로 중앙 유지) */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-[750px] flex flex-col gap-5">
          <LogoSection />
          <SearchBar />
          <ExplainSection />
        </div>
      </div>

      {/* 🔥 푸터 섹션 (항상 맨 아래, 중앙 섹션 깨지지 않음) */}
      <FooterSection />
    </div>
  );
}
