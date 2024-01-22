import { Link } from "react-router-dom";
import { homeLinks } from "../constants/navlink";
import HomePageList from "../features/list/HomePageList";
import Searchbar from "../ui/Searchbar";

function Home() {
  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] bg-light px-1 pt-3 text-dark dark:bg-dark dark:text-light">
      <ul className="flex w-full items-center justify-center gap-3 xl:hidden">
        {homeLinks.map((link) => (
          <li
            key={link.title}
            className="h-[85px] w-1/3 rounded-lg border border-light text-center text-base shadow shadow-dark dark:border-dark dark:shadow-light"
          >
            <Link to={link.to}>
              <img src={link.img} alt={link.title} className="mx-auto pb-1.5" />
              <span>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* content */}
      <div className="mt-4">
        <h2 className="pb-4 pt-6 font-lexend text-xl font-medium">
          Bất động sản dành cho bạn
        </h2>
        <Searchbar />
        {/* homepage list */}
       <HomePageList />
      </div>
      
      {/* <button
        onClick={() =>
          toast.success(
            "hello this is a success message and is a really long one, for stimulate when we have some database error or unexpected ones, let write some more to see if it break the line and go down more and more",
          )
        }
      >
        make a toast
      </button>
      <br />
      <button onClick={() => toast.dismiss()}>dismiss</button>
      <br />
      <button
        onClick={toast(
          (t) => (
            <div className="flex gap-3">
              <span>
                can be a custom message, to make a reusable custom toast
                component
              </span>
              <button onClick={() => toast.dismiss(t.id)} className="text-2xl">
                <FaXmark />
              </button>
            </div>
          ),
          { icon: "🔥", duration: 3000 },
        )}
      >
        custom toast
      </button> */}
    </div>
  );
}

export default Home;
