import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Center, Spinner, AspectRatio, Image, Flex } from "@chakra-ui/react";

import { vi } from "date-fns/locale/vi";
import BreadCrumb from "../ui/BreadCrumb";
import NewsAccordionLinks from "../ui/NewsAccordionLinks";

import { city } from "../data/city";
import { getNew } from "../services/apiNews";
import { formatDate } from "../utils/helper";
import Avatar from "../ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import GoBackButton from "../ui/GoBackButton";
import { useEffect } from "react";

function NewDetails() {
  const { title } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["news", title],
    queryFn: () => getNew(title),
    enabled: Boolean(title),
  });

  // change page title
  useEffect(() => {
    if (data) {
      document.title = data.title;
    }
  }, [data]);

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
    <div className="mx-auto max-w-[1500px] bg-white pb-8 dark:bg-darker lg:rounded-lg lg:pb-6">
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
        <div className="max-w-[1300px] mx-auto py-4 text-center font-lexend text-3xl font-bold">
          <h1>{Hline}</h1>
        </div>

        <div className="mt-1.5 justify-center px-4 lg:flex">
          <div className="">
            <div className="pb-4 lg:max-w-[1000px]">
              <div className="mt-5 font-lexend text-base font-medium">
                <p>{summary}</p>
              </div>
              <div className="flex items-center gap-1.5 pt-5">
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
              <div className="mt-5">{parse(content)}</div>
            </div>
          </div>
        </div>
      </div>

      <NewsAccordionLinks />
    </div>
  );
}

export default NewDetails;
