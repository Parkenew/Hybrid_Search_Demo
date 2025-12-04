import ResultCard from "./ResultCard";

export default function ResultSection({ title, data }) {
  return (
    <div
      className="
        border dark:border-gray-600 
        dark:bg-gray-800
        flex flex-col
        h-full
        overflow-hidden
        rounded-xl
      "
    >
      <div className="p-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h2 className="font-bold text-lg text-center">{title}</h2>
      </div>
      <hr className=" border-gray-300 dark:border-gray-600" />

      {/* <hr className="border-gray-300 dark:border-gray-500" /> */}

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {data.length === 0 ? (
          <p className="opacity-60 text-center">결과 없음</p>
        ) : (
          <div className="flex flex-col ">
            {data.slice(0, 5).map((item, idx) => (
              <div
                key={idx}
                className={`pb-2 ${
                idx < 4 ? "border-b border-gray-300 dark:border-gray-600 mb-4" : ""
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
