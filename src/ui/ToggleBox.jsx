import { useClickOutside } from "../hooks/useClickOutside";

function ToggleBox({ children, close, childX, type = false }) {
  const ref = useClickOutside(close, false);

  return (
    <div
      ref={ref}
      style={{ right: type ? childX - 65 : childX }}
      className={`${type ? "w-64 mx-auto" : "w-80"} fixed top-20 min-h-40 rounded-lg shadow-sm shadow-black/25 dark:shadow-white/25 dark:bg-black bg-white p-4`}
    >
      {children}
    </div>
  );
}

export default ToggleBox;
