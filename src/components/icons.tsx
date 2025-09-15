import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 8v4l3 3" />
      <path d="M22 12h-2" />
      <path d="M4 12H2" />
      <path d="M12 4V2" />
      <path d="m16.25 7.75-.7.7" />
       <path d="m8.45 15.55-.7.7" />
    </svg>
  ),
};
