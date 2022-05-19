import {Api} from '../modules/Api.js';
import {Template} from '../modules/Template.js';
import {Filter} from '../modules/filter.js';
Api.token = sessionStorage.getItem('token', Api.token);

const itensUser = await Api.getPrivate();

Template.templateDashboard(itensUser);

//---------- Filtro pela barra de pesquisa--------------------------------

const searchBar = document.getElementsByClassName('input-search')[0];
let arrProducts = [];
searchBar.addEventListener('keyup', e => {
  const searchString = e.target.value.toLowerCase();
  const filteredProducts = itensUser.filter(products => {
    return (
      products.nome.toLowerCase().includes(searchString) ||
      products.categoria.toLowerCase().includes(searchString)
    );
  });
  Filter.showFilteredDashboard(filteredProducts);
});

//-------------------------------- Profile Hover

const containerBtnProfile = document.querySelector('.btn-profile-container');

const divLinks = document.querySelector('.div-links');

containerBtnProfile.addEventListener('mouseover', () => {
  divLinks.classList.remove('display-none');
});

containerBtnProfile.addEventListener('mouseleave', () => {
  divLinks.classList.add('display-none');
});

//------------------------------- Btn Add product

const btnAddProduct = document.getElementById('add-product');
const addProduct = document.getElementById('popup-novoProduto');
const closeAddProduct = document.getElementById('close-novoProduto');

btnAddProduct.addEventListener('click', () => {
  addProduct.classList.remove('display-none');
});
closeAddProduct.addEventListener('click', () => {
  addProduct.classList.add('display-none');
});
