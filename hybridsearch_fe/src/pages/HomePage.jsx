import ExplainSection from "../components/ExplainSection";
import SearchBar from "../components/SearchBar";
import LogoSection from "../components/LogoSection";
import FooterSection from "../components/FooterSection";
import ThemeToggle from "../components/ThemeToggle";
import SampleKeyword from "../components/SampleKeyword";
import NaviBar from "../components/NaviBar";

export default function HomePage() {
  
  return (
    <div className="min-h-screen bg-white flex flex-col dark:bg-gray-800 dark:text-white transition-colors">
      {/* <div className="absolute top-2 right-6">
        <ThemeToggle />
      </div> */}
      <NaviBar hideLogo/>
      <div className="flex-1 flex justify-center items-center overflow-y-auto">
        <div className="w-full max-w-[750px] flex flex-col mb-32">
          <LogoSection />
          <div className="pt-4 pb-4">
          <SearchBar/>
          </div>
          <SampleKeyword />
          {/* <ExplainSection /> */}
        </div>
      </div>
   
      <footer className="shrink-0">
        <FooterSection />
      </footer>
    </div>
  );
}
