import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: (query) => {
    const url = `http://localhost:5000/api/user/order/user/${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id, detail) => {
    const url = `http://localhost:5000/api/user/order/user/find/${id}/${detail}`;
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
