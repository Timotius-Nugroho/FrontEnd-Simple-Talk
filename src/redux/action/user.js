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

export const getUserByIdNoState = (id) => {
  return {
    type: "GET_USER_BY_ID_NO_STATE",
    payload: axiosApiIntances.get(`user/by-id/${id}`),
  };
};

export const updateUser = (id, data) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`user/${id}`, data),
  };
};

export const deletePhotoUser = (id) => {
  return {
    type: "DELETE_PHOTO_USER",
    payload: axiosApiIntances.patch(`user/delete-photo/${id}`),
  };
};

export const changePasswordUser = (data) => {
  return {
    type: "CHANGE_PASSWORD_USER",
    payload: axiosApiIntances.patch("user/change/password", data),
  };
};
