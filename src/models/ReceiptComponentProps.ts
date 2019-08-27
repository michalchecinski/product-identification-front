import { ProductModel } from "./ProductModel";

export interface ReceiptComponentProps {
    products: ProductModel[];
    afterGenerate: () => void;
}