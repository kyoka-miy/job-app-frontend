import { SVGProps } from "react";

export const MapIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="currentColor"
      {...props}
    >
      <path d="m600-144-240-72-153 51q-23 8-43-6t-20-40v-498q0-16 9.5-28.5T177-755l183-61 240 72 153-51q23-10 43 5t20 41v498q0 16-9 29t-24 17l-183 61Zm-36-86v-450l-168-50v450l168 50Zm72-2 108-36v-448l-108 36v448Zm-420-12 108-36v-448l-108 36v448Zm420-436v448-448Zm-312-48v448-448Z" />
    </svg>
  );
};