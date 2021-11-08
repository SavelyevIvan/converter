import {CurrenciesAction, currenciesState, currenciesActionTypes} from "../../types/currencies";

const initialState: currenciesState = {
    currencies: ["RUB", "USD", "EUR", "GBP", "JPY"],
    baseCurrency: "EUR",
    currentCurrency: "RUB",
    date: "2021-11-04",
    rates: null,
    success: false,
    timestamp: 1636022284,
    loading: false,
    error: null,
}

export const currenciesReducer = (state = initialState, action: CurrenciesAction): currenciesState => {
    switch (action.type) {
        case currenciesActionTypes.FETCH_CURRENCIES:
            return {
                ...state,
                loading: true
            }
        case currenciesActionTypes.FETCH_CURRENCIES_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.payload
            }
        case currenciesActionTypes.FETCH_CURRENCIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case currenciesActionTypes.SET_CURRENCIES_BASE:
            return {
                ...state,
                currentCurrency: action.payload
            }
        default:
            return state
    }
}

