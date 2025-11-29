// src/components/HeaderLogo.jsx
export default function HeaderLogo() {
  return (
    <div className="absolute top-6 left-6">
      {/* 라이트 모드용 로고 (기본) */}
      <img
        src="/lloydk_black.png"
        alt="logo"
        className="w-80 h-18 block dark:hidden"
      />

      {/* 다크 모드용 로고 */}
      <img
        src="/lloydk_white.png"
        alt="logo"
        className="w-80 h-18 hidden dark:block"
      />
    </div>
  );
}
