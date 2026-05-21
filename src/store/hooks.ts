import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

/** Typed `useDispatch` for the MEDXPRESS store. */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
/** Typed `useSelector` for the MEDXPRESS store. */
export const useAppSelector = useSelector.withTypes<RootState>();
