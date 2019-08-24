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
    let product: ProductModel = {
      name: "Test",
      grossPrice: 15,
      netPrice: 12
    }
    this.state = {
      products: [
        product
      ]
    };
  }

  getFileFromInput(file: File): Promise<any> {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () { resolve(reader.result); };
      reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
    });
  }

  manageUploadedFile(binary: String, file: File) {
    // do what you need with your file (fetch POST, ect ....)
    console.log(`The file size is ${binary.length}`);
    console.log(`The file name is ${file.name}`);
  }

  handleFileChange(event: React.ChangeEvent<HTMLInputElement>) : void {
    event.persist();

    let file : File = event.target.files[0] as File;

      this.getFileFromInput(file)
        .then((binary) => {
          this.manageUploadedFile(binary, file);
        }).catch(function (reason) {
          console.log(`Error during upload ${reason}`);
          event.target.value = ''; // to allow upload of same file if error occurs
        })
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
            Picture.
            <UploadFileComponent onChange={this.handleFileChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
