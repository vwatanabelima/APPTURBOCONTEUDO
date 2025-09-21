import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="256"
      height="256"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M 29.3,161.3 C 26.6,155.1 31.9,148.1 38.4,148.1 L 44.5,148.1 C 49.3,148.1 53.5,151.2 55.4,155.6 L 81.3,212.8 C 83.2,217.2 89.2,217.2 91.1,212.8 L 115.6,157.9 C 117.5,153.5 121.7,150.4 126.5,150.4 L 130,150.4 C 134.8,150.4 139,153.5 140.9,157.9 L 165.4,212.8 C 167.3,217.2 173.3,217.2 175.2,212.8 L 201.1,155.6 C 203,151.2 207.2,148.1 212,148.1 L 218.1,148.1 C 224.6,148.1 229.9,155.1 227.2,161.3 L 178.6,272.5 C 175.9,278.7 167.6,278.7 164.9,272.5 L 140.4,217.6 C 138.5,213.2 132.5,213.2 130.6,217.6 L 106.1,272.5 C 103.4,278.7 95.1,278.7 92.4,272.5 L 29.3,161.3 Z"
        fill="url(#logo-gradient)"
        transform="scale(0.8) translate(0, -90)"
      />
    </svg>
  ),
};
