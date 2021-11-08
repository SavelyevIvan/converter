import {Navigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";
import React from "react";

export const PrivateRoute: React.ComponentType<any> = ({children}) => {
    const {success} = useTypedSelector(state => state.currenciesReducer)
    return success ? children : <Navigate to="/"/>
}

