import ResultSection from "./ResultSection";

export default function SearchResultLayout({
  keyword,
  vector,
  loading,
  hasSearched,
}) {
  // 아직 검색 안 했으면 아무것도 안 그림
  if (!hasSearched) return null;
  
  return (
    <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <ResultSection title="키워드 검색" data={keyword} loading={loading} />
      <ResultSection title="벡터 검색" data={vector} loading={loading} />
    </div>
  );
}
