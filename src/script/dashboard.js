import { Api } from '../modules/Api.js';
import { Template } from '../modules/Template.js';
import { Filter } from '../modules/filter.js';
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

//---------- filtro por categoria --------------------------------

const categoryButtons = document.querySelectorAll('.filter');

function removeSelected() {
  categoryButtons.forEach(button => button.classList.remove('selected'));
}

function filterByCategory(targetId) {
  if (targetId == 'todos') {
    Template.templateDashboard(itensUser);
  } else {
    const filteredArr = Filter.filterByInput(targetId, itensUser);
    Template.templateDashboard(filteredArr);
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
//
class RegisterProduct {

  static registerProduct() {
    const submit = document.querySelector(".form");
    console.log(submit)
    submit.addEventListener("submit", (event) => {
      event.preventDefault()
      let formRegister = [...document.querySelectorAll('.form-input')].reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});
      Api.createProduct(formRegister)

      const popEditar = document.getElementById("popup-novoProduto")
      popEditar.classList.add("display-none")
      const main = document.getElementById('main');
      main.classList.remove('bg-dark')
    })

  }

}
RegisterProduct.registerProduct()