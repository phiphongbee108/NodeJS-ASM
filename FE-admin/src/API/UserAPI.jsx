import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (query) => {
    const url = `http://localhost:5000/api/auth/singup/`;
    return axiosClient.post(url, query);
  },
  postSignIng: (query) => {
    const url = "http://localhost:5000/api/auth/logingadmin/";
    return axiosClient.post(url, query);
  },
};

export default UserAPI;
