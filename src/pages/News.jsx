import { news } from "../data/news";
import { city } from "../data/city";
import { navLinks } from "../constants/navlink";
import { FaHouseChimney } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

function News() {
  return (
    <div>
      <div className="pt-[20px] pb-[20px] bg-white border-b flex">
      <div className="flex xl:pl-[50px]"><FaHouseChimney /><IoIosArrowForward /></div>
      <p>Tin tức</p>
      </div>
      <div className="m-auto block  bg-white  xl:flex ">
        <div className=" m-auto block  bg-white  ">
          {news.map((item) => (
            <div className="flex h-[160px] max-w-[1000px] border-b-[1px] bg-white pb-[20px] pt-[20px] xl:max-w-[800px] ">
              <img src={item.img} className="rounded-lg" />
              <div className="pl-[10px]">
                <i className="text-gray-400">{item.date}</i>
                <h1 className="lg:text-lg text-sm">{item.title}</h1>
                <p className=" line-clamp-2 lg:text-sm text-xs">{item.summary}</p>
              </div>
            </div>
          ))}
          <div className="p-[20px] text-center">
            <button className="rounded-lg border border-black bg-white  px-4  py-2 text-black hover:bg-gray-400">
              Xem thêm
            </button>
          </div>
        </div>
        <div className="block pb-[20px] pr-[0px] pt-[100px] xl:pr-[50px] ">
          <div className="block max-w-[1000] rounded-lg  bg-slate-300 p-[20px] xl:max-w-[250px] ">
            <h1 className="text-center text-xl">Tin nổi bật</h1>
            {news.map((item) => (
              <div className="border-b-[1px] pb-[10px] pt-[10px]">
                <i className="text-gray-400">{item.date}</i>
                <h1 className="text-base">{item.title}</h1>
              </div>
            ))}
          </div>
          <div className="block pt-[20px]">
            <div className="block max-w-[1000] rounded-lg  bg-slate-200 p-[20px] xl:max-w-[250px] ">
              <h1>Thị trường BDS tại tỉnh/thành phố</h1>
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
      <div className="flex w-full items-center justify-center bg-white">
        {navLinks.map((item) => (
          <div key={item.title} className="">
            <h1>{item.title}</h1>
            {item.child_links.map((item2)=>(
            <p>{item2.title}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
