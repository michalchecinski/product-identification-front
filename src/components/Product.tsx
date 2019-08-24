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
                {product.name}
            </div>
            <div className="row">
                <div className="col">
                    {product.grossPrice}
                </div>
                <div className="col">
                    (netto: {product.netPrice})
                </div>
            </div>
        </div>
    </div>
);

export default Product