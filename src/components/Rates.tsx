import {useTypedSelector} from "../hooks/useTypedSelector";
import {calculateCurrencyRate} from "../utils/CulculateCurrencyRate";
import React, {useEffect, useState} from "react";
import {ratesType} from "../types/currencies";
import {
    Button,
    Container, Grid,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
    container: {
        alignItems: "flex-start",
        width: "650px !important",
        margin: "0 auto",
        paddingTop: "80px",
    },
    link: {
        paddingLeft: "0 !important",
        marginBottom: "20px !important",
    }
});

const Rates = () => {
    const {currentCurrency, rates} = useTypedSelector(state => state.currenciesReducer)
    const [newRate, setNewRate] = useState<ratesType | null>(null)

    const classes = useStyles();
    useEffect(() => {
        if (rates) {
            Object.keys(rates).forEach(rate => (
                setNewRate(states => ({...states, [rate]: calculateCurrencyRate(currentCurrency, rate, 1, rates)}))
            ))
        }
    }, [rates])

    return (
        <>
            <Container maxWidth="md">
                <Grid container flexDirection={"column"} className={classes.container}>
                    <Grid item>
                        <Button component={NavLink} to={'/'} className={classes.link}>Next</Button>
                    </Grid>
                    <Paper sx={{width: '650px', overflow: 'hidden'}}>
                        <TableContainer sx={{maxHeight: 440, maxWidth: 650}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={2} style={{fontWeight: 600}}>{`1  ${currentCurrency}`}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" style={{top: 57, fontWeight: 600}}>Rates</TableCell>
                                        <TableCell align="left" style={{top: 57, fontWeight: 600}}>Currency</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {newRate && Object.keys(newRate).map((rate) => (
                                        <TableRow
                                            key={rate}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="left">{newRate[rate]}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {rate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}

export default Rates