import { motion } from "framer-motion";
import ResultSection from "./ResultSection";
import { useState, useEffect } from "react";

export default function RightContent({
  step,
  keyword = [],
  vector = [],
  query,
  embedVector,
  isEmbedding,
  isSearching,
  onNext,
  onPrev
}) {
  /* --------------------------- */
  /* Step2: 탭 상태              */
  /* --------------------------- */
  const [activeTab, setActiveTab] = useState("keyword");

  /* --------------------------- */
  /* Step3: 모달 & 채팅 상태     */
  /* --------------------------- */
  const [showResults, setShowResults] = useState(false);
  const [resultTab, setResultTab] = useState("keyword");
  const [messages, setMessages] = useState([]); // 사용자/LLM 메시지
  const [input, setInput] = useState("");

  /* Step3 처음 들어왔을 때 검색어 말풍선 생성 */
  useEffect(() => {
    if (step === 3 && query) {
      setMessages([{ role: "user", content: query }]); // 검색어 1개만 삽입
    }
  }, [step, query]);

  /* 메시지 전송 */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 사용자 메시지 → 오른쪽 말풍선
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    const userMessage = input;
    setInput("");

    // LLM 응답 (추후 API 연동 가능)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `“${userMessage}” 에 대한 LLM 응답 예시입니다.` },
      ]);
    }, 600);
  };

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-xl border-gray-300 py-10 px-4 dark:text-white 
                 dark:border-gray-700 bg-white dark:bg-gray-900"
    >

      {/* ------------------ STEP 1 ------------------ */}
      {step === 1 && (
        <>
          <h2 className="text-4xl md:text-4xl font-bold mb-10">1. 임베딩</h2>

          {isEmbedding ? (
            <div className="w-full min-h-[220px] flex flex-col">
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-3 rounded-lg border 
                  border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
                  px-5 py-3 text-gray-700 dark:text-gray-200 shadow-sm"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center">
                  <span
                    className="animate-spin h-5 w-5 border-4 border-gray-300 dark:border-gray-700 rounded-full"
                    style={{ borderTopColor: "#e30313" }}
                  />
                </span>
                <span className="font-semibold">의미 기반 벡터로 변환중…</span>
              </button>

              <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
                잠시만 기다려 주세요…
              </p>
            </div>
          ) : (
            <>
              {embedVector ? (
                <p className="text-black font-bold h-[30px] mb-2">임베딩 결과</p>
              ) : (
                <p className="text-red-500 font-semibold mb-4">
                  검색어가 없거나 임베딩에 실패했습니다.
                </p>
              )}

              {embedVector && (
                <div className="w-full h-[630px] border rounded-xl bg-gray-50 dark:bg-gray-800 flex flex-col p-4">
                  <p className="mt-2 text-xs text-gray-500">
                    ※ 상위 30 차원만 표시됩니다.
                  </p>
                  <pre className="mt-3 text-xs whitespace-pre-wrap break-all">
                     {JSON.stringify(embedVector.slice(0, 30), null, 2)}
                   </pre>
                </div>
              )}
              <div className="flex justify-between">
              { step > 1 ? (
                <button
                onClick={onPrev}
                className="mt-8 px-4 py-2 border border-gray-400 rounded-md 
                hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm font-bold"
              > 
              이전
              </button>
              ):(<div />)}
              <button
                onClick={onNext}
                disabled={!embedVector}
                className="mt-8 px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 
                dark:hover:bg-gray-800 transition text-sm font-bold disabled:opacity-40"
              >
                다음
              </button>
              </div>
            </>
          )}
        </>
      )}

      {/* ------------------ STEP 2 ------------------ */}
      {step === 2 && (
        <>
          <h2 className="text-4xl md:text-4xl font-bold mb-10">2. DB 검색</h2>

          {isSearching ? (
            <div className="w-full min-h-[220px] flex flex-col">
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-3 rounded-lg border 
                  border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
                  px-5 py-3 text-gray-700 dark:text-gray-200 shadow-sm"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center">
                  <span
                    className="animate-spin h-5 w-5 border-4 border-gray-300 dark:border-gray-700 rounded-full"
                    style={{ borderTopColor: "#e30313" }}
                  />
                </span>
                <span className="font-semibold">DB에서 데이터 검색중…</span>
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-6 h-[30px] mb-2">
                <span
                  onClick={() => setActiveTab("keyword")}
                  className={`cursor-pointer transition ${
                    activeTab === "keyword"
                      ? "font-bold text-lg underline underline-offset-4"
                      : "opacity-60"
                  }`}
                >
                  키워드 검색
                </span>

                <span
                  onClick={() => setActiveTab("vector")}
                  className={`cursor-pointer transition ${
                    activeTab === "vector"
                      ? "font-bold text-lg underline underline-offset-4"
                      : "opacity-60"
                  }`}
                >
                  벡터 검색
                </span>
              </div>

              {activeTab === "keyword" ? (
                <ResultSection title="키워드 검색 결과" data={keyword} />
              ) : (
                <ResultSection title="벡터 검색 결과" data={vector} />
              )}
              <div className="flex justify-between">
                <button
                  onClick={onPrev}
                  className="mt-8 px-4 py-2 border border-gray-400 rounded-md 
                  hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm font-bold"
                > 
                이전
                </button>
                <button
                  onClick={onNext}
                  className="mt-8 px-4 py-2 border border-gray-400 rounded-md 
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm font-bold"
                >
                  다음
                </button>
              </div>
              
            </>
          )}
        </>
      )}

      {/* ------------------ STEP 3 ------------------ */}
      {step === 3 && (
        <>
          <h2 className="text-4xl md:text-4xl font-bold mb-10">3. RAG 테스트</h2>
          <p className="text-black font-bold h-[30px] mb-2">검색 결과를 바탕으로 RAG 구성</p>
          {/* 전체 채팅 박스 */}
          <div className="w-full h-[630px] border rounded-xl bg-gray-50 dark:bg-gray-800 flex flex-col">

            {/* 메시지 영역 */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">

              {/* 오른쪽: 검색어 */}
              <div className="flex justify-end mt-10">
                <div className="max-w-[70%] bg-black font-bold text-white px-4 py-3 rounded-2xl text-sm shadow">
                  {query}
                </div>
              </div>

              {/* 왼쪽: 검색결과 보기 */}
              <div className="flex justify-start">
                <div className="max-w-[75%] bg-white dark:bg-gray-700 px-4 py-3 rounded-2xl shadow text-sm">
                  <button
                    onClick={() => setShowResults(true)}
                    className="underline font-semibold hover:opacity-80"
                  >
                    검색결과 보기
                  </button>
                </div>
              </div>

              {/* 나머지 채팅 메시지 */}
              {messages.slice(1).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl shadow text-sm whitespace-pre-line 
                      ${
                        msg.role === "user"
                          ? "bg-black text-white font-bold" 
                          : "bg-white dark:bg-gray-700 text-black dark:text-white"
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* 입력창 */}
            <form
              className="p-3 flex items-center gap-3 border-t dark:border-gray-600"
              onSubmit={handleSendMessage}
            >
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-xl border focus:outline-none
                           dark:bg-gray-800 dark:border-gray-600 font-semibold" 
                placeholder="무엇이든 물어보세요."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-xl shadow font-bold"
              >
                전송
              </button>
            </form>
          </div>

          <div className="flex justify-between">
              { step > 1 ? (
                <button
                onClick={onPrev}
                className="mt-8 px-4 py-2 border border-gray-400 rounded-md 
                hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm font-bold"
              > 
              이전
              </button>
              ):(<div />)}
            <button
                onClick={onNext}
                disabled={!embedVector}
                className="mt-8 px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 
                dark:hover:bg-gray-800 transition text-sm font-bold disabled:opacity-40"
              >
                다음
            </button>
          </div>
          {/* 모달 (검색결과 보기) */}
          {showResults && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="w-[600px] max-h-[80vh] bg-white dark:bg-gray-800 rounded-xl p-5 shadow-xl overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">검색결과</h3>
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex gap-6 h-[30px] mb-2">
                <span
                  onClick={() => setActiveTab("keyword")}
                  className={`cursor-pointer transition ${
                    activeTab === "keyword"
                      ? "font-bold text-lg underline underline-offset-4"
                      : "opacity-60"
                  }`}
                >
                  키워드 검색
                </span>

                <span
                  onClick={() => setActiveTab("vector")}
                  className={`cursor-pointer transition ${
                    activeTab === "vector"
                      ? "font-bold text-lg underline underline-offset-4"
                      : "opacity-60"
                  }`}
                >
                  벡터 검색
                </span>
              </div>

                {resultTab === "keyword" ? (
                  <ResultSection title="키워드 검색" data={keyword} />
                ) : (
                  <ResultSection title="벡터 검색" data={vector} />
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ------------------ STEP 4 ------------------ */}
      {step === 4 && (
        <>
          <h2 className="text-4xl md:text-4xl font-bold mb-10">4. 결과</h2>
          <p className="text-gray-600 mb-2">검색 품질이 RAG에 중요한 키워드!</p>
        </>
      )}
    </motion.div>
  );
}
