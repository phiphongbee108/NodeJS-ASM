import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postEmail: (post) => {
    const url = "https://asm3-be.glitch.me/api/user/order/post";
    return axiosClient.post(url, post);
  },
};

export default CheckoutAPI;
