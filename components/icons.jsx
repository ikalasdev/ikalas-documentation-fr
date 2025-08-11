import { forwardRef } from "react";

export const IkalasLogo = forwardRef(
  ({ height = 20, className = "", ...props }, ref) => (
    <svg
      ref={ref}
      height={height}
      viewBox="0 0 100 24"
      className={className}
      {...props}
    >
      <text x="0" y="18" fontSize="18" fontWeight="bold" fill="currentColor">
        Ikalas
      </text>
    </svg>
  )
);

IkalasLogo.displayName = "IkalasLogo";
