import { SVGProps } from "react";

export const CompanyIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="currentColor"
      {...props}
    >
      <path d="M144-144v-528h144v-144h360v288h168v384H528v-144h-96v144H144Zm72-72h72v-72h-72v72Zm0-156h72v-72h-72v72Zm0-156h72v-72h-72v72Zm144 156h72v-72h-72v72Zm0-156h72v-72h-72v72Zm0-144h72v-72h-72v72Zm144 300h72v-72h-72v72Zm0-156h72v-72h-72v72Zm0-144h72v-72h-72v72Zm168 456h72v-72h-72v72Zm0-156h72v-72h-72v72Z" />
    </svg>
  );
};
