export class Api {
  static token = '';

  /*  Pegando os produtos criados */
  static getPublicProducts() {
    const response = fetch('https://api-kenzie-food.herokuapp.com/products')
      .then(response => response.json())
      .then(data => {
        return data;
      });
    return response;
  }

  static async registerUser(data) {
    const response = await fetch('https://api-kenzie-food.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);

    return response;
  }

  static async login(userInfos) {
    const token = await fetch('https://api-kenzie-food.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfos),
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);
      
    Api.token = token;
   
    return token;
  }

  /* Requisições do endpoint Cart */

  /*   Adicionando ao carrinho  */

  /* Para esse metodo é necessário passar o id do produto  da seguinte forma :
    {
        product_id: ""
    } 
    */

  static async addCart(productId) {
    const token = sessionStorage.getItem('token');

    const response = await fetch('https://api-kenzie-food.herokuapp.com/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productId),
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);
    return response;
  }

  /* Pegando itens do carrinho */

  static async cartGet(token) {
    const response = await fetch(`https://api-kenzie-food.herokuapp.com/cart/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);

    return response;
  }

  /*  Apagando itens do carrinho */

  static async deletCartItem(idItem) {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`https://api-kenzie-food.herokuapp.com/cart/remove/${idItem}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);

    return response;
  }

  /*  criando produtos
    para criar um produto você precisa das informações da seguinte forma:

        {
       
            nome: "Doce de creme de leite ",
            preco: 4.50,
            categoria: "Doce",
            imagem: "https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint4/img/capstone-images/mousse.png",
            descricao: "Um delicioso doce de morango com creme de leite ",
    
        }
 */

  static async createProduct(product) {
    const response = await fetch('https://api-kenzie-food.herokuapp.com/my/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Api.token}`,
      },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);
    return response;
  }

  /*  pegando os itens criados pelo user  */

  static async getPrivate() {
    const response = await fetch('https://api-kenzie-food.herokuapp.com/my/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Api.token}`,
      },
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);
    return response;
  }

  /*   editando um produto

      para editar um produto voce não precisa passar todos os parametros, mas os parametros que dá ora mudar são  {
          nome: "Nome do produto ",
          descricao: "Um delicioso doce de morango  ",
          categoria: "Frutas",
          preco: 133,
          imagem: "https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint4/img/capstone-images/mousse.png"
      } 
      e do seu id */

  static async editProduct(data, idProduct) {
    const response = await fetch(`https://api-kenzie-food.herokuapp.com/my/products/${idProduct}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Api.token}`,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);

    return response;
  }

  static async deletProduct(idProduct) {
    const response = await fetch(`https://api-kenzie-food.herokuapp.com/my/products/${idProduct}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Api.token}`,
      },
    })
      .then(res => res.json())
      .then(res => res)
      .catch(error => error);

    return response;
  }
}
