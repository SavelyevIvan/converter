import {Dispatch} from "redux";
import axios from "axios";
import {CurrenciesAction, currenciesActionTypes} from "../../types/currencies";

export const fetchCurrencies = () => async (dispatch: Dispatch<CurrenciesAction>) => {
    try {
        dispatch({type: currenciesActionTypes.FETCH_CURRENCIES})
        const response = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=462df37bd311b65a790ed2ec56d0aaf9`)
        dispatch({type: currenciesActionTypes.FETCH_CURRENCIES_SUCCESS, payload: response.data})
    }
    catch (e) {
        dispatch({type: currenciesActionTypes.FETCH_CURRENCIES_ERROR, payload: 'Произошла ошибка, при загрузке currencies!'})
    }
}

export const setCurrencyBase = (currenciesBase: string) => ({
    type: currenciesActionTypes.SET_CURRENCIES_BASE,
    payload: currenciesBase
})
