import {Template} from './Template.js';
export class Filter {
  static filterByInput(input, data) {
    let inputText = input.toLowerCase();

    const filterdedData = data.filter(product => {
      const nomeProduto = product.nome.toLowerCase();
      const catProduto = product.categoria.toLowerCase();

      if (nomeProduto.includes(inputText) || catProduto.includes(inputText)) {
        return true;
      }
    });
    return filterdedData;
  }

  static filterById(idProduto, data) {
    const filterdedData = data.filter(product => {
      if (product.id.includes(idProduto)) {
        return true;
      }
    });
    return filterdedData;
  }
}
