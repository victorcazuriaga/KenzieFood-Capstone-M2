import{Template} from '../modules/Template.js'
import { Api} from '../modules/Api.js';
import {Filter} from '../modules/filter.js';

Api.token = sessionStorage.getItem('token', Api.token);

const itensUser = await Api.getPrivate();

  Template.templateDashboard(itensUser)

//---------- Filtro pela barra de pesquisa--------------------------------

const searchBar = document.getElementsByClassName('input-search')[0];
let arrProducts = [];
searchBar.addEventListener('keyup', e => {
    const searchString = e.target.value.toLowerCase();
    const filteredProducts = itensUser.filter(products => {
        return (
            products.nome.toLowerCase().includes(searchString) ||
            products.categoria.toLowerCase().includes(searchString)
        );
    });
    Filter.showFilteredDashboard(filteredProducts);
});

//-------------------------------- Profile Hover
const main = document.getElementById('main');
const containerBtnProfile = document.querySelector('.btn-profile-container');

const divLinks = document.querySelector('.div-links');

containerBtnProfile.addEventListener('mouseover', () => {
    divLinks.classList.remove('display-none');
});

containerBtnProfile.addEventListener('mouseleave', () => {
    divLinks.classList.add('display-none');
});

//------------------------------- Btn Add product

const btnAddProduct = document.getElementById('add-product');
const addProduct = document.getElementById('popup-novoProduto');
const closeAddProduct = document.getElementById('close-novoProduto');

btnAddProduct.addEventListener('click', () => {
    addProduct.classList.remove('display-none');
    main.classList.add('bg-dark');
});
closeAddProduct.addEventListener('click', () => {
    addProduct.classList.add('display-none');
    main.classList.remove('bg-dark');
});

//------------------------- Excluir produto => dentro de uma funcao e dps direto na renderizacao
const deletePopup = document.getElementById('delete-popup');
const closeDelete = document.getElementById('close-delete');

const btnDeleteSim = document.querySelector('.delete-sim');
const btnDeleteNao = document.querySelector('.delete-nao');

export function deletarBtn(id) {
  deletePopup.classList.remove('display-none');

  btnDeleteSim.addEventListener('click', e => {
    e.preventDefault();
    Api.deletProduct(id);
    deletePopup.classList.add('display-none');
    location.reload();
  });

  btnDeleteNao.addEventListener('click', e => {
    console.log('oi');
    e.preventDefault();
    deletePopup.classList.add('display-none');
  });
}

closeDelete.addEventListener('click', () => {
    deletePopup.classList.add('display-none');
})

//---------- filtro por categoria --------------------------------

const categoryButtons = document.querySelectorAll('.filter');

function removeSelected() {
    categoryButtons.forEach(button => button.classList.remove('selected'));
}

function filterByCategory(targetId) {
    if (targetId == 'todos') {
        Template.templateDashboard(itensUser);
    } else {
        const filteredArr = Filter.filterByInput(targetId, itensUser);
        Template.templateDashboard(filteredArr);
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

//------------------------- Editar produto => dentro de uma funcao e dps direto na renderizacao
const editarPopup = document.getElementById('popup-editar');
const closeEditar = document.getElementById('close-editar');

closeEditar.addEventListener('click', () => {
    editarPopup.classList.add('display-none');
});


//------------------------- editar um produto 
const popupEditar = document.getElementById('popup-editar')
const popupInputs = document.getElementsByClassName('form-input')
const inputCategory = document.getElementById('select-form-editar')
const confirmEdit = document.getElementById('editar')
const editButton = document.getElementsByClassName('fa-solid fa-pen')

for (let i = 0; i < editButton.length; i++) {

    editButton[i].addEventListener('click', () => {
        popupEditar.classList.remove('display-none')

        popupInputs[5].value = itensUser[i].nome
        inputCategory.value = itensUser[i].categoria
        popupInputs[6].value = itensUser[i].descricao
        popupInputs[7].value = itensUser[i].preco
        popupInputs[8].value = itensUser[i].imagem



        confirmEdit.addEventListener('click', async (e) => {
            e.preventDefault()

            const productNewInfos = {
                nome: popupInputs[5].value,
                descricao: popupInputs[6].value,
                categoria: inputCategory.value,
                preco: popupInputs[7].value,
                imagem: popupInputs[8].value
            }
            const returnApi = await Api.editProduct(productNewInfos, itensUser[i].id)


            if (returnApi === 'Produto Atualizado') {
                alert('Produto atualizado com sucesso')
                location.reload()
            } else if (returnApi == 'Validation error: Campo nome deve ter entre 4 a 150 caracteres') {
                alert('Error, Campo de nome deve ter entre 4 a 150 caracter')
            } else if (returnApi == 'Validation error: Campo descricao não pode ser vazio' || returnApi.error == 'preco must be a `number` type, but the final value was: `NaN` (cast from the value `""`).') {
                alert('Nenhum Campo pode ser vazio!')
            } else if (returnApi == 'Validation error: Campo descricao não pode ultrapassar 500 caracteres') {
                alert('a descrição deve conter letras!')
            } else if (returnApi.error == 'Formato de imagem invalido, deve ser uma url') {
                alert('a Imagem deve ser uma Url')
            }
        });
    });
}



//--------------------------------- Register Product
class RegisterProduct {
  static registerProduct() {
    const submit = document.querySelector('.form');
    submit.addEventListener('submit', event => {
      event.preventDefault();
      let formRegister = [...document.querySelectorAll('.form-input')].reduce(
        (acc, cur) => ({...acc, [cur.name]: cur.value}),
        {}
      );
      Api.createProduct(formRegister);

            const popEditar = document.getElementById('popup-novoProduto');
            popEditar.classList.add('display-none');
            const main = document.getElementById('main');
            main.classList.remove('bg-dark');
            alert('Produto Criado')
            location.reload()
        });
    }
}
RegisterProduct.registerProduct();


