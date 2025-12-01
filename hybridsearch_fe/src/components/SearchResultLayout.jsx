import ResultSection from "./ResultSection";

export default function SearchResultLayout({ keyword, vector }) {
  return (
    <div className="w-full overflow-hidden  max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 h-full px-4 ">
      
      {/* 섹션 높이 고정 + 내부 스크롤 */}
      <ResultSection title="키워드 검색" data={keyword} />
      <ResultSection title="벡터 검색" data={vector}/>


      {/* 하이브리드
      <ResultSection title="하이브리드 검색" data={hybrid} />
       재외 */}

    </div>
  );
}