import { useEffect, useState } from "react";
import NaviBar from "../components/NaviBar";
import FooterSection from "../components/FooterSection";
import StepFlow from "../components/StepFlow";
import RightContent from "../components/RightContent";

export default function RagFlowPage() {
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState("running"); // "running" | "done"

  useEffect(() => {
    // 3번 도착하면 멈춤 (4,5까지 가려면 5로 바꾸면 됨)
    if (step >= 3) return;

    const RUN_MS = 1600;
    const DONE_MS = 1000;

    setPhase("running");

    const tDone = setTimeout(() => {
      setPhase("done");
    }, RUN_MS);

    const tNext = setTimeout(() => {
      setStep((s) => s + 1);
      setPhase("running");
    }, RUN_MS + DONE_MS);

    return () => {
      clearTimeout(tDone);
      clearTimeout(tNext);
    };
  }, [step]);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-800 dark:text-white overflow-hidden">
      <NaviBar />

      {/* 가운데 영역 */}
      <div className="flex-1 overflow-hidden flex justify-center px-6 py-8">
        {/* 중앙 박스(Card) */}
        <div className="w-full max-w-6xl h-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          {/* 박스 내부 좌/우 분할 */}
          <div className="h-full flex overflow-hidden">
            {/* 좌측 Step */}
            <div className="w-[340px] border-r border-gray-300 dark:border-gray-700 p-8 overflow-y-auto">
              {/* ✅ StepFlow가 currentStep을 쓰는 버전이어도 동작하도록 */}
              <StepFlow currentStep={step} phase={phase} />
            </div>

            {/* 우측 결과 */}
            <div className="flex-1 p-8 overflow-y-auto">
              {/* ✅ phase 변화에도 화면이 갱신/전환되도록 key 부여 */}
              <RightContent key={`${step}-${phase}`} step={step} phase={phase} />
            </div>
          </div>
        </div>
      </div>

      <footer className="shrink-0">
        <FooterSection />
      </footer>
    </div>
  );
}
