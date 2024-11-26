import { SIZE_ICON } from "./constant";

const HomeIcon = ({ className, size = SIZE_ICON, color = 'currentColor' }: { className?: string; size?: number; color?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
      className={className}
      focusable="false"
    >
      <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7z"></path>
    </svg>
  );
  
  export default HomeIcon;