import ResultCard from "./ResultCard";

function SkeletonRow() {
  return (
    <div
      className="
        p-5
        flex flex-col
        h-[116px]
        rounded-xl
        mt-3 mb-3
        animate-pulse
      "
    >
      {/* 제목 라인 (파란 링크 자리) */}
      <div className="mb-1">
        <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-700 rounded" />
      </div>

      {/* 본문 2줄 (line-clamp-2 자리) */}
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded" />
        <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default function ResultSection({ title, data,loading }) {
  return (
    <div
      className="
      border 
      border-gray-300 dark:border-gray-500 
      dark:bg-gray-800
      flex flex-col
      h-full
      overflow-hidden
      rounded-xl
      "
    >
    {/* <div
      className="
         dark:border-gray-600 
        flex flex-col
        h-[630px]
        
        overflow-hidden
        rounded-xl
      "
    > */}
      <div className="p-3 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h2 className="font-bold text-lg text-center">{title}</h2>
      </div>
      {/* <hr className=" border-gray-300 dark:border-gray-600" /> */}

      <hr className="border-gray-300 dark:border-gray-500" /> 

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* 스켈레톤 로딩 */}
        {loading ? (
          <div className="flex flex-col">
            <div className="border-b border-gray-100 dark:border-gray-700">
              <SkeletonRow />
            </div>
            <div className="border-b border-gray-100 dark:border-gray-700">
              <SkeletonRow />
            </div>
            <div className="border-b border-gray-100 dark:border-gray-700">
              <SkeletonRow />
            </div>
            <div className="border-b border-gray-100 dark:border-gray-700">
              <SkeletonRow />
            </div>
            <SkeletonRow />
          </div>
        ) : data.length === 0 ? (
          <p className="opacity-60 text-center">결과 없음</p>
        ) : (
          <div className="flex flex-col">
            {data.slice(0, 5).map((item, idx) => (
              <div
                key={idx}
                className={`${
                  idx < 4 ? "border-b border-gray-100 dark:border-gray-700" : ""
                }`}
              >
                <ResultCard
                  title={item.source?.title}
                  description={item.source?.description}
                  link={item.source?.link}
                  highlight={item.highlight}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
