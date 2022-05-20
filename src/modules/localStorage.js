import {
  Template
} from './Template.js';

export class Storage {
  static getLocalStorage() {
    if (!localStorage.getItem('productsCart')) {
      let localStorageContent = [];
      localStorageContent = JSON.stringify(localStorageContent);
      localStorage.setItem('productsCart', localStorageContent);
    }
    if (localStorage.getItem('productsCart')) {
      let arrObj = localStorage.getItem('productsCart');
      arrObj = JSON.parse(arrObj);
    }
  }

  static addToLocalStorage(obj) {
    let getArr = localStorage.getItem('productsCart');
    let arrProducts = JSON.parse(getArr);

    arrProducts.push(obj);
    arrProducts = JSON.stringify(arrProducts);
    localStorage.setItem('productsCart', arrProducts);
  }

  static removeFromLocalStorage(id) {
    let getArr = localStorage.getItem('productsCart');
    let arrProducts = JSON.parse(getArr);
    let index;

    while (arrProducts.some(product => product[0].id == id)) {
      for (let i = 0; i < arrProducts.length; i++) {
        if (arrProducts[i][0].id == id) {
          index = i;
          arrProducts.splice(index, 1);
        }
      }
    }

    arrProducts = JSON.stringify(arrProducts);
    localStorage.setItem('productsCart', arrProducts);
  }

  static localStorageRender() {
    document.querySelector('.shopping-cart-products').innerHTML = '';

    let getArr = localStorage.getItem('productsCart');
    let arrProducts = JSON.parse(getArr);

    let arrMapeada = arrProducts.map(product => product[0]);

    arrMapeada.forEach(produto => {
      const {
        nome,
        preco,
        categoria,
        imagem,
        id
      } = produto;

      //Verificacao do produto
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

      //append
      shoppingDivImg.append(img);
      shoppingDivDetails.append(h4, p, small);
      shoppingDivDelete.append(button, pQnt);

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