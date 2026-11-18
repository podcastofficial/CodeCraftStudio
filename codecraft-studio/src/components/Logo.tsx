type LogoProps = { size?: number; idPrefix?: string; className?: string };

/** CodeCraft Studio mark: gradient circle, code braces and a gold spark. */
export function Logo({ size = 40, idPrefix = "cc", className }: LogoProps) {
  const bg = `${idPrefix}-bg`;
  const glow = `${idPrefix}-glow`;
  const brace = "M-9-26.5H-14Q-20-26.5-20-20V-7Q-20-1.6-26.3 0Q-20 1.6-20 7V20Q-20 26.5-14 26.5H-9";
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="CodeCraft Studio logo">
      <defs>
        <linearGradient id={bg} x1="8" y1="8" x2="92" y2="92" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#8737df" /><stop offset="1" stopColor="#d52b91" /></linearGradient>
        <radialGradient id={glow} cx="50" cy="50" r="24" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffe08a" stopOpacity=".6" /><stop offset="1" stopColor="#ffe08a" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill={`url(#${bg})`} />
      <circle cx="50" cy="50" r="46.5" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth=".8" />
      <circle cx="50" cy="50" r="24" fill={`url(#${glow})`} />
      <g transform="translate(50 50)" fill="none" stroke="#fff" strokeWidth="6.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={brace} />
        <path d={brace} transform="scale(-1 1)" />
      </g>
      <path d="M50 35.7Q53.5 46.5 64.3 50Q53.5 53.5 50 64.3Q46.5 53.5 35.7 50Q46.5 46.5 50 35.7Z" fill="#ffe08a" />
    </svg>
  );
}
