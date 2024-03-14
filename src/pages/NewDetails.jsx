import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import parse from "html-react-parser";
import { Center, Spinner, AspectRatio, Image, Flex } from "@chakra-ui/react";

import { vi } from "date-fns/locale/vi";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import BreadCrumb from "../ui/BreadCrumb";

import { navLinks } from "../constants/navlink";
import { city } from "../data/city";
import { getNew } from "../services/apiNews";
import { formatDate } from "../utils/helper";
import Avatar from "../ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import GoBackButton from "../ui/GoBackButton";

function NewDetails() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const item1 = navLinks[0];
  const item2 = navLinks[1];
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const { title } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["news", title],
    queryFn: () => getNew(title),
    enabled: Boolean(title),
  });

  if (isLoading) {
    return (
      <Center minH="90dvh">
        <Spinner />
      </Center>
    );
  }

  const {
    title: Hline,
    summary,
    content,
    thumbnail,
    author: { fullName, avatar },
    created_at,
    slug,
  } = data;

  return (
    <div className="mx-auto max-w-[1500px] bg-white dark:bg-dark">
      <BreadCrumb Hline={Hline} />

      <div className="mt-5">
        <Flex my={2} ml={2}>
          <GoBackButton />
        </Flex>
        <Center w="100%">
          <AspectRatio
            w={{ base: "95%", md: "80%" }}
            maxH={400}
            minH={300}
            ratio={16 / 9}
          >
            <Image rounded="lg" src={thumbnail} alt={slug} />
          </AspectRatio>
        </Center>
        <div className="py-4 text-center font-lexend text-3xl font-bold">
          <h1>{Hline}</h1>
        </div>

        <div className="mt-1.5 justify-center px-4 lg:flex">
          <div className="">
            <div className="py-4 lg:max-w-[700px]">
              <div className="flex items-center gap-1.5">
                <Avatar avatar={avatar} fullName={fullName} badge={false} />

                <div className="pl-2">
                  <p>{fullName}</p>
                  {/* options */}
                  {/* A */}
                  <p className="text-xs">
                    Đăng vào ngày {formatDate(created_at, "d MMMM, yyyy")}
                  </p>
                  {/* B */}
                  <p className="text-xs">
                    Đăng{" "}
                    {formatDistanceToNow(new Date(created_at), {
                      locale: vi,
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-5 font-lexend text-base font-medium ">
                <p>{summary}</p>
              </div>
              <div className="mt-5">{parse(content)}</div>
            </div>
          </div>

          {/* <div className=" lg:ml-9 lg:max-w-[300px]">
            <div className="rounded-md border-[1px] bg-white p-3 dark:bg-dark ">
              <h1 className="text-center text-xl font-bold">Tin nổi bật</h1>

              <Link to={`/tin-tuc/${slug}`}>
                <div className="py-3">
                  <i className="text-gray-400">{item.date}</i>
                  <h1 className="line-clamp-3 font-montserrat font-semibold">
                    {Hline}
                  </h1>
                </div>
              </Link>
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
          </div> */}
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
          <div className="pb-[50px] xl:pb-0">
            <button
              onClick={() => setShow2((s) => !s)}
              className="w-full border-b-[1px] bg-white px-3 py-3 text-left dark:bg-dark"
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
