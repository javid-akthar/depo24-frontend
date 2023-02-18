import React from 'react';
import Navbar from '../Navigation/Navbar';
import Navigation from '../Navigation/Navigation';
import BillingDetails from './BillingDetails';
import CartList from './CartList';

function CartDetails(props) {
    return (
        <>
        <Navigation />
        <div className="d-flex flex-row" style={{columnGap: "10%"}}>
        <CartList/>
        <BillingDetails/>
        </div>
        </>
    );
}

export default CartDetails;