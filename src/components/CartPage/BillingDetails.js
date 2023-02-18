import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../src/store/product";
import '../Navigation/toastr.css';
import toastr from "toastr";
import useInput from "./useInput";
import Env from '../../config/environment'


function BillingDetails(props) {
  const dispatch = useDispatch();

  const cartList = useSelector((state) => state.productData.cartList);
  const totalCost = useSelector((state) => state.productData.totalCost);
  const gstCost = useSelector((state) => state.productData.gstCost);
  const sum = useSelector((state) => state.productData.sum);

  const [billToName, bindBillToName, resetBillToName] = useInput("");
  const [
    billToFlatNoOrBuildingName,
    bindBillToFlatNoOrBuildingName,
    resetBillToFlatNoOrBuildingName,
  ] = useInput("");
  const [billToLocality, bindBillToLocality, resetBillToLocality] =
    useInput("");
  const [billToCity, bindBillToCity, resetBillToCity] = useInput("");
  const [billToState, bindBillToState, resetBillToState] = useInput("");
  const [billToPincode, bindBillToPincode, resetBillToPincode] = useInput("");
  const [billToGstin, bindBillToGstin, resetBillToGstin] = useInput("");

  const [shipToName, bindShipToName, resetShipToName] = useInput("");
  const [
    shipToFlatNoOrBuildingName,
    bindShipToFlatNoOrBuildingName,
    resetShipToFlatNoOrBuildingName,
  ] = useInput("");
  const [shipToLocality, bindShipToLocality, resetShipToLocality] =
    useInput("");
  const [shipToCity, bindShipToCity, resetShipToCity] = useInput("");
  const [shipToState, bindShipToState, resetShipToState] = useInput("");
  const [shipToPincode, bindShipToPincode, resetShipToPincode] = useInput("");
  const [shipToGstin, bindShipToGstin, resetShipToGstin] = useInput("");

  let billingAddressObj = {
    name: billToName,
    flatNoOrBuildingName: billToFlatNoOrBuildingName,
    locality: billToLocality,
    city: billToCity,
    state: billToState,
    pincode: billToPincode,
    gstin: billToGstin,
  };
  let shippingAddressObj = {
    name: shipToName,
    flatNoOrBuildingName: shipToFlatNoOrBuildingName,
    locality: shipToLocality,
    city: shipToCity,
    state: shipToState,
    pincode: shipToPincode,
    gstin: shipToGstin,
  };
  // let orderItemDetails = {}
  let orderItemDetailsArr = Object.keys(cartList).map((key) => {
    return {
      productId: key,
      quantity: cartList[key],
    };
  });
  const submitHandler = (e) => {
    e.preventDefault();
    let placeOrderObj = {
      orderItemDetails: orderItemDetailsArr,
      billingAddress: billingAddressObj,
      shippingAddress: shippingAddressObj,
    };
    console.log("placeOrderObj", placeOrderObj);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(placeOrderObj),
      redirect: "follow",
    };

    fetch(Env.url + "api/v1/cart/place-order", requestOptions)
      .then((response) => {
        response =  response.json();
        dispatch(productActions.refreshCart());
        resetBillToName();
        resetBillToFlatNoOrBuildingName();
        resetBillToLocality();
        resetBillToCity();
        resetBillToState();
        resetBillToPincode();
        resetBillToGstin();
        resetShipToName();
        resetShipToFlatNoOrBuildingName();
        resetShipToLocality();
        resetShipToCity();
        resetShipToState();
        resetShipToPincode();
        resetShipToGstin();
        // response =  response.json();
        return response;
      })
      .then((result) => {console.log("line1",result)
      toastr.options.timeOut = 3000;
      toastr.success("Order place successfully, invoice id"+result.id+ " invoices will be available in invoice page");
    })
      .catch((error) => console.log("error", error));
  };

  console.log("billingAddressObj", billingAddressObj);
  console.log("shippingAddressObj", shippingAddressObj);
  return (
    <form
      style={{ display: "inline-block", width: "40%" }}
      onSubmit={submitHandler}
    >
      <h3>Billing Address</h3>
      <div className="form-group">
        <label for="billToName">Name</label>
        <input
          type="input"
          {...bindBillToName}
          className="form-control"
          id="billToName"
          name="billToName"
        />
      </div>

      <div className="form-group">
        <label for="billToFlatNoOrBuildingName">Flat No / Building Name</label>
        <input
          type="input"
          {...bindBillToFlatNoOrBuildingName}
          className="form-control"
          id="billToFlatNoOrBuildingName"
          name="billToFlatNoOrBuildingName"
        />
      </div>

      <div className="form-group">
        <label for="billToLocality">Locality</label>
        <input
          type="input"
          {...bindBillToLocality}
          className="form-control"
          id="billToLocality"
          name="billToLocality"
        />
      </div>
      <div className="form-group">
        <label for="billToCity">City</label>
        <input
          type="input"
          {...bindBillToCity}
          className="form-control"
          id="billToCity"
          name="billToCity"
        />
      </div>
      <div className="form-group">
        <label for="billToState">State</label>
        <input
          type="input"
          {...bindBillToState}
          className="form-control"
          id="billToState"
          name="billToState"
        />
      </div>
      <div className="form-group">
        <label for="billToPincode">Pincode</label>
        <input
          type="number"
          {...bindBillToPincode}
          className="form-control"
          id="billToPincode"
          name="billToPincode"
        />
      </div>
      <div className="form-group">
        <label for="billToGstin">GSTIN</label>
        <input
          type="text"
          {...bindBillToGstin}
          className="form-control"
          id="billToGstin"
          name="billToGstin"
        />
      </div>

      <h3>Shipping Address</h3>
      <div className="form-group">
        <label for="shipToName">Name</label>
        <input
          type="input"
          {...bindShipToName}
          className="form-control"
          id="shipToName"
          name="shipToName"
        />
      </div>
      <div className="form-group">
        <label for="shipToFlatNoOrBuildingName">Flat No / Building Name</label>
        <input
          type="input"
          {...bindShipToFlatNoOrBuildingName}
          className="form-control"
          id="shipToFlatNoOrBuildingName"
          name="shipToFlatNoOrBuildingName"
        />
      </div>
      <div className="form-group">
        <label for="shipToLocality">Locality</label>
        <input
          type="input"
          {...bindShipToLocality}
          className="form-control"
          id="shipToLocality"
          name="shipToLocality"
        />
      </div>
      <div className="form-group">
        <label for="shipToCity">City</label>
        <input
          type="input"
          {...bindShipToCity}
          className="form-control"
          id="shipToCity"
          name="shipToCity"
        />
      </div>
      <div className="form-group">
        <label for="shipToState">State</label>
        <input
          type="input"
          {...bindShipToState}
          className="form-control"
          id="shipToState"
          name="shipToState"
        />
      </div>
      <div className="form-group">
        <label for="shipToPincode">Pincode</label>
        <input
          type="number"
          {...bindShipToPincode}
          className="form-control"
          id="shipToPincode"
          name="shipToPincode"
        />
      </div>
      <div className="form-group">
        <label for="shipToGstin">GSTIN</label>
        <input
          type="text"
          {...bindShipToGstin}
          className="form-control"
          id="shipToGstin"
          name="shipToGstin"
        />
      </div>

      <div className="d-flex flex-column" style={{ width: "100%" }}>
        <p>
          {" "}
          <b>product Cost</b> : <span>{totalCost}</span>
        </p>
        <p>
          <b>GST Cost</b> : {gstCost}
        </p>
        <p>
          <b>Total Cost</b> : {sum}
        </p>
      </div>
      {console.log('abcc',Object.keys(cartList).length)}
    {Object.keys(cartList).length === 0 ||
      <button type="submit" className="btn btn-primary">
        Place Order
      </button>
    }
    </form>
  );
}

export default BillingDetails;
