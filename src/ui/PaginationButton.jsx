import Button from "./Button";

function PaginationButton({
  type = "light",
  children,
  onClick,
  disabled,
  icon,
}) {
  return (
    <Button
      variant={type}
      widthBase={false}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
    >
      {children}
    </Button>
  );
}

export default PaginationButton;
