const initialState = {
  dataAllUser: [],
  dataUser: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_ALL_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataAllUser: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_ALL_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataAllUser: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_USER_BY_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_USER_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUser: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_USER_BY_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataUser: {},
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "UPDATE_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default user;
