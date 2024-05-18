import { TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useHS_Selector: TypedUseSelectorHook<RootState> = useSelector
export const useHS_Dispatch = () => useDispatch<AppDispatch>()