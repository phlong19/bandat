import { NavLink } from "react-router-dom";

function Button({ children, variant = "fill", to, onClick, icon, gap=true }) {
  const base = `${
    gap ? "gap-2" : "gap-0"
  } flex xl:gap-0 font-medium justify-center font-lexend lg:w-40 w-1/2 items-center text-base rounded-lg transition-all duration-300 py-3 px-3.5 opacity-90 hover:opacity-100 `;
  const variants = {
    light:
      base +
      "dark:text-light dark:border-light border-primary text-primary border",
    fill: base + "text-white bg-primary dark:bg-secondary dark:text-black",
  };

  if (to) {
    return (
      <NavLink className={variants[variant]} onClick={onClick} to={to}>
        <span className="text-base">{icon}</span>
        {children}
      </NavLink>
    );
  }
  return (
    <button onClick={onClick} className={variants[variant]}>
      <span className="text-base">{icon}</span>
      {children}
    </button>
  );
}

export default Button;
