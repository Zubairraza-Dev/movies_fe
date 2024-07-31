import { useDispatch, useSelector } from "react-redux";
// Custom hook to use dispatch
export const useAppDispatch = () => useDispatch();
// Custom hook to select state
export const useAppSelector = (selector) => useSelector(selector);
