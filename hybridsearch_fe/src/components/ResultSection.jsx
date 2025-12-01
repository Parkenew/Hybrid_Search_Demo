import ResultCard from "./ResultCard";

export default function ResultSection({ title, data }) {
  return (
    <div
      className="
        border dark:border-gray-500 shadow-sm
        dark:bg-gray-700
        flex flex-col
        h-full
        overflow-hidden
      "
    >
      {/* 타이틀 고정 영역 */}
      <div className="p-4 sticky top-0 bg-white dark:bg-gray-700 z-10">
        <h2 className="font-bold text-lg text-center">{title}</h2>
      </div>
      <hr className=" border-gray-300 dark:border-gray-500" />
      {/* 내용 스크롤 영역 */}
      <div
        className="
          flex-1 overflow-y-auto p-4 
          custom-scrollbar
        "
      >
        {data.length === 0 ? (
          <p className="opacity-60 text-center">결과 없음</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data.slice(0, 5).map((item, idx) => (
              <ResultCard
                key={idx}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
