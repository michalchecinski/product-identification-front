import React, { Component, ChangeEvent } from "react";
import './App.css';
import ProductsList from './components/ProductsList';
import UploadFileComponent from './components/UploadFileComponent';
import { ProductModel } from "./models/productModel";
import { API_URL } from "./config.js";

interface State {
  products: ProductModel[];
}

class App extends Component<{}, State>  {

  constructor(props: State) {
    super(props);

    this.state = {
      products: []
    };
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
          this.setState({
            products: products
          });
          added = true;
        }
      })
      if (added === false) {
        product.Quantity = 1;
        this.setState({
          products: [...this.state.products, product]
        })
      }
    }).catch(function (err) {
      alert("Mamy problemy :(\n\rSpróbuj ponownie lub skontaktuj się z obsługą.");
    })
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();

    let file: File = event.target.files[0] as File;

    this.manageUploadedFile(file);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            Lista produktów:
            <ProductsList products={this.state.products} />
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
