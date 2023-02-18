import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../src/store/product";
import "../Navigation/toastr.css";
import toastr from "toastr";
import { triggerBase64Download } from "common-base64-downloader-react";
import { Buffer } from "buffer";
import Env from '../../config/environment'


function InvoiceList(props) {
  const dispatch = useDispatch();

  const invoiceList = useSelector((state) => state.productData.invoiceList);

  useEffect(() => {
    fetch(Env.url + "api/v1/invoice/")
      .then(async (response) => {
        console.log("response1", response);
        response = await response.json();
        console.log("response", response);
        console.log("productActions", productActions);
        dispatch(productActions.updateInvoiceList(response));
      })
      .then((json) => console.log(json));
  }, []);
  let listWidth = {
    width: "200px",
  };

  let ele = null;
  let downloadInvoice = (item) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      invoiceId: item,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    toastr.options.timeOut = 1500;
    toastr.success("downloading");
    fetch(
      Env.url + "api/v1/invoice/generate-invoice",
      requestOptions
    )
      .then((response) => {
        response.blob().then((blob) => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = item + ".pdf";
          alink.click();
        });
      })
      .then((data) => {
        // var base64Str = Buffer.from(data).toString('base64');
        // base64.base64Decode(base64Str, "file.pdf");
        // triggerBase64Download(base64Str, 'download_name')
      })
      .catch((error) => console.log("error", error));
  };

  let flexStyle = {
    display: "flex",
    flexWrap: "wrap",
  };
  let invoiceLine = {
    width: "200px",
    height: "30px",
    margin: "10px"
  }
  ele = invoiceList.map((item) => {
    return (
      <div key={item} onClick={() => downloadInvoice(item)} type="button" style={invoiceLine} className="btn btn-outline-info">
        {item}
      </div>
    );
  });
  return (
    <>
      <li
        className="list-group-item list-group-item-action active"
        style={{ textAlign: "center" }}
      >
        Available Invoices
      </li>
      <div style={flexStyle}>{ele}</div>
    </>
  );
}

export default InvoiceList;
