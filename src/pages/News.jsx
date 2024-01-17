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
      <div className="flex w-full items-center border-b bg-white pb-5 pt-[20px] dark:bg-dark">
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
      <div className="max-w-full bg-white dark:bg-dark">
        <div className="mx-auto flex max-w-[800px] flex-col  items-center bg-white pb-10 pt-10 text-center dark:bg-dark">
          <h1 className="font-lexend text-2xl font-bold md:text-4xl">
            Tin tức bất động sản mới nhất
          </h1>
          <p className="px-3 py-3 font-lexend text-base lg:text-xl">
            Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam
            thông qua dữ liệu lớn về giá, giao dịch, nguồn cung - cầu và khảo
            sát thực tế của đội ngũ phóng viên, biên tập của LandHub.com.vn.
          </p>
        </div>
      </div>
      <div className=" justify-center bg-white dark:bg-dark lg:flex ">
        <div className="  bg-white px-3.5 dark:bg-dark  ">
          {news.map((item, i) => (
            <div
              key={i}
              className="mb-6 rounded-md bg-white dark:bg-dark shadow-md lg:flex lg:items-center lg:bg-white lg:shadow-none lg:rounded-none lg:max-w-[800px] lg:border-b-[1px] lg:pb-5 lg:mb-5 "
            >
              <img
                src={item.img}
                className="w-full rounded-t-md lg:w-[260px] lg:h-[150px] lg:rounded-md  "
              />
              <div className="p-3 ">
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
          <div className="rounded-md border-[1px] bg-white dark:bg-dark p-3">
            <h1 className="text-center text-xl font-bold">Tin nổi bật</h1>
            {news.map((item, i) => (
              <div key={i} className="py-3">
                <i className="text-gray-400">{item.date}</i>
                <h1 className="font-montserrat font-semibold">{item.title}</h1>
              </div>
            ))}
          </div>
          <div className="py-3">
            <div className="rounded-md border-[1px] bg-white dark:bg-dark p-3 ">
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
        <div className="flex w-full justify-center bg-white pb-10 pt-10 dark:bg-dark ">
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

export default News;
