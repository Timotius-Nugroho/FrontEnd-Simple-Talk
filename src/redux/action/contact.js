import axiosApiIntances from "../../utils/axios";

export const getAllContact = (userId) => {
  return {
    type: "GET_ALL_CONTACT",
    payload: axiosApiIntances.get(`contact/${userId}`),
  };
};

export const addContact = (data) => {
  return {
    type: "ADD_CONTACT",
    payload: axiosApiIntances.post("contact", data),
  };
};

export const deleteContact = (userId, friendId) => {
  return {
    type: "DELETE_CONTACT",
    payload: axiosApiIntances.delete(
      `contact?contactUserId=${userId}&contactFriendId=${friendId}`
    ),
  };
};
