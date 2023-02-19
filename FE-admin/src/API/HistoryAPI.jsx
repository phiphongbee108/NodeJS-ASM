import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: (query) => {
    const url = `http://localhost:5000/api/product/search?product=${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/histories/${id}`;
    return axiosClient.get(url);
  },
  getDelete: (query, id) => {
    const url = `http://localhost:5000/api/product/delete/${query}?p=${id}`;
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
