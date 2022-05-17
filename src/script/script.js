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
//receber - não salvar aqui
class Cart {
  static cartItemList = [];

  static addToCart(product) {
    if (this.validationLogin() === true) {
      console.log(product)
      product.forEach(({ nome, preco, categoria, imagem }) => {
        const productContainer = document.querySelector(".shopping-cart-products")
        const seletorImg = document.querySelector(".shopping-div-img")
        const seletorDetails = document.querySelector(".shopping-div-details")
        const seletorDelete = document.querySelector(".shopping-div-delete")
        //create elements
        const cartProduct = document.createElement("div")
        cartProduct.className = "shopping-cart-product"
        const img = document.createElement("img")
        const h4 = document.createElement("h4")
        const p = document.createElement("p")
        const small = document.createElement("small")
        const button = document.createElement("button")
        const input = document.createElement("input")
        //Atribuições
        img.src = imagem
        console.log(img)
        img.className = "cart-product-img"
        h4.textContent = nome
        h4.className = "cart-product-title"
        p.textContent = categoria
        p.className = "cart-product-category"
        small.textContent = preco
        small.className = "cart-product-price"

        //apeend

        seletorImg.appendChild(img)
        seletorDetails.appendChild(h4)
        seletorDetails.appendChild(p)
        seletorDetails.appendChild(small)

        cartProduct.appendChild(seletorImg)
        cartProduct.appendChild(seletorDetails)
        productContainer.appendChild(cartProduct)
        console.log("testefunçao")
        Cart.cartItemList.push(product)

      })

    } else {
      //localStorage
    }



  }
  updateToCart() {

  }
  removeToCart() {
    //remover da api 
    // se não logado remover da localstorage
  }
  static validationLogin() {
    //validar login
    return true;

  }
}
const buttonAddToCart = document.querySelector(".btn-addToCart");
buttonAddToCart.addEventListener("click", () => {
  console.log("teste")
  Cart.addToCart([{ imagem: "https://www.dinamize.com.br/wp-content/uploads/2018/08/instagram-dimensoes-redes-sociais-min.png", nome: "teste", categoria: "testeCategoria", preco: "20" }])
  // colocar GET da API carinho 
}
)
console.log(Cart.cartItemList)
