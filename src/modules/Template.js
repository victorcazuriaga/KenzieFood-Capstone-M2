

export class Template {

    static prodctsDisplay = document.getElementById('products-display')

    static createProductList(productsArr) {
        for (let i = 0; i < productsArr.length; i++) {

            /* Criando as tags para cada produto */

            const productCard = document.createElement('div')
            const imageContainer = document.createElement('figure')
            const productImage = document.createElement('img')
            const productDetails = document.createElement('div')
            const productTitle = document.createElement('h4')
            const productDescription = document.createElement('p')
            const productCategories = document.createElement('ul')
            const productCategory = document.createElement('li')
            const productPurcharse = document.createElement('div')
            const productPrice = document.createElement('small')
            const addToCartButton = document.createElement('button')
            const carrIcon = document.createElement('i')


            /*   Atribuindo classes/Ids */

            productCard.className = 'product'
            imageContainer.className = 'product-image-container'
            productImage.className = 'product-image'
            productImage.alt = ''
            productDetails.className = 'product-details'
            productTitle.className = 'product-title'
            productDescription.className = 'product-description'
            productCategories.className = 'product-categories'
            productCategory.className = 'product-category'
            productPurcharse.className = 'product-purcharse'
            productPrice.className = 'product-price'
            addToCartButton.className = 'btn-addToCart'
            addToCartButton.id = productsArr[i].id
            carrIcon.className = 'fas fa-shopping-cart product-cart'

            /* Atribuindo valor de texto as tags */

            productImage.src = productsArr[i].imagem
            productTitle.innerText = productsArr[i].nome
            productDescription.innerText = productsArr[i].descricao
            productCategory.innerText = productsArr[i].categoria
            productPrice.innerText = `R$ ${productsArr[i].preco.toFixed(2)}`


            /* Dando appendChild */

            Template.prodctsDisplay.appendChild(productCard)
            productCard.appendChild(imageContainer)
            imageContainer.appendChild(productImage)
            productCard.appendChild(productDetails)
            productDetails.appendChild(productTitle)
            productDetails.appendChild(productDescription)
            productDetails.appendChild(productCategories)
            productCategories.appendChild(productCategory)
            productDetails.appendChild(productPurcharse)
            productPurcharse.appendChild(productPrice)
            productPurcharse.appendChild(addToCartButton)
            addToCartButton.appendChild(carrIcon)


        }

    }
}