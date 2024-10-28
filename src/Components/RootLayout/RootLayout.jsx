import React from 'react';
import Header from '../Header';

import { Outlet } from 'react-router';
import Footer from '../Footer';
import { ScrollRestoration } from 'react-router-dom';

const RootLayout = () => {
    return (
        <>

            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
            
        </>
    );
};

export default RootLayout;