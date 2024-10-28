import React from 'react';
import HiroHome from '../Components/HiroHome';
import BestSelling from '../Components/BestSelling';
import CategoriMusic from '../Components/CategoriMusic';
import ExploreProducts from '../Components/ExploreProducts';
import NewArrival from '../Components/NewArrival';
import WorkAbout from '../Components/WorkAbout';

const Home = () => {
    return (
        <>
            <HiroHome />
            <BestSelling />
            <CategoriMusic />
            <ExploreProducts />
            <NewArrival />
            <WorkAbout />
        </>
    );
};

export default Home;