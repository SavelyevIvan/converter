import { combineReducers } from "redux";
import {currenciesReducer} from "./currenciesReducer";

export const rootReducer = combineReducers({
    currenciesReducer,
})

export type RootState = ReturnType<typeof  rootReducer>