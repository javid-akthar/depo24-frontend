import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../src/store/product";
import IncreaseItem from "../ProductActions.js/IncreaseItem";
import ImageComingSoon from "../../assets/ImageComingSoon.webp";
import DecreaseItem from "../ProductActions.js/DecreaseItem";
import Env from '../../config/environment'


function CartList(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productData.productList);
  const cartList = useSelector((state) => state.productData.cartList);
  const totalCost = useSelector((state) => state.productData.totalCost);
  const gstCost = useSelector((state) => state.productData.gstCost);
  const sum = useSelector((state) => state.productData.sum);

  useEffect(() => {
    fetch(Env.url + +"api/v1/products")
      .then(async (response) => {
        console.log("response1", response);
        response = await response.json();
        console.log("response", response);
        console.log("productActions", productActions);
        dispatch(productActions.updateProductList(response));
      })
      .then((json) => console.log(json));

    fetch("http://localhost:3008/api/v1/cart")
      .then(async (response) => {
        console.log("cartListresponse", response);
        response = await response.json();
        console.log("response", response);
        console.log("productActions", productActions);
        dispatch(productActions.updateCartList(response));
      })
      .then((json) => console.log(json));
  }, []);

  let albumBodyStyle = {
    backgroundColor: "rgb(250,234,235)",
  };

  let flexMainDiv = {
    padding: "4px 10px 38px",
    columnGap: "20px",
    rowGap: "20px",
    justifyContent: "space-evenly",
    width: "40%",
    display: "inline-block",
  };

  let ele = Object.keys(cartList).map((item) => {
    let key = item;
    item = productList[item];
    return (
      <div
        key={"product" + item.dsin}
        className="card"
        style={{ width: "18rem" }}
      >
        <img
          className="card-img-top"
          src={ImageComingSoon}
          alt={"image" + item.title}
        />
        <div className="card-body" style={albumBodyStyle}>
          <h5 className="card-title">{item.system_listing_name}</h5>
          <table
            className="table table-sm table-white"
            style={{ border: "0px solid white" }}
          >
            <tbody>
              <tr>
                <th scope="row">price</th>
                {console.log("itemitem", item)}
                {console.log("itemitem", item.mrp)}
                {console.log("itemitem", item.mrp.$numberDecimal)}
                <td>{item.mrp.$numberDecimal + " rs"}</td>
              </tr>
            </tbody>
          </table>
          {console.log("cartList[key].quantity", cartList[key])}
          <DecreaseItem uniqueId={key}></DecreaseItem>
          <span> {cartList[key]}</span>
          <IncreaseItem uniqueId={key}></IncreaseItem>
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-wrap align-items-start" style={flexMainDiv}>
    {console.log('Object.keys(cartList).length',Object.keys(cartList).length)}
      {Object.keys(cartList).length === 0 && <h2>No items in cart</h2>}
      {ele}
    </div>
  );
}

export default CartList;
