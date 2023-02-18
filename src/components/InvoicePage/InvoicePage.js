import React from 'react';
import Navigation from '../Navigation/Navigation';
import InvoiceList from './InvoiceList';

function InvoicePage(props) {
    return (
        <>
        <Navigation />
        <InvoiceList/>
        </>
    );
}

export default InvoicePage;