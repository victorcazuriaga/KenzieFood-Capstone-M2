import {Api} from './Api.js';
import {Template} from './Template.js';

export class productsApi {
  static token = sessionStorage.getItem('token');

  static async getCartItens() {
    await Api.cartGet(this.token).then(res => productsApi.renderFromCart(res));
  }

  static renderFromCart(arrProdutos) {
    arrProdutos.forEach(product => {
      const item = product.products;
      const {nome, preco, categoria, imagem, id} = item;

      //Verificacao do produto--------------------------
      const verificacao = document.getElementById(`qnt${id}`);
      if (verificacao) {
        let qntAtual = +verificacao.innerText;
        qntAtual++;
        verificacao.innerText = qntAtual;
        let quantidade = Template.getQuantity();

        Template.setQuantity(quantidade);
        Template.setValue();
        return;
      }

      //create elements
      const cartProduct = document.createElement('div');
      const shoppingDivImg = document.createElement('div');
      const shoppingDivDetails = document.createElement('div');
      const shoppingDivDelete = document.createElement('div');

      const img = document.createElement('img');

      const h4 = document.createElement('h4');
      const p = document.createElement('p');
      const small = document.createElement('small');

      const button = document.createElement('button');
      const i = document.createElement('i');
      const pQnt = document.createElement('p');
      const smallQnt = document.createElement('small');

      //Atribuições
      cartProduct.className = 'shopping-cart-product';
      shoppingDivImg.className = 'shopping-div-img';
      shoppingDivDetails.className = 'shopping-div-details';
      shoppingDivDelete.className = 'shopping-div-delete ';

      img.src = imagem;
      img.className = 'cart-product-img';

      h4.textContent = nome;
      h4.className = 'cart-product-title';
      p.textContent = categoria;
      p.className = 'cart-product-category';
      small.textContent = `R$ ${preco.toFixed(2)}`;
      small.className = 'cart-product-price';
      pQnt.className = 'pQuantidade';

      button.className = 'remove-from-cart';
      button.id = id;
      i.className = 'fa fa-trash';

      pQnt.innerText = 'qnt: ';
      smallQnt.innerText = 1;
      smallQnt.id = `qnt${id}`;
      smallQnt.className = 'quantidade-small';

      pQnt.append(smallQnt);

      button.append(i);

      button.addEventListener('click', event => {
        const button = event.currentTarget;
        Template.removeFromCart(button);
      });

      //Append
      shoppingDivImg.append(img);
      shoppingDivDetails.append(h4, p, small);
      shoppingDivDelete.append(button, pQnt);

      //verifica qnt de produtos
      if (product.quantity) {
        smallQnt.innerText = product.quantity;
      }

      cartProduct.append(shoppingDivImg, shoppingDivDetails, shoppingDivDelete);
      document.querySelector('.shopping-cart-products').append(cartProduct);

      //calcular quantidade
      const quantity = Template.getQuantity();
      Template.setQuantity(quantity);

      //calcular o valor
      Template.setValue();
    });
  }
}
