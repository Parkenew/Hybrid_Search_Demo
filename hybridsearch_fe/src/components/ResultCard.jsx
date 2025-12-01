import { useState } from "react";

export default function ResultCard({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="border rounded-sm p-5 h-[170px] shadow-sm cursor-pointer 
                   hover:shadow-xl hover:scale-[1.02] transition-all ease-out
                   bg-gray-100 dark:bg-gray-600 dark:border-gray-700 flex flex-col"
        onClick={() => setOpen(true)}
      >
        {/* 상단 50% - 질문 */}
        <div className="flex-1 overflow-hidden">
          <p className="font-normal text-gray-800 dark:text-white
      line-clamp-2">
          {"Q. " + question}
          </p>
        </div>

        {/* 구분선 */}
        <hr className="my-3 border-gray-300 dark:border-gray-700" />

        {/* 하단 50% - 답변 */}
        <div className="flex-1 overflow-hidden">
          <p className="font-normal text-gray-800 dark:text-white
      line-clamp-2">
            {"A. " + answer}
          </p>
        </div>
      </div>

      {/* 팝업 */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-sm p-6 w-[90%] max-w-[600px] shadow-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">전체 내용</h3>

            <p className="mb-3 font-bold">
              Q.<span className="font-normal text-gray-700 dark:text-gray-300 ml-1">
                {question}
              </span>
            </p>

            <p className="font-bold">
              A.<span className="font-normal text-gray-700 dark:text-gray-300 ml-1">
                {answer}
              </span>
            </p>

            <button
              className="mt-6 w-full py-2 bg-black dark:bg-gray-700 text-white rounded-sm hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
