import { news } from "../data/news";
import { city } from "../data/city";
import { navLinks } from "../constants/navlink";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BsHouse } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import Button from "../ui/Button";

function News() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const item1 = navLinks[0];
  const item2 = navLinks[1];
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <div>
      <div className="flex w-full items-center border-b bg-light pb-5 pt-[20px] dark:bg-dark">
        <div className="flex w-full items-center gap-2 pl-2.5 xl:pl-[50px] ">
          <div className="">
            <Link to="/" className="dark:text-light">
              <BsHouse />
            </Link>
          </div>
          <div className="">
            <IoIosArrowForward />
          </div>
          <Link to="/tin-tuc" className="pt-[3px]">
            <h1 className="font-semibold">Tin tức</h1>
          </Link>
        </div>
      </div>
      <div className="max-w-full bg-light dark:bg-dark">
        <div className="mx-auto flex max-w-[800px] flex-col  items-center bg-light pb-10 pt-10 text-center dark:bg-dark">
          <h1 className="font-lexend text-2xl font-bold md:text-3xl">
            Tin tức bất động sản mới nhất
          </h1>
          <p className="pt-2 text-base font-semibold lg:text-lg">
            Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam
            thông qua dữ liệu lớn về giá, giao dịch, nguồn cung - cầu và khảo
            sát thực tế của đội ngũ phóng viên, biên tập của LandHub.com.vn.
          </p>
        </div>
      </div>
      <div className="m-auto block bg-light px-6 dark:bg-dark xl:flex ">
        <div className="m-auto block bg-light dark:bg-dark">
          {news.map((item, i) => (
            <div
              key={i}
              className="flex h-40 max-w-[1000px] items-center border-b-[1px] bg-light dark:border-dark dark:border-b-light dark:bg-dark xl:max-w-[800px]"
            >
              <img
                src={item.img}
                className="h-24 max-h-28 w-40 max-w-[200px] rounded-lg sm:h-auto sm:w-auto"
              />
              <div className="pl-2.5">
                <i className="text-gray-400">{item.date}</i>
                <h1 className="line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                  {item.title}
                </h1>
                <p className=" line-clamp-2 text-xs md:line-clamp-3 md:text-[13px] lg:text-sm">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-center p-5 text-center dark:bg-dark">
            <Button variant="light" icon={<IoIosArrowDown />}>
              Xem thêm
            </Button>
          </div>
        </div>
        <div className="block pb-5 pr-0 pt-5 xl:pr-[50px] ">
          <div className="block max-w-[1000px] rounded-lg  bg-slate-300 p-5 dark:bg-gray-800 xl:max-w-[250px] ">
            <h1 className="pb-2 text-center text-xl font-semibold">
              Tin nổi bật
            </h1>
            {news.map((item, i) => (
              <div
                key={i}
                className="border-b-[1px] px-2.5 py-2 last:border-b-0"
              >
                <i className="text-gray-400">{item.date}</i>
                <h1 className="text-base">{item.title}</h1>
              </div>
            ))}
          </div>
          <div className="block pt-5">
            <div className="block max-w-[1000px] rounded-lg  bg-slate-200 p-5 dark:bg-gray-700 xl:max-w-[250px] ">
              <h1 className="font-semibold">
                Thị trường BDS tại tỉnh/thành phố
              </h1>
              {city.map((item, i) => (
                <div key={i} className="m-auto flex items-center pt-5">
                  <img src={item.img} className="h-7 w-10 rounded-lg" />
                  <h1 className="pl-2.5">{item.cityname}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDesktopOrLaptop ? (
        <div className="flex w-full justify-center bg-light pb-10 pt-10 dark:bg-dark ">
          {navLinks.map((item) => (
            <div key={item.title} className="px-10">
              <h1 className="text-lg font-semibold">{item.title}</h1>
              {item.child_links.map((item2) => (
                <p key={item2.title}>{item2.title}</p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="block bg-light dark:bg-dark">
          <div className="">
            <button
              onClick={() => setShow1((s) => !s)}
              className="w-full border-b-[1px] bg-light px-3 py-3 text-left dark:bg-dark"
            >
              <h1 className="flex items-center justify-between text-lg font-semibold">
                {item1.title}
                {show1 ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </h1>
            </button>
            {show1 && (
              <div>
                {item1.child_links.map((item1) => (
                  <p className="pl-5 pt-4" key={item1.title}>
                    {item1.title}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="pb-[50px] xl:pb-[0px]">
            <button
              onClick={() => setShow2((s) => !s)}
              className="w-full border-b-[1px] bg-light px-3 py-3  text-left dark:bg-dark"
            >
              <h1 className="flex items-center justify-between text-lg font-semibold">
                {item2.title}
                {show2 ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </h1>
            </button>
            {show2 && (
              <div>
                {item2.child_links.map((item2) => (
                  <p className="pl-5 pt-4" key={item2.title}>
                    {item2.title}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
