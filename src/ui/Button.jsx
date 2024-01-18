import { NavLink } from "react-router-dom";

function Button({
  children,
  disabled,
  variant = "fill",
  to,
  onClick,
  icon,
  width = false,
  basePY = true,
  widthBase = true,
}) {
  const base = `${icon ? "gap-2" : "gap-0"} ${
    width ? "md:w-32" : "xl:w-auto"
  } ${widthBase ? "w-1/2" : ""} ${
    basePY ? "py-6" : "py-2.5"
  } flex font-medium justify-center font-lexend max-h-10 items-center text-base rounded-lg transition-all duration-300 md:py-3 px-3.5 opacity-90 hover:opacity-100 `;
  const variants = {
    light:
      base +
      "dark:text-light dark:border-light border-primary text-primary border",
    fill:
      base +
      "text-white bg-primary border border-primary dark:border-secondary dark:bg-secondary dark:text-black",
  };
  // FIX width to be more re-usable out side action
  if (to) {
    return (
      <NavLink className={variants[variant]} onClick={onClick} to={to}>
        <span className="text-lg">{icon}</span>
        {children}
      </NavLink>
    );
  }
  return (
    <button disabled={disabled} onClick={onClick} className={variants[variant]}>
      <span className="text-lg">{icon}</span>
      {children}
    </button>
  );
}

export default Button;
