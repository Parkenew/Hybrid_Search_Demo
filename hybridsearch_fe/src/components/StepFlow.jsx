import { useState } from "react";

export default function StepFlow({
  currentStep = 1,
  phase = "running",
  onStepClick,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const steps = [
    { label: "Step 1.", kor: "임베딩" },
    { label: "Step 2.", kor: "DB검색" },
    { label: "Step 3.", kor: "RAG 테스트" },
    { label: "Step 4.", kor: "결과" },
  ];

  const handleClick = (stepNumber, isPast) => {
    if (isPast && onStepClick) onStepClick(stepNumber);
  };

  return (
    <>
      {/* ▣▣▣ MOBILE (Accordion) ▣▣▣ */}
      <div className="lg:hidden w-full mb-6">
        {/* 상단 버튼 */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex justify-between items-center px-4 py-3 
                     border rounded-xl bg-gray-100 dark:bg-gray-800"
        >
          <span className="font-bold">Steps</span>
          <span className="text-xl">{mobileOpen ? "▲" : "▼"}</span>
        </button>

        {/* 아코디언 내용 */}
        {mobileOpen && (
          <div className="mt-2 border rounded-xl bg-white dark:bg-gray-900">
            {steps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isPast = stepNumber < currentStep;
              const isActive = stepNumber === currentStep;
              const clickable = isPast;

              return (
                <div
                  key={idx}
                  className={`px-4 py-3 border-b last:border-none 
                    ${isActive ? "text-lloydkRed font-bold" : "text-gray-500"}
                    ${clickable ? "cursor-pointer" : "cursor-default"}
                  `}
                  onClick={() => clickable && handleClick(stepNumber, clickable)}
                >
                  {step.label} {step.kor}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ▣▣▣ DESKTOP VERSION (Original UI) ▣▣▣ */}
      <section className="hidden lg:block w-full py-10 px-4">
        <h2 className="text-4xl font-bold mb-10">Steps</h2>

        <div className="relative">
          <div className="flex flex-col">
            {steps.map((step, idx) => {
              const stepNumber = idx + 1;

              const isPast = stepNumber < currentStep;
              const isActive = stepNumber === currentStep;
              const isOn = isPast || isActive;
              const isDoneBadge = isActive && phase === "done";

              const clickable = isPast;

              return (
                <div
                  key={idx}
                  className={`relative flex items-start gap-5 ${
                    idx < steps.length - 1 ? "pb-10" : ""
                  }`}
                >
                  {/* 원 */}
                  <div
                    onClick={() => handleClick(stepNumber, clickable)}
                    className={`absolute left-4 top-1 -translate-x-1/2 w-5 h-5 
                      rounded-full border-4 border-gray-100 shadow-md z-10
                      ${isOn ? "bg-lloydkRed" : "bg-gray-300"}
                    `}
                    style={{ cursor: clickable ? "pointer" : "default" }}
                  />

                  {/* 세로 라인 */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-6 -translate-x-1/2 w-[2px] h-full
                        bg-gray-200 dark:bg-gray-600
                      `}
                    />
                  )}

                  {/* 텍스트 영역 */}
                  <div
                    className="ml-8"
                    onClick={() => handleClick(stepNumber, clickable)}
                    style={{
                      cursor: clickable ? "pointer" : "default",
                    }}
                  >
                    <h3
                      className={`text-lg font-semibold leading-tight ${
                        isOn ? "text-lloydkRed" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                      {isDoneBadge && (
                        <span className="ml-2 text-xs font-bold text-gray-500">
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
      </section>
    </>
  );
}
