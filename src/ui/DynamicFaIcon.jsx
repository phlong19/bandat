import * as Icons from "react-icons/fa6";

function DynamicFaIcon({ name }) {
  const icon = "Fa" + name;
  const Component = Icons[icon];
  return <Component />;
}

export default DynamicFaIcon;
