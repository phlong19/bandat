import { Box } from "@chakra-ui/react";

function Disclaimer({ name }) {
  return (
    <Box py={3.5} mt={1} fontSize="xs">
      Quý vị đang xem nội dung tin rao &quot;
      <strong>{name}</strong>
      &quot;. Mọi thông tin, nội dung liên quan tới tin rao này là do người đăng
      tin đăng tải và chịu trách nhiệm. LandHub luôn cố gắng để các thông tin
      được hữu ích nhất cho quý vị tuy nhiên chúng tôi không đảm bảo và không
      chịu trách nhiệm về bất kỳ thông tin, nội dung nào liên quan tới tin rao
      này. Trường hợp phát hiện nội dung tin đăng không chính xác, Quý vị hãy
      nhấn nút báo xấu, kèm theo thông báo và cung cấp thông tin cho Ban quản
      trị theo <strong>hotline</strong> để được hỗ trợ nhanh, kịp thời và chính
      xác nhất.
    </Box>
  );
}

export default Disclaimer;
