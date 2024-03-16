import { newsdetails } from "../data/newsdetails";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { city } from "../data/city";
import { Link } from "react-router-dom";
import { news } from "../data/news";
import { useState } from "react";
import slugify from "react-slugify";
import { navLinks } from "../constants/navlink";
import { useMediaQuery } from "react-responsive";
import BreadCrumb from "../ui/BreadCrumb";

function NewDetails() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const item1 = navLinks[0];
  const item2 = navLinks[1];
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  return (
    <div className="bg-white dark:bg-dark ">
      <BreadCrumb Hline={newsdetails.at(0).Hline}></BreadCrumb>
      <div className="mt-5">
        {newsdetails.map((item, i) => (
          <div key={i} className="text-center font-lexend text-3xl font-bold ">
            <h1>{item.Hline}</h1>
          </div>
        ))}
        <div className="mt-10 justify-center px-4 lg:flex ">
          {newsdetails.map((item, i) => (
            <div key={i} className="">
              <div className="py-4 lg:max-w-[700px]">
                <div className="flex items-center ">
                  <div className="w-[48px] rounded-full border-black">
                    <img src={item.img}></img>
                  </div>
                  <div className="pl-2">
                    <p>Được đăng bởi {item.UserID}</p>
                    <p>Cập nhật lần cuối vào {item.created_at}</p>
                  </div>
                </div>
                <div className="mt-5 font-lexend text-base font-medium ">
                  <p>{item.Summary}</p>
                </div>
                <div className="mt-5">
                  <p>{item.content}</p>
                  <img src={item.img2}></img>
                  <p>{item.content}</p>
                  <img src={item.img3}></img>
                  <p>{item.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div className=" lg:ml-9 lg:max-w-[300px]">
            <div className="rounded-md border-[1px] bg-white p-3 dark:bg-dark ">
              <h1 className="text-center text-xl font-bold">Tin nổi bật</h1>
              {news.map((item, i) => (
                <Link to={`/tin-tuc/${slugify(item.title)}`} key={i}>
                  <div key={i} className="py-3">
                    <i className="text-gray-400">{item.date}</i>
                    <h1 className="line-clamp-3 font-montserrat font-semibold">
                      {item.title}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-5 rounded-md border-[1px]  bg-white p-3 dark:bg-dark ">
              <h1 className="text-center text-lg font-semibold">
                Thị trường BDS tại 10 tỉnh/thành phố lớn
              </h1>
              {city.map((item, i) => (
                <div key={i} className="flex items-center py-3">
                  <img src={item.img} className="h-10 w-20 rounded-xl " />
                  <h1 className="pl-3">{item.cityname}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDesktopOrLaptop ? (
        <div className="flex w-full justify-center bg-white pb-10 pt-10 dark:bg-dark ">
          {navLinks.map((item) => (
            <div key={item.title} className="px-10">
              <h1 className="text-lg font-semibold">{item.title}</h1>
              {item.child_links.map((item2) => (
                <Link
                  to={`/${item.to}/${item2.type}`}
                  className="block"
                  key={item2.title}
                >
                  {item2.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="block bg-white dark:bg-dark">
          <div className="">
            <button
              onClick={() => setShow1((s) => !s)}
              className="w-full border-b-[1px] bg-white px-3 py-3 text-left dark:bg-dark"
            >
              <h1 className="flex items-center justify-between text-lg font-semibold">
                {item1.title}
                {show1 ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </h1>
            </button>
            {show1 && (
              <div>
                {item1.child_links.map((item1) => (
                  <Link className="block pl-5 pt-4" key={item1.title}>
                    {item1.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="pb-[50px] xl:pb-[0px]">
            <button
              onClick={() => setShow2((s) => !s)}
              className="w-full border-b-[1px] bg-white px-3 py-3  text-left dark:bg-dark"
            >
              <h1 className="flex items-center justify-between text-lg font-semibold">
                {item2.title}
                {show2 ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </h1>
            </button>
            {show2 && (
              <div>
                {item2.child_links.map((item2) => (
                  <Link className="block pl-5 pt-4" key={item2.title}>
                    {item2.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewDetails;
