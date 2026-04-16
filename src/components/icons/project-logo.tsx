import type { SVGProps } from 'react';

export function ProjectLogo(props: SVGProps<SVGSVGElement>) {
  return (
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
      <path d="M12 2a10 10 0 0 0-9.4 13.5c.2.4.5.7.9.9s.8.3 1.2.3h14.6c.4 0 .8-.1 1.2-.3s.7-.5.9-.9A10 10 0 0 0 12 2Z" />
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M18 21a6 6 0 0 0-12 0" />
    </svg>
  );
}
