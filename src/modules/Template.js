
import {Api} from './Api.js';
import {Filter} from './filter.js';
import {Storage} from './localStorage.js';
export class Template {
  static prodctsDisplay = document.getElementById('products-display');
  static cartItemList = [];

  static createProductList(productsArr) {
    Template.prodctsDisplay.innerHTML = '';

    for (let i = 0; i < productsArr.length; i++) {
      /* Criando as tags para cada produto */

      const productCard = document.createElement('div');
      const imageContainer = document.createElement('figure');
      const productImage = document.createElement('img');
      const productDetails = document.createElement('div');
      const productTitle = document.createElement('h4');
      const productDescription = document.createElement('p');
      const productCategories = document.createElement('ul');
      const productCategory = document.createElement('li');
      const productPurcharse = document.createElement('div');
      const productPrice = document.createElement('small');
      const addToCartButton = document.createElement('button');
      const carrIcon = document.createElement('i');

      /*   Atribuindo classes/Ids */

      productCard.className = 'product';
      imageContainer.className = 'product-image-container';
      productImage.className = 'product-image';
      productImage.alt = '';
      productDetails.className = 'product-details';
      productTitle.className = 'product-title';
      productDescription.className = 'product-description';
      productCategories.className = 'product-categories';
      productCategory.className = 'product-category';
      productPurcharse.className = 'product-purcharse';
      productPrice.className = 'product-price';
      addToCartButton.className = 'btn-addToCart';
      addToCartButton.id = productsArr[i].id;
      carrIcon.className = 'fas fa-shopping-cart product-cart';

      /* Atribuindo valor de texto as tags */

      productImage.src = productsArr[i].imagem;
      productTitle.innerText = productsArr[i].nome;
      productDescription.innerText = productsArr[i].descricao;
      productCategory.innerText = productsArr[i].categoria;
      productPrice.innerText = `R$ ${productsArr[i].preco.toFixed(2)}`;

      /* Dando appendChild */

      Template.prodctsDisplay.appendChild(productCard);
      productCard.appendChild(imageContainer);
      imageContainer.appendChild(productImage);
      productCard.appendChild(productDetails);
      productDetails.appendChild(productTitle);
      productDetails.appendChild(productDescription);
      productDetails.appendChild(productCategories);
      productCategories.appendChild(productCategory);
      productDetails.appendChild(productPurcharse);
      productPurcharse.appendChild(productPrice);
      productPurcharse.appendChild(addToCartButton);
      addToCartButton.appendChild(carrIcon);
    }

    Template.buttonAddEventListener(productsArr);
  }

  //----------------------------------AddToCart

  static addToCart(product) {
    Storage.addToLocalStorage(product);

    const item = product[0];
    const {nome, preco, categoria, imagem, id} = item;

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

    //Atribuições
    cartProduct.className = 'shopping-cart-product';
    shoppingDivImg.className = 'shopping-div-img';
    shoppingDivDetails.className = 'shopping-div-details';
    shoppingDivImg.className = 'shopping-div-img';

    img.src = imagem;
    img.className = 'cart-product-img';

    h4.textContent = nome;
    h4.className = 'cart-product-title';
    p.textContent = categoria;
    p.className = 'cart-product-category';
    small.textContent = `R$ ${preco.toFixed(2)}`;
    small.className = 'cart-product-price';

    button.className = 'remove-from-cart';
    button.id = id;
    i.className = 'fa fa-trash';

    button.append(i);

    button.addEventListener('click', event => {
      const button = event.currentTarget;
      Template.removeFromCart(button);
    });

    //append
    shoppingDivImg.append(img);
    shoppingDivDetails.append(h4, p, small);
    shoppingDivDelete.append(button);

    cartProduct.append(shoppingDivImg, shoppingDivDetails, shoppingDivDelete);
    document.querySelector('.shopping-cart-products').append(cartProduct);

    //calcular quantidade
    const quantity = Template.getQuantity();
    Template.setQuantity(quantity);

    //calcular o valor
    Template.setValue();
  }

  static removeFromCart(target) {
    const divToDelete = target.closest('.shopping-cart-product');
    divToDelete.remove();

    const quantity = Template.getQuantity();
    Template.setQuantity(quantity);

    Template.setValue();

    const id = target.id;
    Storage.removeFromLocalStorage(id);
  }

  static getQuantity() {
    const div = document.querySelector('.shopping-cart-products');
    const quantity = div.children.length;
    return quantity;
  }

  static setQuantity(valor) {
    const quantitySpan = document.getElementById('span-amount');
    quantitySpan.innerText = valor;
  }

  static setValue() {
    const valores = document.querySelectorAll('.cart-product-price');
    const smallValue = document.getElementById('span-value');
    let valorTotal = 0;

    valores.forEach(valor => {
      let valorSomar = valor.innerText;
      let sliced = valorSomar.slice(3);
      valorTotal += Number(sliced);
    });
    smallValue.innerText = valorTotal.toFixed(2);
  }

  static buttonAddEventListener(productsArr) {
    const buttonAddToCart = document.querySelectorAll('.btn-addToCart');

    buttonAddToCart.forEach(button => {
      button.addEventListener('click', event => {
        const productId = event.currentTarget.id;
        const product = Filter.filterById(productId, productsArr);
        Template.addToCart(product);
      });
    });
  }
}
