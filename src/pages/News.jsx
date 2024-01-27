import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import Button from "../ui/Button";

import { city } from "../data/city";
import { navLinks } from "../constants/navlink";
import { news } from "../data/news";

function News() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const item1 = navLinks[0];
  const item2 = navLinks[1];
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  return (
    <div>
      {/* <div className="flex w-full items-center border-b bg-white pb-5 pt-[20px] dark:bg-dark">
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
      </div> */}
      <div className="max-w-full bg-white dark:bg-dark">
        <div className="mx-auto flex max-w-[800px] flex-col items-center bg-white py-10 text-center dark:bg-dark">
          <h1 className="font-lexend text-2xl font-bold md:text-4xl">
            Tin tức bất động sản mới nhất
          </h1>
          <p className="p-3 font-lexend text-base lg:text-xl">
            Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam
            thông qua dữ liệu lớn về giá, giao dịch, nguồn cung - cầu và khảo
            sát thực tế của đội ngũ phóng viên, biên tập của LandHub.com.vn.
          </p>
        </div>
      </div>
      <div className="justify-center bg-white dark:bg-dark lg:flex ">
        <div className="bg-white px-3.5 dark:bg-dark">
          {news.map((item, i) => (
            <div
              key={i}
              className="mb-6 rounded-md bg-white shadow-md dark:bg-dark lg:mb-5 lg:flex lg:max-w-[800px] lg:items-center lg:rounded-none lg:border-b-[1px] lg:bg-white lg:pb-5 lg:shadow-none"
            >
              <img
                src={item.img}
                className="w-full rounded-t-md lg:h-[150px] lg:w-[260px] lg:rounded-md"
              />
              <div className="p-3">
                <i className="text-gray-400">{item.date}</i>
                <h1 className="py-2 font-montserrat text-base font-semibold lg:text-lg lg:font-bold">
                  {item.title}
                </h1>
                <p className="line-clamp-3 ">{item.summary}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center p-5 text-center dark:bg-dark">
            <Button variant="light" icon={<IoIosArrowDown />}>
              Xem thêm
            </Button>
          </div>
        </div>
        <div className="p-3.5 lg:max-w-[270px] ">
          <div className="rounded-md border border-prim-light bg-white p-3 dark:border-sec-light dark:bg-dark">
            <h1 className="text-center text-xl font-bold">Tin nổi bật</h1>
            {news.map((item, i) => (
              <div key={i} className="py-3">
                <i className="text-gray-400">{item.date}</i>
                <h1 className="font-montserrat font-semibold">{item.title}</h1>
              </div>
            ))}
          </div>
          <div className="py-3">
            <div className="rounded-md border border-prim-light bg-white p-3 dark:border-sec-light dark:bg-dark">
              <h1 className="text-center text-lg font-semibold">
                Thị trường BDS tại tỉnh/thành phố
              </h1>
              {city.map((item, i) => (
                <div key={i} className="flex items-center p-3">
                  <img src={item.img} className="h-10 w-20 rounded-xl " />
                  <h1 className="pl-3">{item.cityname}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDesktopOrLaptop ? (
        <div className="flex w-full justify-center bg-white py-10 dark:bg-dark">
          {navLinks.map((item) => (
            <div key={item.title} className="px-10">
              <h1 className="text-lg font-semibold">{item.title}</h1>
              {item.child_links.map((item2) => (
                <Link className="block" key={item2.title}>
                  {item2.title}{" "}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="block bg-white dark:bg-dark">
          <div>
            <button
              onClick={() => setShow1((s) => !s)}
              className="w-full border-b-[1px] bg-white p-3 text-left dark:bg-dark"
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
          <div className="pb-[50px] xl:pb-0">
            <button
              onClick={() => setShow2((s) => !s)}
              className="w-full border-b-[1px] bg-white p-3 text-left dark:bg-dark"
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

export default News;
