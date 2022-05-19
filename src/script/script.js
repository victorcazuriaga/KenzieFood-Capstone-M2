import {Filter} from '../modules/filter.js';
import {Api} from '../modules/Api.js';
import {Template} from '../modules/Template.js';
import {Storage} from '../modules/localStorage.js';

//sessionStorage.setItem('token', '123'); ----> apenas para teste
const token = sessionStorage.getItem('token');

const btnLogin = document.querySelector('.menu-login');
const containerBtnProfile = document.querySelector('.btn-profile-container');

// Verificacao se esta logado ou para o alternar entre botao login/user (FUNCIONA!! =)
if (token) {
  btnLogin.classList.add('display-none');
  containerBtnProfile.classList.remove('display-none');
} else {
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


//---------- cadastrando usuario--------------------------------
const inputsForm=document.getElementsByClassName('form-input')
const formRegister=document.getElementById('form-register')

formRegister.addEventListener('submit', async (event) => {
  event.preventDefault()
    const newUser= {
              name: inputsForm[2].value,
              email: inputsForm[3].value,
              password: inputsForm[4].value
  }

  const response = await Api.registerUser(newUser)
  console.log(response)
   if (response !== 'User Already Exists!') {
      alert('Cadastro realizado com sucesso!')
      
  } else if (response === 'User Already Exists!' ) {
      alert('Este email já foi cadastrado, tente outro!')
  }  

})

//---------- Login usuario--------------------------------
const formLogin=document.getElementById('form-login')

 formLogin.addEventListener('submit', async (event) => {
  event.preventDefault()


  const userInfos={
        email: inputsForm[0].value,
        password: inputsForm[1].value
  }

  const userToken= await Api.login(userInfos)
  console.log(userToken)
  
  console.log(Api.token)
  
  
  if (userToken.error === `Email: ${inputsForm[0].value} does not exists`) {
    alert('O email informado não existe')
    
    
  } else if (userToken.error === 'password invalid') {
    alert('Senha invalida')
  } 
  else{
    
    sessionStorage.setItem('token', Api.token)
    console.log(Api.token)
     location.reload()
  } 
}) 

//---------- Logout usuario--------------------------------

const logoutBnt=document.getElementById('logout')
console.log(logoutBnt)

logoutBnt.addEventListener('click',  () => {
 
 sessionStorage.clear()
 location.reload()

})
