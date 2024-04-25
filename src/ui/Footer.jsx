import { SlLocationPin } from "react-icons/sl";
import { FiPhoneCall, FiHeadphones } from "react-icons/fi";
import { TbUserQuestion } from "react-icons/tb";
import {
  FaFacebook,
  FaSquareXTwitter,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";

import Button from "./Button";
import Logo from "./Logo";
import { currentYear, fb, git, ins, x } from "../constants/anyVariables";

function Footer() {
  return (
    <footer
      className={`border-t-[0.5px] bg-[#ebebeb] px-4 pt-4 text-center font-lexend text-xs text-dark dark:border-t-stone-700 dark:bg-[#313131] dark:text-light lg:px-8 lg:text-left`}
    >
      <div className="relative mx-auto max-w-[1400px] lg:flex lg:gap-3.5">
        <div className="lg:min-w-[33%] lg:pt-6">
          <span className="flex justify-center pb-4 lg:block">
            <Logo footer />
          </span>
          <h2 className="pb-2 text-sm font-bold lg:text-primary lg:dark:text-secondary xl:text-base">
            CÔNG TY CỔ PHẦN LANDHUB VIỆT NAM
          </h2>
          <h3 className="lg:flex">
            <span className="hidden px-3 text-xl text-primary dark:text-secondary lg:block">
              <SlLocationPin />
            </span>
            Tầng 31, Keangnam Hanoi Landmark <br className="lg:hidden" />
            Phạm Hùng, Nam Từ Liêm, Hà Nội
          </h3>
          <h3 className="mt-2 hidden lg:flex">
            <span className="hidden px-3 text-xl text-primary dark:text-secondary lg:block">
              <FiPhoneCall />
            </span>
            (024) 3562 5939 - <br className="lg:hidden" />
            (024) 3562 5940
          </h3>

          <h3 className="pt-3 font-semibold text-primary dark:text-secondary lg:hidden">
            hotro@landhub.com
          </h3>
          <span className="flex justify-center pt-4 lg:hidden">
            <Button to="tel:19009069" icon={<FiPhoneCall />}>
              1900 9069
            </Button>
          </span>
          <div className="mt-6 border-b border-dark pb-5 text-left text-base dark:border-light lg:border-none">
            <h3>Tải ứng dụng</h3>
            <ul className="mt-3 items-center gap-1 xs:flex sm:gap-0">
              <li className="w-1/2 md:-ml-2 md:w-1/3 lg:w-1/2">
                <a href="#">
                  <img
                    src="/google-play.png"
                    alt="google play"
                    className="max-w-36 xl:max-w-40"
                  />
                </a>
              </li>
              <li className="w-1/2 md:w-1/3 lg:w-1/2">
                <a href="#">
                  <img
                    src="/app_store.png"
                    alt="app store"
                    className="mt-[3.5px] max-w-36 dark:contrast-150 sm:mt-0 xl:max-w-40"
                  />
                </a>
              </li>
            </ul>
          </div>
          {/* socials media, mobile hidden */}
          <div className="hidden lg:mt-32 lg:block xl:mt-0">
            <h3 className="text-xl font-bold">Kết nối với chúng tôi qua</h3>
            <ul className="flex gap-3 pb-3 pt-4 text-2xl text-primary dark:text-secondary">
              <li>
                <a href={fb}>
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href={x}>
                  <FaSquareXTwitter />
                </a>
              </li>
              <li>
                <a href={ins}>
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href={git}>
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* info */}
        <div className="relative z-50 mb-3 mt-6 w-full text-left">
          <p className="lg:hidden">
            Copyright © 2023 - {currentYear} LandHub.com.vn.
          </p>
          {/* mobile hidden */}
          <div className="mt-3 hidden w-full font-roboto lg:flex lg:justify-around lg:gap-2">
            <div className="h-36 w-1/3 max-w-[200px]">
              <a
                href="tel:19009069"
                className="ml-1 flex h-full items-center justify-start gap-3 xl:justify-center"
              >
                <span className="text-4xl">
                  <FiPhoneCall />
                </span>
                <div>
                  <p className="font-normal">Hotline:</p>
                  <p className="text-sm font-semibold xl:text-base">
                    1900 9069
                  </p>
                </div>
              </a>
            </div>
            <div className="h-36 w-1/3 max-w-[200px]">
              <a
                href="mailto:landhub-services@outlook.com"
                className="flex h-full items-center justify-center gap-3"
              >
                <span className="text-4xl">
                  <TbUserQuestion />
                </span>
                <div>
                  <p className="font-normal">Hỗ trợ khách hàng:</p>
                  <p className="text-sm font-semibold xl:text-base">
                    support@landhub.com
                  </p>
                </div>
              </a>
            </div>
            <div className="h-36 w-1/3 max-w-[200px] lg:ml-3 xl:mr-0">
              <a
                href="mailto:hotro@landhub.com.vn"
                className="flex h-full items-center justify-center gap-3"
              >
                <span className="text-4xl">
                  <FiHeadphones />
                </span>
                <div>
                  <p className="font-normal">Chăm sóc khách hàng:</p>
                  <p className="text-sm font-semibold xl:text-base">
                    hotro@landhub.com.vn
                  </p>
                </div>
              </a>
            </div>
          </div>
          <p className="mt-3">
            Giấy ĐKKD 020891742683 cấp lần đầu ngày 01/01/2023
            <br />
            Giấy phép thiết lập trang thông tin điện tử tổng hợp trên mạng số
            191/GP-TTĐT do Sở TTTT Hà Nội cấp ngày 11/01/2024
          </p>
          <span className="space-y-3">
            <span className="block items-center justify-start gap-3.5 lg:mt-2.5 lg:flex">
              <p className="mt-3 lg:m-0">
                Chịu trách nhiệm nội dung: Ông Phạm Hoàng Long
              </p>
              <span className="hidden lg:block">|</span>
              <p>Chịu trách nhiệm nội dung: Ông Phan Anh Duy</p>
            </span>
            <span className="block items-center justify-start gap-3.5 lg:flex">
              <p>Chịu trách nhiệm quản lý: Ông Vũ Nguyễn Công Bình</p>
              <span className="hidden lg:block">|</span>
              <p>Chịu trách nhiệm dữ liệu: Ông Lưu Tiến Luật</p>
            </span>
            <span className="block items-center justify-start gap-3.5 lg:flex">
              <p>Chịu trách nhiệm hình ảnh: Ông Vũ Đặng Minh Đức</p>
              <span className="hidden lg:block">|</span>
              <p>Chịu trách nhiệm dữ liệu: Bà Nguyễn Thu Huyền</p>
            </span>
            <p>Quy chế, quy định giao dịch có hiệu lực từ 31/12/2023</p>
            <br />
            <span className="text-primary dark:text-secondary">
              Ghi rõ nguồn &quot;LandHub.com.vn&quot; khi phát hành lại thông
              tin từ website này.
            </span>
          </span>
          <p className="mt-6 hidden lg:block">
            Copyright © {currentYear - 1} - {currentYear} LandHub.com.vn.
          </p>
        </div>
        <p className="bg-transparent md:absolute md:right-14 md:-mt-16 lg:bottom-1 lg:right-0 lg:max-w-[1200px]">
          <a href="http://online.gov.vn/">
            <img
              src="/da-dang-ky-bct.png"
              alt="Registered with Ministry of Industry and Trade (MOIT)"
              className="h-14 md:h-16"
            />
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
