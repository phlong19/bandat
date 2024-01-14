import { useClickOutside } from "../hooks/useClickOutside";

function ToggleBox({ children, close }) {
  const ref = useClickOutside(close, false);

  return (
    <div ref={ref} className="bg fixed top-36 h-40 min-w-80">
      {children}
    </div>
  );
}

export default ToggleBox;
