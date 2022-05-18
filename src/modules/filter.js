export class Filter {
    static filterByInput(input, data) {
      let inputText = input.toLowerCase();
  
      const filterdedData = data.filter(product => {
        const nomeProduto = product.nome.toLowerCase();
        const catProduto = product.categoria.toLowerCase();
  
        if (nomeProduto.includes(inputText) || catProduto.includes(inputText)) {
          return true;
        }
      });
      return filterdedData;
    }
  
    static filterById(idProduto, data) {
      const filterdedData = data.filter(product => {
        if (product.id.includes(idProduto)) {
          return true;
        }
      });
      return filterdedData;
    }
  }
  


const ul = document.querySelector('.products-display')

function listFiltered(h4){
    ul.innerHTML=''
    h4.forEach(h4 => {
        const liFirst = document.createElement('li')
        const img  = document.createElement('img')
        const hFour = document.createElement('h4')
        const p = document.createElement('p')
        const li = document.createElement('li')
        const li2 = document.createElement('li')
        const small = document.createElement('small')
        const buttonAddCart = document.createElement('button')

        img.src = 'src/img/Frame 5.png'
        img.alt = hFour
        p.innerText = product.description
        li.innerText = product.category
        li2.innerText = product.category
        small.innerText = product.price
        buttonAddCart.classList.add('btn-addToCart')
        buttonAddCart.id = `${h4.id}`

        liFirst.appendChild(img)
        liFirst.appendChild(p)
        liFirst.appendChild(li)
        liFirst.appendChild(li2)
        liFirst.appendChild(small)
        liFirst.appendChild(buttonAddCart)
        ul.appendChild(liFirst)

        const buttonAddToCart = document.querySelectorAll('.btn-addToCart')
        buttonAddToCart.forEach((btn)=>{
            btn.addEventListener('click', listFiltered)
        })
        
    });
}




function filterbuttonAll(){
    const filterAll = produtos.filter((produtos)=>{
        return produtos.secao
    })
listFiltered(filterAll)
}
