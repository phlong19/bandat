import { NavLink } from "react-router-dom";

function Button({ children, variant = "fill", to, onClick, icon, className }) {
  const base =
    "inline-flex gap-2 justify-center font-medium font-lexend w-[calc(50%-24px)] items-center text-base sm:text-lg rounded-lg transition-all duration-300 py-3 px-3.5 opacity-90 hover:opacity-100 ";
  const variants = {
    light:
      base +
      "dark:text-light dark:border-light border-primary text-primary border",
    fill: base + "text-white bg-primary dark:bg-secondary dark:text-black",
  };

  if (to) {
    return (
      <NavLink
        className={variants[variant]}
        onClick={onClick}
        to={to}
      >
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
