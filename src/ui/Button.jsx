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
  } flex font-medium justify-center font-lexend max-h-10 items-center text-sm rounded-lg transition-all duration-300 md:py-3 px-3.5 opacity-90 hover:opacity-100 `;
  const variants = {
    light:
      base +
      "dark:text-light dark:border-light border-dark text-dark border hover:text-primary dark:hover:text-secondary hover:border-primary dark:hover:border-secondary",
    fill:
      base +
      "text-white bg-primary border border-primary dark:border-secondary dark:bg-secondary dark:text-black",
  };

  if (to) {
    return (
      <NavLink className={variants[variant]} onClick={onClick} to={to}>
        <span className="text-sm">{icon}</span>
        {children}
      </NavLink>
    );
  }
  return (
    <button disabled={disabled} onClick={onClick} className={variants[variant]}>
      <span className="text-sm">{icon}</span>
      {children}
    </button>
  );
}

export default Button;
