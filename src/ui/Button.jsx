import { NavLink } from "react-router-dom";

function Button({ children, variant, to }) {
  if (to) {
    return (
      <NavLink className="" to={to}>
        {children}
      </NavLink>
    );
  }
  return <button className="">{children}</button>;
}

export default Button;
