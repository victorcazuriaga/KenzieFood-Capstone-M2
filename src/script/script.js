//------------------ Funcionalidade para mostrar/fechar o carrinho Mobile

const btnShowCartMobile = document.getElementById('btn-show-cart');
const btnCloseCartMobile = document.getElementById('btn-close-cart');

const shoppingCart = document.getElementById('shopping-cart');
const mainTag = document.getElementById('main');

btnShowCartMobile.addEventListener('click', () => {
  shoppingCart.classList.add('mobile');
  mainTag.classList.add('mobile');
});

btnCloseCartMobile.addEventListener('click', () => {
  shoppingCart.classList.remove('mobile');
  mainTag.classList.remove('mobile');
});

//---------------------------------------------------------------------------
