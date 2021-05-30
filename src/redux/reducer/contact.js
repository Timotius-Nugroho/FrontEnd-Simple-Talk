const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_CONTACT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_ALL_CONTACT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_ALL_CONTACT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "ADD_CONTACT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "ADD_CONTACT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [],
        msg: action.payload.data.msg,
      };
    case "ADD_CONTACT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "DELETE_CONTACT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "DELETE_CONTACT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [],
        msg: "",
      };
    case "DELETE_CONTACT_REJECTED":
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

export default contact;
