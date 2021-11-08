import {ratesType} from "../types/currencies";

export const calculateCurrencyRate = (currentCurrency: string, convertTo: string, amount: number, rates: ratesType | null) => {
    let result = 0
    if (rates) {
        const rate = rates[convertTo] / rates[currentCurrency] * amount
        result = Number(rate.toFixed(4))
}
    return result
}