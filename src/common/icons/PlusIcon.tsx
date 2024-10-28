import { SVGProps } from "react";

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
      {...props}
    >
      <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" />
    </svg>
  );
};
