import { useClickOutside } from "../hooks/useClickOutside";

function ToggleBox({ children, close, childX, type = false }) {
  const ref = useClickOutside(close, false);

  return (
    <div
      ref={ref}
      style={{ right: type ? childX - 65 : childX }}
      className={`${type ? "w-64" : "w-80"} fixed top-20 h-40 dark:bg-black bg-white`}
    >
      {children}
    </div>
  );
}

export default ToggleBox;
