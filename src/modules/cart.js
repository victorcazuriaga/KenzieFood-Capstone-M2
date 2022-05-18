export class Cart {

  static priceCar=  document.getElementById('span-value')

  static cartQuantity=document.getElementById('span-amount')

  static cartItemList = []
  
  static priceCarSum = 0

  static updateToCart() {
    
    }
   
  static removeToCart() {
    //remover da api 
    // se não logado remover da localstorage
  }
  static validationLogin() {
    //validar login
    return true;

  }
}