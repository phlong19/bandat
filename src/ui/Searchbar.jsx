function Searchbar() {
  return (
    <div className="mx-auto mb-3 md:w-96">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-prim-light bg-light bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-black focus:shadow-prim-light focus:outline-none dark:border-sec-light dark:bg-dark dark:text-white dark:placeholder:text-white dark:focus:border-secondary focus:dark:text-white dark:focus:shadow-sec-light"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon3"
        />

        {/* <!--Search button--> */}
        <button
          className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-black transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 dark:border-secondary dark:text-white"
          type="button"
          id="button-addon3"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
