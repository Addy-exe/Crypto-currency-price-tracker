import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { React , useState , useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from '../config/api';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    container: {
        height: "40%",
        display: "flex",
        alignItems: "center"
    },
    carouselItem: {
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textTransform: "uppercase",
    }
}))

function numberWithCommas(n){
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([]); 

    const classes = useStyles();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins("INR"));
        setTrending(data);
    }

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
    },[])

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return(
            <div className={classes.carouselItem}>
                <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{marginBottom: 10}}
                />
                <span>{coin?.symbol}
                &nbsp;
                    <span style={{color: profit > 0 ? "rgb(14,203,129)" : "red"}}>{profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                </span>
                <span style={{ fontSize: 22 , fontWeight: 500}}> 
                ₹{numberWithCommas(coin?.current_price.toFixed())}
                </span>
            </div>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    }

    return (
        <div className={classes.container}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
            >

            </AliceCarousel>
        </div>
    )
}

export default Carousel
