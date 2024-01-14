import { news } from "../data/news";
import { city } from "../data/city";
import { navLinks } from "../constants/navlink";
import { IoIosArrowForward,IoIosArrowDown } from "react-icons/io";
import { BsHouse } from "react-icons/bs";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import Button from "../ui/Button";

function News() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const item1 = navLinks[0]
  const item2 = navLinks[1]
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  return (
    <div>
      <div className="flex w-full  items-center border-b bg-white dark:bg-dark pb-[20px] pt-[20px]">
        <div className="flex gap-2 w-full items-center pl-[10px] xl:pl-[50px] ">
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
      <div className="bg-white dark:bg-dark items-center text-center  mx-auto flex flex-col max-w-[800px] pt-10 pb-10"><h1 className="font-bold md:text-3xl text-2xl font-lexend">Tin tức bất động sản mới nhất</h1><p className="pt-2 font-semibold lg:text-lg text-base " >Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam thông qua dữ liệu lớn về giá, giao dịch, nguồn cung - cầu và khảo sát thực tế của đội ngũ phóng viên, biên tập của LandHub.com.vn.</p></div>
      </div>
      <div className="m-auto block  bg-white  dark:bg-dark px-6  xl:flex ">
        <div className=" m-auto block  bg-white dark:bg-dark ">
          {news.map((item) => (
            <div className="flex h-[160px] max-w-[1000px] border-b-[1px] dark:border-b-light dark:border-dark bg-white  dark:bg-dark pb-[20px] pt-[20px] xl:max-w-[800px] ">
              <img src={item.img} className="rounded-lg" />
              <div className="pl-[10px]">
                <i className="text-gray-400">{item.date}</i>
                <h1 className="text-sm lg:text-lg md:text-base font-bold line-clamp-1">{item.title}</h1>
                <p className=" line-clamp-2 md:line-clamp-3 text-xs md:text-[13px] lg:text-sm">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
          <div className="p-[20px] text-center dark:bg-dark justify-center flex">
           <Button variant="light" icon = {<IoIosArrowDown/>}>Xem thêm</Button>
          </div>
        </div>
        <div className="block pb-[20px] pr-[0px] pt-[20px] xl:pr-[50px] ">
          <div className="block max-w-[1000] rounded-lg  bg-slate-300 dark:bg-gray-800 p-[20px] xl:max-w-[250px] ">
            <h1 className="text-center text-xl font-semibold">Tin nổi bật</h1>
            {news.map((item) => (
              <div className="border-b-[1px] pb-[10px] pt-[10px]">
                <i className="text-gray-400">{item.date}</i>
                <h1 className="text-base">{item.title}</h1>
              </div>
            ))}
          </div>
          <div className="block pt-[20px]">
            <div className="block max-w-[1000] rounded-lg  bg-slate-200 dark:bg-gray-700 p-[20px] xl:max-w-[250px] ">
              <h1 className="font-semibold">Thị trường BDS tại tỉnh/thành phố</h1>
              {city.map((item) => (
                <div className="m-auto flex pt-[20px]">
                  <img src={item.img} className="w-[40px] rounded-lg" />
                  <h1 className="pl-[10px]">{item.cityname}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDesktopOrLaptop ? (
        <div className="flex w-full justify-center bg-white pt-10 pb-10 dark:bg-dark ">
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
        <div className="block bg-white dark:bg-dark">
            <div className="">
              <button onClick={() => setShow1((s) => !s)} className="bg-white dark:bg-dark border-b-[1px] w-full text-left px-3 py-3">
                <h1 className="text-lg font-semibold flex items-center justify-between">{item1.title}{show1?<IoIosArrowDown />:<IoIosArrowForward />}</h1>
              </button>
              {show1 && (
                <div>
                  {item1.child_links.map((item1) => (
                    <p className="pt-4 pl-5" key={item1.title}>{item1.title}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="pb-[50px] xl:pb-[0px]">
              <button onClick={() =>setShow2((s) => !s)} className="bg-white dark:bg-dark border-b-[1px] w-full text-left  px-3 py-3">
                <h1 className="text-lg font-semibold flex items-center justify-between">{item2.title}{show2?<IoIosArrowDown />:<IoIosArrowForward />}</h1>
              </button>
              {show2 && (
                <div>
                  {item2.child_links.map((item2) => (
                    <p className="pt-4 pl-5" key={item2.title}>{item2.title}</p>
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
