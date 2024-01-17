import Spinner from "./Spinner";

function SpinnerFullPage() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-light dark:bg-dark">
      <Spinner inButton={false} height={35} width={35} />
    </div>
  );
}

export default SpinnerFullPage;
