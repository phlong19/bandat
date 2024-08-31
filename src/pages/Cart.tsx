import { Helmet } from "react-helmet-async";
import { default as CartPage } from "../features/cart/Cart";
import Checkout from "../features/cart/Checkout";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../ui/BreadCrumb";
import { Box } from "@chakra-ui/react";

/**
 * @param stage number determined cart view (1) or checkout page (2)
 */
export default function Cart() {
  const { state } = useLocation();
  const stage = state?.stage || 1;
  const check = stage > 1;

  return (
    <>
      <Helmet>
        <title>Giỏ hàng của bạn</title>
      </Helmet>

      <Box maxW={1500} mx="auto" pos="relative" pb={10}>
        <BreadCrumb base="Giỏ hàng" />

        {/* 2: checkout, 1: cart view */}
        {check ? <Checkout /> : <CartPage />}
      </Box>
    </>
  );
}
