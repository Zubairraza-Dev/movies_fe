import { store } from "../lib/store";
import { clearAuthStorage } from "../lib/store/slice/user/UserSlice";

export const requestHandler = (request) => {
  const token = JSON.parse(localStorage.getItem("auth_token"));
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
};

export const successHandler = (response) => {
  return {
    ...response,
    data: response.data,
  };
};
export const errorHandler = (error) => {
  const { status, data } = error?.response;
  if (
    status === 401 ||
    data?.message === "Unauthorized Access to an operation"
  ) {
    const { dispatch } = store;
    dispatch(clearAuthStorage());
  }
  return Promise.reject(error);
};
