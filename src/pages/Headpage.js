import React from 'react';
import Banner from '../components/Banner';
import Coinstbl from '../components/Coinstbl';
import { Outlet } from 'react-router-dom';


const Headpage = () => {
    return (
        <>
            <Banner />
            <Coinstbl />
            <Outlet/>
        </>
    )
}

export default Headpage
