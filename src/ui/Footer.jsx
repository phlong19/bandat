import './footer.css'
import { LuPhoneCall  } from "react-icons/lu";
import { CiHeadphones } from "react-icons/ci";
import { TbUserQuestion } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { IoLogoGooglePlaystore } from "react-icons/io5";

function Footer() {
    return (
        <header>
        <div> 
        <div class="class0">
      
        <p id='icon1'> <LuPhoneCall/></p>
            <ul id='tag1'> 
            <h1 style={{fontFamily: 'roboto'}}> Hotline</h1>
            <h1>1900 1881</h1>
            </ul>

            <p id='icon2'> <TbUserQuestion /> </p>
           <ul id='tag2'> 
            <h1 style={{fontFamily: 'roboto'}}> Hỗ trợ khách hàng</h1>
            <h1>trogiup.landhub.com.vn</h1></ul>

            <p id='icon3'> <CiHeadphones/> </p>
           <ul id='tag3'> 
            <h1 style={{fontFamily: 'roboto'}}> Chăm sóc khách hàng</h1>
            <h1>hotro@landhub.com.vn</h1></ul>
           
            </div>
            <div class="class1">
            <h1>CÔNG TY CỔ PHẦN LANDHUB VIỆT NAM</h1>
            <h1><p id='icon4'> <IoLocationOutline /> </p>Tầng 31,Phạm Hùng,Nam Từ Liêm Hà Nội</h1>
            <h1><p id='icon4'> <LuPhoneCall/></p>(024) 3562 5939 - (024) 3562 5940</h1>
            </div>

            <div class="class2">
            <h1 style={{fontFamily: 'roboto', fontWeight:"bold"}}>HƯỚNG DẪN</h1>
            <h1>Về chúng tôi</h1>
            <h1>Báo giá & hỗ trợ</h1>
            <h1>Câu hỏi thường gặp</h1>
            <h1>Góp ý báo lỗi</h1>
            <h1>Sitemap</h1>
           </div>

            <div class="class3">
            <h1 style={{fontFamily: 'roboto', fontWeight:"bold"}}>QUY ĐỊNH</h1>
            <h1>Quy định đăng tin</h1>
            <h1>Quy chế hoạt động</h1>
            <h1>Điều khoản thảo thuận</h1>
            <h1>Chính sách bảo mật</h1>
            <h1>Giải quyết khiếu nại</h1>
           </div>
          

           <div class="class4">
           <form >
           <label for="fname">ĐĂNG KÝ NHẬN TIN</label>
           <input type="text" id="fname" name="firstname" placeholder="Nhập email của bạn" ></input> 
           <button id="btndky"><IoIosSend /></button>
           </form>
           </div>
         
           
           <div class="class5">
           <form >
           <label for="fname">QUỐC GIA & NGÔN NGỮ</label>
           <select id="country" name="country" >
           <option value="vietnam"> Việt Nam</option>
           <option value="australia">Australia</option>
           <option value="canada">Canada</option>
           <option value="usa">USA</option>
           </select>
           </form>
           </div>

           <hr width="100%"  /> 
           
           <div class="class6">
            <h5>Copyright © 2024 LandHub.com.vn</h5>
            <h5>Giấy ĐKKD số 0104630479 do Sở KHĐT TP Hà Nội cấp lần đầu ngày 02/06/2010</h5>
            <h5>Giấy phép thiết lập trang thông tin điện tử tổng hợp trên mạng số 191/GP-TTĐT do </h5>
            <h5>Sở TTTT Hà Nội cấp ngày 31/08/2023</h5>
           </div>
           <div class="class7">
            <h5>Chịu trách nhiệm nội dung GP ICP: Ông Phạm Hoàng Long</h5>
            <h5>Chịu trách nhiệm nội dung GP ICP: Ông Phan Anh Duy</h5>
            <h5>Chịu trách nhiệm nội dung GP ICP: Ông Vũ Đặng Minh Đức</h5>
            <h5>Chịu trách nhiệm nội dung GP ICP: Ông Vũ Nguyễn Công Bình</h5>
            <h5>Quy chế, quy định giao dịch có hiệu lực từ /2024</h5>  
           </div>

        <img id="imgfooter" src='https://staticfile.batdongsan.com.vn/images/newhome/da-dang-ki-bct.svg'></img>         
        <a href="#" id='iconfb' class="button"> <FaFacebookSquare /></a>
        <a href="#" id='iconx' class="button"> <FaXTwitter /></a>
        <a href="#"  id='iconytb' class="button"> <IoLogoYoutube /></a>

        </div>

        </header>
        )
}

export default Footer
