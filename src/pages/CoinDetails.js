import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CircularProgress, Typography } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from '../components/NumberWithComma';
import axios from 'axios';
import CoinGraph from '../components/CoinGraph';


const useStyles = makeStyles(() => ({
  container: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 2
  },
  details: {
    width: '65%',
    height: '75%',
    color: 'white',
    backgroundColor: 'rgba(52, 62, 70,0.8)',
    display: 'flex',
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
  },
  pricesBox: {
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 28,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  priceTag: {
    fontSize: 14,
    letterSpacing: 1,
    color: 'darkgrey'
  }
}))


const CoinDetails = () => {

  // State 
  const [coinInfo, setCoinInfo] = useState();


  const navigate = useNavigate()
  const { id } = useParams()
  const classes = useStyles()

  // get Coin details
  const getCoindetails = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoinInfo(data)
  }

  useEffect(() => {
    getCoindetails()
  }, [id])

  console.log(coinInfo)

  return ReactDOM.createPortal(

    <div className={classes.container} onClick={() => navigate('..')}>
      {coinInfo ? (
        <div className={classes.details} onClick={(e) => e.stopPropagation()}>

          <div style={{ margin: 14 , height: '100%' , width: '25%'}}>

            <div className={classes.titleBox}>
              <img src={coinInfo.image.large} style={{ width: 90, height: 90 }} alt={coinInfo.id} />
              <div>
                <Typography variant='h2' style={{ fontSize: 22, letterSpacing: 2 }}>
                  {coinInfo.name}
                </Typography>
                <span style={{ fontSize: 20, textTransform: 'uppercase', color: '#38E54D' }}>
                  {coinInfo.symbol}
                </span>
              </div>
            </div>

            <div className={classes.pricesBox}>
              <div className={classes.priceContainer}>
                <span className={classes.priceTag}>Price</span>
                <Typography variant='h2' style={{ fontSize: 18 }}>
                  ₹ {numberWithCommas(coinInfo.market_data.current_price.inr)}
                </Typography>
              </div>

              <div className={classes.priceContainer}>
                <span className={classes.priceTag}>Market Cap</span>
                <Typography variant='h2' style={{ fontSize: 18 }}>
                  ₹ {numberWithCommas(
                    coinInfo.market_data.market_cap.inr.toString().slice(0, -6)
                  )} M
                </Typography>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12}}>
                <span className={classes.priceTag}>Market Cap Rank :</span>
                <Typography variant='h2' style={{ fontSize: 18 }}>
                  {coinInfo.market_data.market_cap_rank}
                </Typography>
              </div>
            </div>

          </div>

          <CoinGraph id={id} />

        </div>
      ) : (
        <CircularProgress />
      )}
    </div>,

    document.getElementById("modal")
  )
}

export default CoinDetails