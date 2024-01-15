function Spinner({ width = 20, height = 20, inButton = true }) {
  return (
    <div
      style={{ width: width, height: height }}
      className={`${
        inButton
          ? "border-light/50 border-t-light dark:border-dark/50 dark:border-t-dark"
          : "border-dark/50 border-t-dark dark:border-light/50 dark:border-t-light"
      } inline-block animate-spin rounded-full border-4  ease-linear `}
    ></div>
  );
}

export default Spinner;
