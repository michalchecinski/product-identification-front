import React, { FunctionComponent } from "react";
import Product from './Product'
import { ProductModel } from "../models/productModel";

interface Props {
    products: ProductModel[];
  }

const ProductsList: FunctionComponent<Props> = ({ products }) => (
    <div>
      {products.map(product => (
        <Product key={product.Id} product={product} />
      ))}
    </div>
  );

export default ProductsList