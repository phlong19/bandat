import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import {
  Center,
  Spinner,
  AspectRatio,
  Image,
  Flex,
  Text,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";

import { vi } from "date-fns/locale/vi";
import BreadCrumb from "../ui/BreadCrumb";
import NewsAccordionLinks from "../ui/NewsAccordionLinks";

import { getNew } from "../services/apiNews";
import { formatDate, getTime } from "../utils/helper";
import Avatar from "../ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import GoBackButton from "../ui/GoBackButton";
import { useEffect } from "react";
import {
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { success } from "../constants/message";
import toast from "react-hot-toast";
import { BsLink45Deg } from "react-icons/bs";

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

  const appId = import.meta.env.VITE_APPID;
  const link = window.location.href;

  async function handleCopy(e) {
    e.stopPropagation();
    await navigator.clipboard.writeText(link);
    toast.success(success.copyToClipboard);
  }

  return (
    <div className="mx-auto max-w-[1500px] bg-white pb-8 dark:bg-darker lg:rounded-lg lg:pb-6">
      <BreadCrumb Hline={Hline} />

      <div className="mt-5">
        <Flex my={2} ml={{ base: 2, lg: 4, xl: 5 }}>
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
        <div className="mx-auto max-w-[1300px] py-4 text-center font-lexend text-3xl font-bold">
          <h1>{Hline}</h1>
        </div>

        <div className="mt-1.5 justify-center px-4 lg:flex">
          <div className="">
            <div className="pb-4 lg:max-w-[1000px]">
              <div className="mt-5 font-lexend text-base font-medium">
                <p className="italic">{summary}</p>
              </div>
              <div className="flex items-center gap-1.5 pt-5">
                <Avatar avatar={avatar} fullName={fullName} badge={false} />

                <div className="pl-2">
                  <p>{fullName}</p>

                  <p className="text-xs">
                    Đăng{" "}
                    {formatDistanceToNow(new Date(created_at), {
                      locale: vi,
                      addSuffix: true,
                    })}{" "}
                    lúc {getTime(created_at)}
                  </p>
                  <p className="text-xs">
                    Vào ngày {formatDate(created_at, "d MMMM, yyyy")}
                  </p>
                </div>
              </div>
              <div className="content-render detail mt-5">{parse(content)}</div>

              <div className="disclaimer pt-3 italic">
                <span className="font-bold">
                  Tuyên bố miễn trừ trách nhiệm:
                </span>{" "}
                Thông tin được cung cấp chỉ mang tính chất thông tin chung, Công
                ty cổ phần LandHub Việt Nam không đưa ra bất kỳ tuyên bố hoặc
                bảo đảm nào liên quan đến thông tin, bao gồm nhưng không giới
                hạn bất kỳ sự tuyên bố hoặc bảo đảm về tính thích hợp cho bất kỳ
                mục đích cụ thể nào của thông tin theo phạm vi cho phép tối đa
                của pháp luật. Mặc dù đã nỗ lực để đảm bảo rằng thông tin được
                cung cấp trong bài viết này là chính xác, đáng tin cậy và hoàn
                chỉnh vào thời điểm đăng tải, nhưng thông tin được cung cấp
                trong bài viết này không nên được dựa vào để đưa ra bất kỳ quyết
                định tài chính, đầu tư, bất động sản hoặc pháp lý nào. Thêm vào
                đó, thông tin không thể thay thế lời khuyên từ một chuyên gia
                được đào tạo, người mà có thể xem xét, đánh giá các sự kiện và
                hoàn cảnh cá nhân của bạn, và chúng tôi không chịu bất kỳ trách
                nhiệm nào nếu bạn sử dụng những thông tin này để đưa ra quyết
                định.
              </div>
              <div className="py-7">
                <Text fontSize="xs" fontWeight="normal">
                  Chia sẻ bài viết này
                </Text>
                <Flex gap={3} pt={1.5}>
                  {/* fb */}
                  <Tooltip label="Chia sẻ lên Facebook">
                    <FacebookShareButton url={link}>
                      <FacebookIcon
                        round
                        size={30}
                        className="transition-opacity duration-200 hover:opacity-75"
                      />
                    </FacebookShareButton>
                  </Tooltip>
                  {/* messenger */}
                  <Tooltip label="Chia sẻ qua Messenger">
                    <FacebookMessengerShareButton appId={appId} url={link}>
                      <Image
                        src="/messenger.png"
                        boxSize={8}
                        className="transition-opacity duration-200 hover:opacity-75"
                      />
                    </FacebookMessengerShareButton>
                  </Tooltip>
                  {/* zalo */}
                  <Tooltip label="Chia sẻ lên Twitter / X">
                    <TwitterShareButton url={link}>
                      <TwitterIcon
                        size={30}
                        round
                        className="transition-opacity duration-200 hover:opacity-75"
                      />
                    </TwitterShareButton>
                  </Tooltip>
                  {/* copy link */}
                  <Tooltip label="Sao chép đường dẫn">
                    <IconButton
                      bg="none"
                      fontSize="xl"
                      rounded="full"
                      boxSize="38px"
                      onClick={(e) => handleCopy(e)}
                      icon={<BsLink45Deg />}
                    />
                  </Tooltip>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsAccordionLinks />
    </div>
  );
}

export default NewDetails;
