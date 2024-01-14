import { LuPhoneCall  } from "react-icons/lu";
import { CiHeadphones } from "react-icons/ci";
import { TbUserQuestion } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";


function Footer() {
  return (
    <div>         
       <div className="float-left max-w-[1000px]  pl-[450px]  pt-[70px]  xl:max-w-[800px] text-[10px]"> 
        <p></p>
        </div>
        <div className=" m-auto block  ">  
        <div className="m-auto block  xl:flex ">
        <div className=" float-left  pt-[80px] pr-[100px] ">
            <p className=" float-left pt-[5px] pr-[10px] text-[30px]"> <LuPhoneCall/></p>
            <h1  style={{fontFamily: 'roboto'}}> Hotline</h1>
            <h1 className="pl-[40px]  ">1900 1881</h1>
     </div>



    <div className=" float-left pt-[80px] pr-[100px] max-w-[1000px] xl:max-w-[800px] ">
            <p className=" float-left  pt-[5px] pr-[10px] text-[30px] "> <TbUserQuestion /> </p>
            <h1 style={{fontFamily: 'roboto'}}> Hỗ trợ khách hàng</h1>
            <h1 className=" pl-[40px]">trogiup.landhub.com.vn</h1>
    </div>

    <div className=" float-left pt-[80px] pb-[100px]   max-w-[1000px] xl:max-w-[800px] ">
            <p className="float-left  pt-[5px] pr-[10px]   text-[30px] max-w-[1000px] xl:max-w-[800px]"> <CiHeadphones/> </p>
            <h1 className="   max-w-[1000px] xl:max-w-[800px]" style={{fontFamily: 'roboto'}}> Chăm sóc khách hàng</h1>
            <h1 className=" pl-[40px] max-w-[1000px] xl:max-w-[800px]">hotro@landhub.com.vn</h1>     
    </div>  
    </div>
    </div>
        
        <div className="m-auto block  xl:flex ">
        <div className=" m-auto block  ">  
        <div className=" float-left  max-w-[1000px]  pb-[80px] mr-[100px] xl:max-w-[800px]  ">
            <h1 className="leading-8">CÔNG TY CỔ PHẦN LANDHUB VIỆT NAM</h1>
            <h1><p className="  float-left pt-[4px]  pr-[10px] text-[16px] max-w-[1000px] xl:max-w-[800px]"> <IoLocationOutline /> </p>Tầng 31,Phạm Hùng,Nam Từ Liêm Hà Nội</h1>
            <h1><p className="  float-left pt-[4px] pr-[10px] text-[17px] max-w-[1000px] xl:max-w-[800px]"> <LuPhoneCall/></p>(024) 3562 5939 - (024) 3562 5940</h1>
            </div>
      
        <div className=" float-left  max-w-[1000px]  pb-[80px] pr-[100px]  xl:max-w-[800px] ">
            <h1 style={{fontFamily: 'roboto', fontWeight:"bold"}}>HƯỚNG DẪN</h1>
            <h1>Về chúng tôi</h1>
            <h1>Báo giá & hỗ trợ</h1>
            <h1>Câu hỏi thường gặp</h1>
            <h1>Góp ý báo lỗi</h1>
            <h1>Sitemap</h1>
           </div>
           <div className=" float-left  max-w-[1000px]  pb-[80px] pr-[50px]  xl:max-w-[800px]">
            <h1 style={{fontFamily: 'roboto', fontWeight:"bold"}}>QUY ĐỊNH</h1>
            <h1>Quy định đăng tin</h1>
            <h1>Quy chế hoạt động</h1>
            <h1>Điều khoản thảo thuận</h1>
            <h1>Chính sách bảo mật</h1>
            <h1>Giải quyết khiếu nại</h1>
           </div>

           <div className="float-left   max-w-[1000px]   xl:max-w-[800px]">
           <div>
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block leading-6 ">
                ĐĂNG KÝ NHẬN TIN
              </label>
              <div className="pb-[30px] mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 pr-[50px] bg-transparent py-1.5 pl-[10px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nhập email của bạn"
                  />
                       <button className=" bg-[#0425aa]  p-[16px]  text-white"> <IoIosSend /></button>
                </div>
              </div>
            </div>
            </div> 
           </div>     


     
        </div>
    </div>
    <hr width="100%"   /> 
        <div className="float-left max-w-[1000px]  pl-[105px]  pt-[70px] pr-[70px] xl:max-w-[800px] text-[10px]"> 
        <p></p>
        </div>
    <div className="float-left max-w-[1000px]   pt-[70px] pr-[70px] xl:max-w-[800px] text-[10px]">
            <p>Copyright © 2024 LandHub.com.vn</p>
            <p>Giấy ĐKKD số 0104630479 do Sở KHĐT TP Hà Nội cấp lần đầu ngày 02/06/2010</p>
            <p>Giấy phép thiết lập trang thông tin điện tử tổng hợp trên mạng số 191/GP-TTĐT do </p>
            <p>Sở TTTT Hà Nội cấp ngày 31/08/2023</p>
           </div>
           <div className=" float-left max-w-[1000px]  pb-[80px] pt-[88px]  xl:max-w-[800px] text-[10px]"  >
            <h5>Chịu trách nhiệm nội dung GP ICP: Ông Phạm Hoàng Long</h5>
            <h5>Chịu trách nhiệm nội dung GP ICP: Ông Phan Anh Duy</h5>
            <h5>Chịu trách nhiệm nội dung GP ICP: Ông Vũ Đặng Minh Đức</h5>
            <h5>Chịu trách nhiệm nội dung GP ICP: Ông Vũ Nguyễn Công Bình</h5>
            <h5>Quy chế, quy định giao dịch có hiệu lực từ /2024</h5>  
           </div>
        <div className="float-left max-w-[1000px] xl:max-w-[800px] ">
           <img className="float-left  pl-[40px] pt-[100px]" src='https://staticfile.batdongsan.com.vn/images/newhome/da-dang-ki-bct.svg'></img>         
        </div>
       
</div>
  );
}

export default Footer;
