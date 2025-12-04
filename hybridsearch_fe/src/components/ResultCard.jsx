export default function ResultCard({ title, description, link, highlight }) {
  // highlight 반영
  const highlightedTitle = highlight?.title?.[0] || title;
  const highlightedDescription = highlight?.description?.[0] || description;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        p-5 
        flex flex-col 
        h-[130px] 
        cursor-pointer
        rounded-xl
        hover:bg-gray-50 
        dark:hover:bg-gray-700
        transition
    
      "
    >
      {/* 제목 */}
      <div className="mb-3">
        <span
          className="font-extrabold text-blue-600 dark:text-blue-300 underline-offset-2 hover:underline"
          dangerouslySetInnerHTML={{ __html: highlightedTitle }}
        />
      </div>

      {/* 본문 — 클릭해도 링크지만 hover 스타일 없음 */}
      <div className="flex-1">
        <p
          className="text-gray-800 dark:text-gray-100 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: highlightedDescription }}
        />
      </div>
    </a>
  );
}
