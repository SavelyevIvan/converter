import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchCurrencies, setCurrencyBase} from "../store/action/currencies";
import {v4 as uuidv4} from 'uuid';
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";

import {useTypedSelector} from "../hooks/useTypedSelector";
import {makeStyles} from "@mui/styles";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {NavLink} from "react-router-dom";
import {calculateCurrencyRate} from "../utils/CulculateCurrencyRate";

const useStyles = makeStyles({
    container: {
        paddingTop: '100px'
    },
    input: {
        width: '100%',
        '& div input': {
            '&::-webkit-inner-spin-button': {
                appearance: 'none',
                margin: 0,
            }
        },
    },
    link: {}
});

interface InitialStateTypes {
    amount: number,
    convertTo: string,
    result: number
}

const Converter: React.FC = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const {currencies, currentCurrency, rates} = useTypedSelector(state => state.currenciesReducer)
    const [state, setState] = React.useState<InitialStateTypes>({
        amount: 1,
        convertTo: "EUR",
        result: 0,
    });


    useEffect(() => {
        if (rates) {
            setState(state => ({
                ...state,
                result: calculateCurrencyRate(currentCurrency, state.convertTo, state.amount, rates)
            }))
        }
    }, [rates, currentCurrency, state.convertTo])

    const onChangeSelect = (e: SelectChangeEvent) => {
        if (e.target.name === "current-currency") {
            dispatch(setCurrencyBase(e.target.value))
        }
        if (e.target.name === "convert-to-currency") {
            setState(state => ({...state, convertTo: e.target.value}))
        }
    };

    const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({
            ...state,
            amount: Number(e.target.value),
            result: calculateCurrencyRate(currentCurrency, state.convertTo, Number(e.target.value), rates)
        }))
    };

    const onChangeResult = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({
            ...state,
            amount: calculateCurrencyRate(state.convertTo, currentCurrency, Number(e.target.value), rates),
            result: Number(e.target.value)
        }))
    };

    const reverseConverter = () => {
        setState(state => ({...state, convertTo: currentCurrency}))
        dispatch(setCurrencyBase(state.convertTo))
    }

    return (
        <Container className={classes.container} maxWidth="md">
            <Grid container spacing={2}>
                <Grid style={{alignSelf: "stretch"}} item>
                    <Button
                        style={{height: "100%"}}
                        variant="contained" size="medium"
                        onClick={reverseConverter}
                    >
                        <ArrowUpwardIcon/>
                        <ArrowDownwardIcon/>
                    </Button>
                </Grid>
                <Grid container item xs={10} spacing={1}>
                    <Grid item xs={10}>
                        <TextField
                            value={state.amount ? state.amount : ""}
                            className={classes.input}
                            inputProps={{type: 'number'}}
                            autoFocus={true}
                            onChange={onChangeAmount}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="current-currency"
                                value={currentCurrency}
                                label="currency"
                                onChange={onChangeSelect}
                            >
                                {
                                    currencies.map((item, index) => (
                                        <MenuItem value={item} key={uuidv4()}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            value={state.result ? state.result : ''}
                            className={classes.input}
                            inputProps={{type: 'number'}}
                            onChange={onChangeResult}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="convert-to-currency"
                                value={state.convertTo}
                                label="currency"
                                onChange={onChangeSelect}
                            >
                                {
                                    currencies.map((item, index) => (
                                        <MenuItem value={item} key={uuidv4()}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button component={NavLink} to={'/rates'} >Vue all rates</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Converter