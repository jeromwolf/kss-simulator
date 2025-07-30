export default function KSSLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Brain-like shape */}
      <path
        d="M16 4C11 4 8 7 8 10C6 10 4 12 4 14C4 16 5 17 6 17.5C6 19 7 20 8 20.5C8 22 9 23 10.5 23.5C11 25 13 26 15 26H17C19 26 21 25 21.5 23.5C23 23 24 22 24 20.5C25 20 26 19 26 17.5C27 17 28 16 28 14C28 12 26 10 24 10C24 7 21 4 16 4Z"
        stroke="url(#gradient1)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Neural connections */}
      <circle cx="12" cy="12" r="1.5" fill="url(#gradient1)" />
      <circle cx="20" cy="12" r="1.5" fill="url(#gradient1)" />
      <circle cx="16" cy="16" r="1.5" fill="url(#gradient1)" />
      
      <path
        d="M12 12L16 16M20 12L16 16"
        stroke="url(#gradient1)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B3FF2" />
          <stop offset="100%" stopColor="#9F55FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}