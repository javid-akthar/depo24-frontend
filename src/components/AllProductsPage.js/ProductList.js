import React,{ useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
import {productActions} from '../../../src/store/product'
import ImageComingSoon from '../../assets/ImageComingSoon.webp'
import IncreaseItem from '../ProductActions.js/IncreaseItem';
import Env from '../../config/environment'

function ProductList(props) {
    const dispatch = useDispatch();
  // importing productList from store
    const productList = useSelector((state) => state.productData.productList);
    let ele = "";
    useEffect(()=>{
        console.log("line2");
        fetch(Env.url + "api/v1/products")
        .then(async (response) =>{
            console.log("response1",response)
            response = await response.json();
            console.log("response",response);
            console.log('productActions',productActions);
            dispatch(productActions.updateProductList(response));
        }).then((json) => console.log(json));

        fetch(Env.url + "api/v1/cart")
        .then(async (response) =>{
            console.log("cartListresponse",response)
            response = await response.json();
            console.log("response",response);
            console.log('productActions',productActions);
            dispatch(productActions.updateCartList(response));
        }).then((json) => console.log(json));


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let flexMainDiv = {
        padding: "63px",
        columnGap: "20px",
        rowGap: "20px",
        justifyContent: "space-around",
        paddingTop: "4px"
      };

      let albumBodyStyle = {
        backgroundColor: "rgb(250,234,235)",
      };

      if (productList != null) {
        console.log("productList", productList);
        // rendering the productList card with details got from db through store
        ele = Object.keys(productList).map((item) => {
            item = productList[item];
          return (
            <div key={"product"+item.dsin} className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={ImageComingSoon} alt={"image"+item.title} />
              <div className="card-body" style={albumBodyStyle}>
                <h5 className="card-title">{item.system_listing_name}</h5>
                {/* <p className="card-text">{item.description}</p> */}
                <table
                  className="table table-sm table-white"
                  style={{ border: "0px solid white" }}
                >
                  <tbody>
                    <tr>
                      <th scope="row">price</th>
                      {console.log("itemitem",item)}
                      {console.log("itemitem",item.mrp)}
                      {console.log("itemitem",item.mrp.$numberDecimal)}
                      <td>{item.mrp.$numberDecimal+" rs"}</td>
                    </tr>

                    {/* <tr>
                      <th scope="row">rating</th>
                      <td>{item.rating}</td>
                    </tr> */}
                    {/* <tr>
                      <th scope="row">brand</th>
                      <td>{item.brand}</td>
                    </tr> */}
                    {/* <tr>
                      <th scope="row">category</th>
                      <td>{item.category}</td> */}
                    {/* </tr> */}
                  </tbody>
                </table>
                <IncreaseItem uniqueId={item._id} buttonName={"Add To Cart"}></IncreaseItem>

                
                {/* <div style={funcBtn}> 
                 <AddToCart uniqueId={item.id} />
                 />
                </div>
                 */}
              </div>
            </div>
          );
        });
      }  

    return (
        // flex container to hold the productlist cards
    <div className="d-flex flex-wrap" style={flexMainDiv}>
    {ele}
  </div>
    );
}

export default ProductList;