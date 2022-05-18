export class Api {

    static token = ""

    /*  Pegando os produtos criados */
    static getPublicProducts() {
        const response = fetch('https://api-kenzie-food.herokuapp.com/products')
            .then(response => response.json())
            .then((data) => {


                return data

            })
        return response
    }

    /*   registrando um usuario */


    /*   Para registrar um usuario voce precisará de 
          {
              name: " ",
              email: " ",
              password: " "
          } 
          */
    static async registerUser(data) {
        const response = await fetch(
                "https://api-kenzie-food.herokuapp.com/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
            .then((res) => res.json())
            .then((res) => res)
            .catch((error) => error);

        return response;

        /*   Se o user já existir vai retornar uma mensagem(string) escrita "User Already Exists!"

          Se não
          for passado nada no email / uma string vazia, irá retornar o seguinta objeto {
              status: 'Error',
              message: 'Validation error: Campo email não pode ser vazio,\
              nValidation error: Deve ser um email valido '} (a senha e o nome podem ser uma string 
              vazia / nada,
              porém não poderá faltar o email,
              se quisermos mudar isso para não permitir o cadastro de pessoas que não
              colocaram nome nem senha na hora de registrar devemos colocar um required nos campos de registro)

          se o cadastro
          for bem sucedido retorna o seguinte objeto {
              createdAt: "2022-05-18T15:14:58.258Z"
              email: "Aluno@gmail223.com.br"
              id: "af31602f-7b5a-4ed9-a028-778fae4d1ed0"
              name: "Aluno Kenzie"
              password: "$2a$08$XBrQonU3fmp7zCkMBVwhFu04s26RFDCBkbBjJ16HnCGTlRrNqWYkK"
              updatedAt: "2022-05-18T15:14:58.258Z"
          } */
    }

    /* logando */

    /*    para logar é necessário 
     {
        email: "",
        password: ""
     }
    */

    static async login(data) {
        const token = await fetch(
                "https://api-kenzie-food.herokuapp.com/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
            .then((res) => res.json())
            .then((res) => res)
            .catch((error) => error);

        Api.token = token
      
        return token;
    }


    
}