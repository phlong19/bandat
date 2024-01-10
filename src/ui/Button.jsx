import { NavLink } from "react-router-dom";

function Button({ children, variant, to,onClick }) {
  if (to) {
    return (
      <NavLink className="" to={to}>
        {children}
      </NavLink>
    );
  }
  return <button onClick={onClick} className="">{children}</button>;
}

export default Button;
