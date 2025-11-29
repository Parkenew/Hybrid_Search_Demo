export default function HeaderSection() {
  return (
    <div className="w-full flex items-center justify-center mb-5">
      <div className="flex justify-center">
        {/* 라이트 모드용 로고 (기본) */}
        <img
          src="/lloydk_black.png"
          alt="logo"
          className="w-80 block dark:hidden"
        />

        {/* 다크 모드용 로고 */}
        <img
          src="/lloydk_white.png"
          alt="logo"
          className="w-80 hidden dark:block"
        />
      </div>
    </div>
  );
}
