function MiniSpinner({ width=20, height=20 }) {
  return (
    <div
      style={{ width: width, height: height }}
      className="rounded-full inline-block animate-spin border-t-light dark:border-t-dark border-4 border-light/50 dark:border-dark/50 ease-linear"
    ></div>
  );
}

export default MiniSpinner;
