import Home from './components/Home';
import { Route } from "react-router-dom";
import CartDetails from './components/CartPage/CartDetails';
import InvoicePage from './components/InvoicePage/InvoicePage';
import Navbar from './components/Navigation/Navbar';


function App() {
  return (
    <>
    
    <Navbar/>
      <Route exact path='/' component={Home} /> 
      <Route  path="/card-details">
        <CartDetails />
      </Route>
      <Route  path="/invoice-details">
        <InvoicePage />
      </Route>
    </>
  );
}

export default App;
