import React, { Component } from "react";
import './App.css';
import ProductsList from './components/ProductsList';
import UploadFileComponent from './components/UploadFileComponent';
import Receipt from './components/ReceiptComponent';
import { ProductModel } from "./models/ProductModel";
import { State } from "./models/State";
import { API_URL } from "./config.js";


class App extends Component<{}, State>  {

  constructor(props: State) {
    super(props);

    var productsFromStorage = localStorage.getItem("products");
    if (productsFromStorage) {
      this.state = {
        products: JSON.parse(productsFromStorage)
      };
    }
    else {
      this.state = {
        products: []
      };
    }
  }

  manageUploadedFile(file: File): void {
    fetch(`${API_URL}/IdentifyProduct`, {
      method: 'post',
      body: file
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 404) {
        throw new Error("Nie znaleziono produktu.")
      }
    }).catch(function (err) {
      alert(err + "\n\r Spróbuj ponownie lub skontaktuj się z obsługą.");
    }).then((data) => {
      var added: boolean = false;
      var product: ProductModel = JSON.parse(data);
      var products: ProductModel[] = this.state.products;
      products.forEach((prod) => {
        if (prod.Id === product.Id) {
          prod.Quantity += 1;
          added = true;
        }
      })
      if (added === false) {
        product.Quantity = 1;
        products = [...products, product]
      }
      this.setState({
        products: products
      })
      localStorage.removeItem("products");
      localStorage.setItem("products", JSON.stringify(this.state.products));

    }).catch(function (err) {
      alert("Mamy problemy :(\n\rSpróbuj ponownie lub skontaktuj się z obsługą.");
    })
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();

    let file: File = event.target.files[0] as File;

    this.manageUploadedFile(file);
  }

  cleanProducts = (): void => {
    this.setState({
      products: []
    })
    localStorage.removeItem("products");
  }

  render() {
    var receiptButton;

    if (this.state.products.length > 0) {
      receiptButton = <Receipt products={this.state.products} afterGenerate={this.cleanProducts} />
    }
    else {
      receiptButton = null;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            Lista produktów:
            <ProductsList products={this.state.products} />
            {receiptButton}
          </div>
          <div className="col-9">
            Naciśnij obrazek poniżej aby dodać nowy produkt do koszyka:
            <UploadFileComponent onChange={this.handleFileChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
