import {Api} from './Api.js';
import {Filter} from './filter.js';
import {Storage} from './localStorage.js';
import {productsApi} from './getProductsAPI.js';
/* import {deletarBtn} from '../script/dashboard.js'; */

export class Template {
  static prodctsDisplay = document.getElementById('products-display');
  static productDashBoardDisplay = document.getElementsByClassName('product-container')[0];

  static async createProductList(productsArr) {
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
    const item = product[0];
    const {
      nome,
      preco,
      categoria,
      imagem,
      id
    } = item;

    //Verificacao do produto
    const verificacao = document.getElementById(`qnt${id}`);
    if (verificacao) {
      let qntAtual = +verificacao.innerText;
      qntAtual++;
      verificacao.innerText = qntAtual;

      // verificacao da quantidade certo PEGA A QUANTIDADE TOTAL
      let quantidade = Template.getQuantity();
      // PASSA A QUANTIDADE TOTAL PARA O HTML
      Template.setQuantity(quantidade);
      // VERIFICAR PRECO
      Template.setValue();

      //incrementar qnt no local storage
      Storage.addToLocalStorage(product);

      //incrementar qnt no API
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

    const token = sessionStorage.getItem('token');
    if (!token) {
      Storage.addToLocalStorage(product);
    }
    if (token) {
      let newItem = {
        product_id: id,
      };
      Api.addCart(newItem);
    }
  }

  static removeFromCart(target) {
    const divToDelete = target.closest('.shopping-cart-product');
    divToDelete.remove();

    const quantity = Template.getQuantity();
    Template.setQuantity(quantity);

    Template.setValue();

    const id = target.id;

    const token = sessionStorage.getItem('token');
    if (!token) {
      Storage.removeFromLocalStorage(id);
    }
    if (token) {
      Api.deletCartItem(id);
    }
  }

  static getQuantity() {
    const div = document.querySelectorAll('.quantidade-small');
    let quantity = 0;

    div.forEach(div => {
      let divValue = Number(div.innerText);
      quantity += divValue;
    });
    return quantity;
  }

  static setQuantity(valor) {
    const quantitySpan = document.getElementById('span-amount');
    quantitySpan.innerText = valor;
  }

  static setValue() {
    const valores = document.querySelectorAll('.cart-product-price');
    const quantidade = document.querySelectorAll('.quantidade-small');

    const smallValue = document.getElementById('span-value');
    let valorTotal = 0;

    valores.forEach((valor, index) => {
      let valorSomar = valor.innerText;
      let valorQuantidade = quantidade[index].innerText;
      valorQuantidade = Number(valorQuantidade);

      let sliced = valorSomar.slice(3);
      sliced = Number(sliced);
      valorTotal += sliced * valorQuantidade;
    });

    smallValue.innerText = valorTotal.toFixed(2);
  }

  // Refresh do addToCart quando o filtro eh acionado
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
  static templateDashboard(productsArr) {
    Template.productDashBoardDisplay.innerHTML = '';

    for (let i = 0; i < productsArr.length; i++) {
      //-------------criando as tags----------------------
      const divContainer = document.createElement('div');
      const divTitle = document.createElement('div');
      const imgProduct = document.createElement('img');
      const productTitle = document.createElement('p');
      const divCategory = document.createElement('div');
      const productCategory = document.createElement('span');
      const productDescription = document.createElement('p');
      const productActions = document.createElement('div');
      const faPen = document.createElement('i');
      const faTrash = document.createElement('i');

      //-------------atribuindo classes----------------------

      divContainer.className = 'container';
      divTitle.className = 'title-img';
      imgProduct.className = 'img';
      productTitle.className = 'product-title';
      divCategory.className = 'product-category';
      productCategory.className = 'category';
      productDescription.className = 'product-description';
      productActions.className = 'product-actions';
      faPen.className = 'fa-solid fa-pen';
      faTrash.className = 'fa-solid fa-trash';

      //-------------atribuindo valores----------------------

      imgProduct.src = productsArr[i].imagem;
      productTitle.innerText = productsArr[i].nome;
      productCategory.innerText = productsArr[i].categoria;
      productDescription.innerText = productsArr[i].descricao;
      faTrash.addEventListener('click', () => {
        deletarBtn(productsArr[i].id);
      });
      //-------------append variaveis----------------------

      Template.productDashBoardDisplay.appendChild(divContainer);
      divContainer.appendChild(divTitle);
      divTitle.appendChild(imgProduct);
      divTitle.appendChild(productTitle);
      divContainer.appendChild(divCategory);
      divCategory.appendChild(productCategory);
      divContainer.appendChild(productDescription);
      divContainer.appendChild(productActions);
      productActions.appendChild(faPen);
      productActions.appendChild(faTrash);
    }
  }

}