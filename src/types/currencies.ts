export interface currenciesState {
    currencies: string[],
    baseCurrency: string,
    currentCurrency: string,
    date: string,
    rates: ratesType | null,
    success: boolean,
    timestamp: number,
    loading: boolean,
    error: null | string
}

export type ratesType = {
    [key: string]: number
}

export enum currenciesActionTypes {
    FETCH_CURRENCIES = 'FETCH_CURRENCIES',
    FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS',
    FETCH_CURRENCIES_ERROR = 'FETCH_CURRENCIES_ERROR',
    SET_CURRENCIES_BASE = 'SET_CURRENCIES_BASE'
}

interface FetchCurrenciesAction {
    type: currenciesActionTypes.FETCH_CURRENCIES
}
interface FetchCurrenciesSuccessAction {
    type: currenciesActionTypes.FETCH_CURRENCIES_SUCCESS
    payload: object
}
interface FetchCurrenciesErrorAction {
    type: currenciesActionTypes.FETCH_CURRENCIES_ERROR
    payload: string
}
interface setCurrenciesBaseAction {
    type: currenciesActionTypes.SET_CURRENCIES_BASE
    payload: string
}

export type CurrenciesAction = FetchCurrenciesAction | FetchCurrenciesSuccessAction | FetchCurrenciesErrorAction | setCurrenciesBaseAction
