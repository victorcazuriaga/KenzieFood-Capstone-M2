import {Filter} from '../modules/filter.js';
import {Api} from '../modules/Api.js';
import {Template} from '../modules/Template.js';
import {Storage} from '../modules/localStorage.js';
import {Utility} from '../modules/utility.js';
import {productsApi} from '../modules/getProductsAPI.js';

const token = sessionStorage.getItem('token');

const btnLogin = document.querySelector('.menu-login');
const containerBtnProfile = document.querySelector('.btn-profile-container');

//Verificacao login
if (token) {
  // acessar API
  btnLogin.classList.add('display-none');
  containerBtnProfile.classList.remove('display-none');
} else {
  // acessar itens LocalStorage
  btnLogin.classList.remove('display-none');
  containerBtnProfile.classList.add('display-none');
}

Storage.getLocalStorage();
Storage.localStorageRender();

//Const
//
// if(token){
//  vai ter que mudar o botao de login => logout <---
//  data do carrinho API
//  redenrizar o carrinho pela localstorage --------------------------
//  logado => addtocart manda pra API -------------------------------
//  logado => deleteFromCart remove da API ---------------------------
//} else {
//  //redenrizar o carrinho pela localstorage
// }

const productsArr = await Api.getPublicProducts();
Template.createProductList(productsArr);

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

//Botoes de filtro por categoria----------------------------------
const categoryButtons = document.querySelectorAll('.filter');

function removeSelected() {
  categoryButtons.forEach(button => button.classList.remove('selected'));
}

function filterByCategory(targetId) {
  if (targetId == 'todos') {
    Template.createProductList(productsArr);
  } else {
    const filteredArr = Filter.filterByInput(targetId, productsArr);
    Template.createProductList(filteredArr);
  }
}

categoryButtons.forEach(btn => {
  btn.addEventListener('click', event => {
    removeSelected();
    event.currentTarget.classList.add('selected');
    const filter = event.currentTarget.id;
    filterByCategory(filter);
  });
});

//-------------------------------- Profile Hover

const btnProfile = document.querySelector('.btn-profile-container');
const divLinks = document.querySelector('.div-links');

btnProfile.addEventListener('mouseover', () => {
  divLinks.classList.remove('display-none');
});

btnProfile.addEventListener('mouseleave', () => {
  divLinks.classList.add('display-none');
});

//---------------------------------- button login/ form popuplogin

const loginBtn = document.getElementById('menu-mobile');
const loginPopup = document.getElementById('popup-login');
const closeLoginBtn = document.getElementById('close-login');
const btnRedirecionaCadastro = document.getElementById('redirecionar-cadastro');

//------------------------------- button formcadastro
const registerForm = document.getElementById('popup-register');
const btnCloseRegister = document.getElementById('close-register');
const btnRedicionaLogin = document.getElementById('redirecionar-login');

loginBtn.addEventListener('click', () => {
  loginPopup.classList.remove('display-none');
  mainTag.classList.add('mobile');
  shoppingCart.classList.add('display-none');
});

closeLoginBtn.addEventListener('click', () => {
  loginPopup.classList.add('display-none');
  mainTag.classList.remove('mobile');
  shoppingCart.classList.remove('display-none');
});

btnCloseRegister.addEventListener('click', () => {
  registerForm.classList.add('display-none');
  mainTag.classList.remove('mobile');
  shoppingCart.classList.remove('display-none');
});

btnRedirecionaCadastro.addEventListener('click', event => {
  event.preventDefault();

  loginPopup.classList.add('display-none');
  registerForm.classList.remove('display-none');
});

btnRedicionaLogin.addEventListener('click', event => {
  event.preventDefault();

  loginPopup.classList.remove('display-none');
  registerForm.classList.add('display-none');
});

//----------------------------DELETAR TESTE
let userinformacao = {
  email: 'time6@gmail.com.br',
  password: '123',
};
Api.login(userinformacao);

productsApi.getCartItens();
