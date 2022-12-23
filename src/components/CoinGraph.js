import React, { useState, useEffect } from 'react';
import { HistoricalChart } from '../config/api';
import { makeStyles } from '@material-ui/core';
import {
    CircularProgress,
    Typography,
    Button
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { chartSelect } from '../config/chartSelect';
import axios from 'axios';



const useStyles = makeStyles(() => ({
    container: {
        width: '78%',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}))


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CoinGraph = ({ id }) => {

    const [historicData, sethistoricData] = useState();
    const [days, setDays] = useState(1);

    const classes = useStyles();

    const getHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(id, days, "INR"))
        sethistoricData(data.prices)
    }

    useEffect(() => {
        getHistoricalData();
    }, [id, days]);

    return (
        <div className={classes.container}>
            {!historicData ? (
                <CircularProgress />
            ) : (
                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                }}>
                    <Line
                        data={{
                            labels: historicData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` :
                                    `${date.getHours()}:${date.getMinutes()} AM`;

                                return days === 1 ? time : date.toLocaleDateString()
                            }),

                            datasets: [
                                {
                                    data: historicData.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days) in INR`,
                                    borderColor: "#77bdfb",
                                }
                            ]
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                        }}
                    />
                    <div className={classes.buttonContainer}>
                        {chartSelect.map((val) => {
                            const selected = val.value === days;

                            return (
                                <Button
                                    style={{
                                        color: 'white',
                                        width: 140,
                                        borderColor: 'white',
                                        backgroundColor: selected ? '#77bdfb':'',
                                        transition: '0.7s',
                                    }}
                                    onClick={() => setDays(val.value)}
                                >{val.lable}
                                </Button>
                            )

                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CoinGraph


