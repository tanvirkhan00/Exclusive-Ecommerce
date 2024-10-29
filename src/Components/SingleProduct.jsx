import React from 'react';

// Icons
import { IoRefreshCircleOutline } from "react-icons/io5";
import { TbCar } from "react-icons/tb";



const SingleProduct = () => {
    return (
        <>
           <section>
            <div className="container">
                <div>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <h1></h1>
                        <div>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <h2></h2>
                        <p></p>
                        <p>Colors: </p>
                        <div>
                            <p>Size: </p>
                            <div>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                        </div>
                        <div>
                            <input type="number" />
                            <button>Buy Now</button>
                            <span></span>
                        </div>
                        <div>
                            <div>
                                <span><TbCar/></span>
                                <div>
                                    <h3>Free Delivery</h3>
                                    <a>Enter your postal code for delivery available</a>
                                </div>
                            </div>
                            <div>
                                <span><IoRefreshCircleOutline/></span>
                                <div>
                                    <h1>Return Delivery</h1>
                                    <a>Free 30 days delivery returns. <span>Details</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </section>
            
        </>
    );
};

export default SingleProduct;