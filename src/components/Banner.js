import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';



const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: "url(./bgimage1.jpg)",
    },
    bannerContent:{
        height: 300,
        display: "flex",
        flexDirection: "column",
        paddingTop: 10,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
}))

const Banner = () => {
    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant='h3'
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                            color: "white"
                        }}
                    >
                        Cryptogenic     
                    </Typography>
                    <Typography
                        style={{
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                            color: "white"
                        }}
                    >
                       Check the Battle Between the Crypto Curruncies..!
                    </Typography>
                </div>
                <Carousel/>
            </Container>
        </div>
    )
}

export default Banner;
