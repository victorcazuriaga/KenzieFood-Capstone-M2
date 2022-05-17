import { Api } from "../modules/Api.js";
import { Template } from "../modules/Template.js";

//------------------ Funcionalidade para mostrar/fechar o carrinho Mobile


const btnShowCartMobile = document.getElementById('btn-show-cart');
const btnCloseCartMobile = document.getElementById('btn-close-cart');

const shoppingCart = document.getElementById('shopping-cart');
const mainTag = document.getElementById('main');

btnShowCartMobile.addEventListener('click', () => {
  shoppingCart.classList.add('show');
  mainTag.classList.add('mobile');
});

btnCloseCartMobile.addEventListener('click', () => {
  shoppingCart.classList.remove('show');
  mainTag.classList.remove('mobile');
});


//---------------------------------------------------------------------------
const productsArr= await Api.getPublicProducts()

Template.createProductList( productsArr)