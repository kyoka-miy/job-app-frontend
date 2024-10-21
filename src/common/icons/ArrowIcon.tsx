import { SVGProps } from "react";

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
      {...props}
    >
      <path d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z" />
    </svg>
  );
};
