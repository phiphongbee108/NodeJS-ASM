import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postEmail: (post) => {
    const url = "http://localhost:5000/api/user/order/post";
    return axiosClient.post(url, post);
  },
};

export default CheckoutAPI;
