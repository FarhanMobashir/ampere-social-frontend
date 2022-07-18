import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

//  use these function form hooks file rathre than the useDispatch and useSelector form reducx library

//  Adds proper types for hooks  fot typoscript support ----
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
