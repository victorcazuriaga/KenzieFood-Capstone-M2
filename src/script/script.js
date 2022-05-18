import { Filter } from "../modules/filter.js";
import { Api } from "../modules/Api.js";
import { Template } from "../modules/Template.js";
import { Cart } from "../modules/cart.js";



//Const
//
// if(token){
//  vai ter que mudar o botao de login => logout
//  data do carrinho API
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


//---------------------------------------------------------------------------
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
const divMain = document.getElementById('main')

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
    showFiltered(filteredProducts)
});
const showFiltered = (arrProducts)=>{
    const htmlString = arrProducts.map((arrProducts)=>{
        return `${arrProducts.nome}
                ${arrProducts.categoria}
                ${arrProducts.imagem}`
    })
    .join('');
    Template.createProductList(arrProducts)
}



//------------------button Add To Cart -------------------------

const buttonAddToCart = document.querySelectorAll('.btn-addToCart');

buttonAddToCart.forEach( button => {
  button.addEventListener('click',  event => {
    const productId = event.currentTarget.id;
    const product = Filter.filterById(productId, productsArr);

    Template.addToCart(product);
   Cart.cartItemList.push(...product)
   Cart.cartQuantity.innerText=`${Cart.cartItemList.length}`
    Cart.priceCar.innerText=`R$ ${Cart.priceCarSum+= product[0].preco}` 
  });
});
Cart.cartQuantity.innerText=0
Cart.priceCar.innerText=`R$ 0` 
//console.log(productsArr)

