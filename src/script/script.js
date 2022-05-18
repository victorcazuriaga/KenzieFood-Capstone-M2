import {Filter} from '../modules/filter.js';
import {Api} from '../modules/Api.js';
import {Template} from '../modules/Template.js';
import {Storage} from '../modules/localStorage.js';

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

//---------- Filtro pela barra de pesquisa--------------------------------
const searchBar = document.getElementsByClassName('input-search')[0];
let arrProducts = []
searchBar.addEventListener('keyup',(e)=>{
    const searchString = e.target.value.toLowerCase()
    const filteredProducts = productsArr.filter((products)=>{
        return (
            products.nome.toLowerCase().includes(searchString) ||
            products.categoria.toLowerCase().includes(searchString)
        )
    })
    Filter.showFiltered(filteredProducts)
});