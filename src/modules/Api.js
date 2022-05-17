export class Api {

    static  getPublicProducts() {
        const response=fetch('https://api-kenzie-food.herokuapp.com/products')
            .then(response => response.json())
            .then((data) => {

               
                return  data
             
            })
            return response
    }
}