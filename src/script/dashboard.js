import { Api } from '../modules/Api.js';
import { Template } from '../modules/Template.js';
import{Filter} from '../modules/filter.js'
Api.token= sessionStorage.getItem('token', Api.token)
console.log(Api.token)
const itensUser=await Api.getPrivate()

Template.templateDashboard(itensUser)

//---------- Filtro pela barra de pesquisa--------------------------------

const searchBar = document.getElementsByClassName('input-search')[0];
let arrProducts = []
searchBar.addEventListener('keyup',(e)=>{
    const searchString = e.target.value.toLowerCase()
    const filteredProducts = itensUser.filter((products)=>{
        return (
            products.nome.toLowerCase().includes(searchString) ||
            products.categoria.toLowerCase().includes(searchString)
        )
    })
    Filter.showFilteredDashboard(filteredProducts)
});
