import React from "react";
// useSelector,
import {  useDispatch } from "react-redux";
import { productActions } from "../../store/product";
import Env from '../../config/environment'


function IncreaseItem(props) {
  const dispatch = useDispatch();
  let uniqueId = props.uniqueId;
  let buttonName = props.buttonName;
  console.log("uniqueId", uniqueId);
  let addToCart = (uniqueId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      productId: uniqueId,
      action: "increase",
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
        dispatch(productActions.addToCart(uniqueId));
      })
      .catch((error) => console.log("error", error));

    // dispatch(productActions.addToCart(uniqueId));
  };
  return (
    <button
      onClick={() => {
        addToCart(uniqueId);
      }}
      type="button"
      className="btn btn-secondary"
    >
      {buttonName || <i className="fa-solid fa-plus"></i>}
    </button>
  );
}

export default IncreaseItem;
