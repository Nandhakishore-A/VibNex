import { cn } from "../../utils/cn.js";

/**
 * VIBNEX Logo — Geometric cyan 'V' glyph with glowing gradient and modern bold wordmark.
 */
export default function Logo({ wordmark = true, className = "" }) {
  const viewBox = wordmark ? "0 0 155 36" : "0 0 36 36";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      role="img"
      aria-label="VIBNEX"
      className={cn("block", className)}
    >
      <defs>
        <linearGradient id="vibnex-cyan-logo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F2FE" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Modern VIBNEX V Glyph */}
      <g transform="translate(1, 1)">
        <path
          d="M4 6 L14 28 Q17 33 20 28 L30 6"
          stroke="url(#vibnex-cyan-logo)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 8 L17 21 L24 8"
          stroke="url(#vibnex-cyan-logo)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* VIBNEX Wordmark */}
      {wordmark && (
        <text
          x="44"
          y="26"
          fill="currentColor"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="21"
          letterSpacing="0.08em"
          className="text-slate-900 dark:text-white"
        >
          VIBNEX
        </text>
      )}
    </svg>
  );
}
