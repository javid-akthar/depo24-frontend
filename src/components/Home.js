import React from 'react';
import ProductList from './AllProductsPage.js/ProductList';
import Navigation from './Navigation/Navigation';

function Home(props) {
    return (
        <div>
            <Navigation />
           <ProductList/>
        </div>
    );
}

export default Home;