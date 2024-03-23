import { NavLink } from "react-router-dom";
import DynamicFaIcon from "./DynamicFaIcon";

function MobileActionItem({ to, title, onClose, icon }) {
  return (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-4 py-3 pl-4 text-primary dark:text-secondary"
          : "flex items-center gap-4 py-3 pl-4 transition-colors duration-200 hover:text-primary dark:hover:text-secondary"
      }
    >
      <span className="text-xl">
        <DynamicFaIcon name={icon} />
      </span>
      <span>{title}</span>
    </NavLink>
  );
}

export default MobileActionItem;
