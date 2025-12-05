export default function StepFlow({ currentStep = 1, phase = "running" }) {
    const steps = [
      { label: "Step 1.", kor: "임베딩" },
      { label: "Step 2.", kor: "DB검색" },
      { label: "Step 3.", kor: "검색 결과 (키워드, 벡터)" },
      { label: "Step 4.", kor: "RAG 구성" },
      { label: "Step 5.", kor: "최종 답변 생성" },
    ];
  
    return (
      <section className="w-full py-10 px-4 flex justify-center">
        <div className="w-full max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-gray-300 mb-10">
            Steps
          </h2>
  
          <div className="relative">
            <div className="flex flex-col">
              {steps.map((step, idx) => {
                const stepNumber = idx + 1;
  
                const isPast = stepNumber < currentStep;        // ✅ 지난 단계
                const isActive = stepNumber === currentStep;    // ✅ 현재 단계
                const isOn = isPast || isActive;                // ✅ 빨간색 적용 기준
  
                const isDoneBadge = isActive && phase === "done"; // (원하면 현재 단계 완료 표시)
  
                return (
                  <div
                    key={idx}
                    className={`relative flex items-start gap-5 ${
                      idx < steps.length - 1 ? "pb-10" : ""
                    }`}
                  >
                    {/* 원: 지난/현재는 빨강, 미래는 회색 */}
                    <div
                      className={`absolute left-4 top-1 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-gray-100 shadow-md z-10
                        ${isOn ? "bg-lloydkRed" : "bg-gray-300"}
                      `}
                    />
  
                    {/* 세로 라인: 지난/현재 구간은 빨강, 미래 구간은 회색 */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-4 top-6 -translate-x-1/2 w-[2px] h-full
                          ${stepNumber < currentStep ? "bg-gray-300" : "bg-gray-100"}
                        `}
                      />
                    )}
  
                    {/* 텍스트 */}
                    <div className="ml-8">
                      <h3
                        className={`text-base md:text-lg font-semibold leading-tight ${
                          isOn ? "text-lloydkRed" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                        {isDoneBadge && (
                          <span className="ml-2 text-xs md:text-sm font-bold text-gray-500">
                            완료
                          </span>
                        )}
                      </h3>
  
                      <p
                        className={`font-bold mt-1 whitespace-pre-line ${
                          isOn ? "text-lloydkRed" : "text-gray-400"
                        }`}
                      >
                        {step.kor}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
  