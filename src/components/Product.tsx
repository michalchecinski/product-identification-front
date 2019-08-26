import React, { FunctionComponent } from "react";
import { ProductModel } from "../models/productModel";

interface Props {
    product: ProductModel;
}

const Product: FunctionComponent<Props> = ({ product }) => (
    <div className="row border border-primary m-1">
        <div className="col-3">
            img
        </div>
        <div className="col">
            <div className="row">
                <h5>{product.Name}</h5>
            </div>
            <div className="row">
                <div className="col">
                    <h6>{product.GrossPrice} <small>(netto: {product.NetPrice})</small></h6>
                </div>
            </div>
        </div>
        <div className="col-3">
            <div className="row">
                <h5>x{product.Quantity}</h5>
            </div>
            <div className="row">
                <h6>{product.Quantity*product.GrossPrice}</h6> (netto: {product.Quantity*product.NetPrice})
            </div>
        </div>
    </div>
);

export default Product