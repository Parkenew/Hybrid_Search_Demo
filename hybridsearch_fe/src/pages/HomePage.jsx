import ExplainSection from "../components/ExplainSection";
import SearchBar from "../components/SearchBar";
import LogoSection from "../components/LogoSection";
import FooterSection from "../components/FooterSection";
import ThemeToggle from "../components/ThemeToggle";
import SampleKeyword from "../components/SampleKeyword";

export default function HomePage() {
  
  return (
    <div className="min-h-screen bg-white flex flex-col dark:bg-gray-800 dark:text-white transition-colors">
      {/* 🔥 가운데 카드 섹션 (항상 세로 중앙 유지) */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-[750px] flex flex-col">
          <LogoSection />
          <div className="mt-6 pb-2">
          <SearchBar/>
          </div>
          <SampleKeyword />
          <ExplainSection />
        </div>
      </div>

      {/* 🔥 푸터 섹션 (항상 맨 아래, 중앙 섹션 깨지지 않음) */}
      <FooterSection />
    </div>
  );
}
