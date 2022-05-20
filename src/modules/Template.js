import {Api} from './Api.js';
import {Filter} from './filter.js';
import {Storage} from './localStorage.js';
import {productsApi} from './getProductsAPI.js';

export class Template {
  static prodctsDisplay = document.getElementById('products-display');
  static productDashBoardDisplay = document.getElementsByClassName('product-container')[0];

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
    const {nome, preco, categoria, imagem, id} = item;

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
      faTrash.id = productsArr[i].id;
      faPen.addEventListener('click', this.editar());
      //-------------atribuindo valores----------------------

      imgProduct.src = productsArr[i].imagem;
      productTitle.innerText = productsArr[i].nome;
      productCategory.innerText = productsArr[i].categoria;
      productDescription.innerText = productsArr[i].descricao;
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
    const arrProdutos = document.querySelectorAll('.fa-trash');

    if (arrProdutos.length > 0) {
      arrProdutos.forEach(produto => {
        produto.addEventListener('click', () => {
          this.deletarBtn(produto.id);
        });
      });
    }
  }

  static deletarBtn(id) {
    const deletePopup = document.getElementById('delete-popup');
    const btnDeleteSim = document.querySelector('.delete-sim');
    const btnDeleteNao = document.querySelector('.delete-nao');

    deletePopup.classList.remove('display-none');

    btnDeleteSim.addEventListener('click', e => {
      e.preventDefault();
      deletePopup.classList.add('display-none');

      Api.deletProduct(id).then(res => location.reload());
    });

    btnDeleteNao.addEventListener('click', e => {
      e.preventDefault();
      deletePopup.classList.add('display-none');
    });
  }

  static async editar() {
    const itensUser = await Api.getPrivate();

    const popupEditar = document.getElementById('popup-editar');
    const popupInputs = document.getElementsByClassName('form-input');
    const inputCategory = document.getElementById('select-form-editar');
    const confirmEdit = document.getElementById('editar');
    const editButton = document.getElementsByClassName('fa-solid fa-pen');
    console.log(popupInputs);
    for (let i = 0; i < editButton.length; i++) {
      editButton[i].addEventListener('click', () => {
        popupEditar.classList.remove('display-none');
        popupInputs[5].value = itensUser[i].nome;
        inputCategory.value = itensUser[i].categoria;
        popupInputs[6].value = itensUser[i].descricao;
        popupInputs[7].value = itensUser[i].preco;
        popupInputs[8].value = itensUser[i].imagem;
        confirmEdit.addEventListener('click', async e => {
          e.preventDefault();
          const productNewInfos = {
            nome: popupInputs[5].value,
            descricao: popupInputs[6].value,
            categoria: inputCategory.value,
            preco: popupInputs[7].value,
            imagem: popupInputs[8].value,
          };
          const returnApi = await Api.editProduct(productNewInfos, itensUser[i].id);
          if (returnApi === 'Produto Atualizado') {
            alert('Produto atualizado com sucesso');
            location.reload();
          } else if (
            returnApi == 'Validation error: Campo nome deve ter entre 4 a 150 caracteres'
          ) {
            alert('Error, Campo de nome deve ter entre 4 a 150 caracter');
          } else if (
            returnApi == 'Validation error: Campo descricao não pode ser vazio' ||
            returnApi.error ==
              'preco must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
          ) {
            alert('Nenhum Campo pode ser vazio!');
          } else if (
            returnApi == 'Validation error: Campo descricao não pode ultrapassar 500 caracteres'
          ) {
            alert('a descrição deve conter letras!');
          } else if (returnApi.error == 'Formato de imagem invalido, deve ser uma url') {
            alert('a Imagem deve ser uma Url');
          }
        });
      });
    }
  }
}
