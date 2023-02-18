import React from "react";
import { Link } from "react-router-dom";

function Navigation(props) {
    let paddingStyle = {
        padding: "10px"
    }
  return (
    <div className="d-flex justify-content-end">
      <div style={paddingStyle}>
        <Link to="/card-details">
          <button type="button" className="btn btn-primary">
            Go to Cart
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </Link>
      </div>
      <div style={paddingStyle}>
        <Link to="/invoice-details">
          <button type="button" className="btn btn-primary">
            Go to Invoice Page
            
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
