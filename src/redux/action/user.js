import axiosApiIntances from "../../utils/axios";

export const getAllUser = (keywords) => {
  return {
    type: "GET_ALL_USER",
    payload: axiosApiIntances.get(`user?keywords=${keywords}`),
  };
};

export const getUserById = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axiosApiIntances.get(`user/by-id/${id}`),
  };
};

export const updateUser = (id, data) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`user/${id}`, data),
  };
};
