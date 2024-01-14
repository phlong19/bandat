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

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="bg-gray-200 px-4 text-center font-lexend text-dark dark:bg-dark/90 dark:text-light lg:text-left lg:text-base">
      <div className="relative mx-auto max-w-[1400px] lg:flex lg:gap-4">
        <div className="lg:min-w-[33%] lg:pt-6">
          <span className="flex justify-center pb-4 lg:block">
            <Logo footer />
          </span>
          <h2 className="pb-2 text-base font-bold lg:text-primary lg:dark:text-secondary">
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
            <ul className="mt-3 flex">
              <li className="w-1/2 md:w-1/3 lg:w-1/2">
                <a href="">
                  <img
                    src="./google-play.png"
                    alt="google play"
                    className="h-8 max-w-36"
                  />
                </a>
              </li>
              <li className="w-1/2 md:w-1/3 lg:w-1/2">
                <a href="">
                  <img
                    src="./app_store.png"
                    alt="app store"
                    className="h-8 max-w-36 dark:contrast-150"
                  />
                </a>
              </li>
            </ul>
          </div>
          {/* social, mobile hidden */}
          <div className="hidden lg:mt-2 lg:block">
            <h3 className="text-xl font-bold">Kết nối với chúng tôi qua</h3>
            <ul className="flex text-4xl gap-3 pt-4 text-primary dark:text-secondary">
              <li>
                <a href="https://www.facebook.com/">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/?lang=vi">
                  <FaSquareXTwitter />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="https://www.github.com/">
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* info */}
        <div className="relative z-50 pb-3 pt-6 text-left">
          <p className="lg:hidden">
            Copyright © 2023 - {new Date().getFullYear} LandHub.com.vn.
          </p>
          {/* mobile hidden */}
          <div className="mt-3 hidden w-full font-roboto lg:flex lg:flex-wrap lg:gap-3">
            <div className="h-36 w-1/3 max-w-[250px]">
              <a
                href="tel:19009069"
                className="ml-1 flex h-full items-center justify-start gap-3 xl:justify-center"
              >
                <span className="text-4xl">
                  <FiPhoneCall />
                </span>
                <div>
                  <p className="font-normal">Hotline:</p>
                  <p className="text-base font-semibold">1900 9069</p>
                </div>
              </a>
            </div>
            <div className="h-36 w-1/3 max-w-[250px]">
              <a
                href="mailto:hotro@landhub.com.vn"
                className="flex h-full items-center justify-center gap-3"
              >
                <span className="text-4xl">
                  <TbUserQuestion />
                </span>
                <div>
                  <p className="font-normal">Hỗ trợ khách hàng:</p>
                  <p className="text-base font-semibold">
                    hotro@landhub.com.vn
                  </p>
                </div>
              </a>
            </div>
            <div className="h-36 w-1/3 max-w-[250px]">
              <a
                href="mailto:hotro@landhub.com.vn"
                className="flex h-full items-center justify-center gap-3"
              >
                <span className="text-4xl">
                  <FiHeadphones />
                </span>
                <div>
                  <p className="font-normal">Chăm sóc khách hàng:</p>
                  <p className="text-base font-semibold">
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
              <p>Chịu trách nhiệm dữ liệu: Ông Nguyễn Văn Luật</p>
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
            Copyright © 2023 - {currentYear} LandHub.com.vn.
          </p>
        </div>
        <p className="bg-transparent md:absolute md:right-14 md:-mt-16 lg:bottom-0 lg:left-0 lg:max-w-[1200px]">
          <a href="http://online.gov.vn/">
            <img
              src="./da-dang-ky-bct.png"
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
