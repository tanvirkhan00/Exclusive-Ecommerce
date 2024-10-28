import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

let apiData = createContext()

const ContextApi = ({children}) => {

    let [info, setInfo] =useState([])
    useEffect (() => {
        axios.get("https://dummyjson.com/products").then((response) => {
            setInfo(response.data.products)
            
        })
    },[])
    return (
        <apiData.Provider value={info}>{children}</apiData.Provider>
    );
    
};

export {ContextApi, apiData};