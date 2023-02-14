import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    TableCell,
    LinearProgress,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
    createTheme,
    ThemeProvider
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./NumberWithComma";


export default function Coinstbl() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const useStyles = makeStyles({
        row: {
            backgroundColor: '#21262d',
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#3e79bb",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    });

    const classes = useStyles();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList("INR"));

        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    return (

        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <TextField
                    label="Search For Your Favorite Crypto Currency.."
                    variant="outlined"
                    style={{ marginTop: 10, width: "100%", zIndex: 1 }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer component={Paper} style={{ marginTop: 14 }}>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "blue" }} />
                    ) : (
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#3e79bb" }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "white",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow
                                                className={classes.row}
                                                key={row.name}
                                                onClick={() => navigate(`/${row.id}`)}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell align="right">
                                                    {`₹`}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>

                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>

                                                <TableCell align="right">
                                                    {`₹`}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}
                                                    M
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </Container>
        </ThemeProvider>

    );
}