import axiosApiIntances from "../../utils/axios";

export const getRoomChat = (userId) => {
  return {
    type: "GET_ROOM_CHAT",
    payload: axiosApiIntances.get(`chat-room/${userId}`),
  };
};

export const addRoomChat = (data) => {
  return {
    type: "ADD_ROOM_CHAT",
    payload: axiosApiIntances.post("chat-room", data),
  };
};
