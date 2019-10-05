import React, { FunctionComponent } from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { ReceiptComponentProps } from "../models/ReceiptComponentProps";
import { ProductModel } from "../models/ProductModel";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        textAlign: 'left',
        margin: 30,
        padding: 10,
        flexGrow: 1
    }
});

interface Props {
    products: ProductModel[];
}

const Pdf: FunctionComponent<Props> = ({ products }) => {
    var netSum: number = 0.0;
    var grossSum: number = 0.0;

    products.forEach(product => {
        netSum += (product.Quantity * product.NetPrice);
        grossSum += (product.Quantity * product.GrossPrice);
    })

    return (<Document>
        <Page size="A4" style={styles.page}>

            {products.map(product => (
                <View style={styles.section}>
                    <Text>
                        {product.Name} x{product.Quantity}
                    </Text>
                    <Text>
                        {product.Quantity}x {product.GrossPrice} (netto: {product.NetPrice}) =
                     {product.Quantity * product.GrossPrice} (netto: {product.Quantity * product.NetPrice})
                </Text>
                </View>
            ))}
            <View style={styles.section}>
                <Text>Suma: {grossSum} (netto: {netSum})</Text>
            </View>
        </Page>
    </Document>
    );
}

const Receipt: FunctionComponent<ReceiptComponentProps> = (props) => {
    return (
        <PDFDownloadLink document={<Pdf products={props.products} />} fileName="paragon.pdf">
            {({ blob, url, loading, error }) => {
                if (loading) {
                    return <div style={{ textAlign: "center" }}>Przetwarzanie koszyka...</div>;
                }
                else {
                    return (
                        <div style={{ textAlign: "center" }} className="mt-4">
                            <div className="btn btn-primary" onClick={props.afterGenerate()}>Zakończ i zapłać!</div>
                        </div>
                    )
                }
            }}
        </PDFDownloadLink>
    );
}

export default Receipt;