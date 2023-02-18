import React from "react";
import {  useDispatch } from "react-redux";
import { productActions } from "../../store/product";
import Env from '../../config/environment'


function DecreaseItem(props) {
  const dispatch = useDispatch();
  let uniqueId = props.uniqueId;
  console.log("uniqueId", uniqueId);
  let removeFromCart = (uniqueId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      productId: uniqueId,
      action: "decrease",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Env.url + "api/v1/cart/update", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if(result.status === "success")
        dispatch(productActions.removeFromCart(uniqueId));
      })
      .catch((error) => console.log("error", error));

    // dispatch(productActions.addToCart(uniqueId));
  };
  return (
    <button
      onClick={() => {
        removeFromCart(uniqueId);
      }}
      type="button"
      className="btn btn-secondary"
    >
      <i className="fa-solid fa-minus"></i>
    </button>
  );
}

export default DecreaseItem;
