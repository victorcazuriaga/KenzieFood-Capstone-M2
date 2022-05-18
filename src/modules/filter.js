export class Filter {
    static filterByInput(input, data) {
      let inputText = input.toLowerCase();
      const filterdedData = data.filter(product => {
        if (product.nome.includes(inputText) || product.categoria.includes(inputText)) {
          return true;
        }
      });
      return filterdedData;
    }
  }
 
  const charactersList = document.getElementsByClassName('input-search');
  const searchBar = document.getElementById('products-display');
  let productsArr = [];
  
  searchBar.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase();
  
      const filteredCharacters = productsArr.filter((productsArr) => {
          return (
              productsArr.nome.toLowerCase().includes(searchString) ||
              productsArr.categoria.toLowerCase().includes(searchString)
          );
      });
      displayCharacters(filteredCharacters);
  });
  
  const loadCharacters = async () => {
      try {
          const res = await fetch('https://api-kenzie-food.herokuapp.com/products');
          productsArr = await res.json();
          displayCharacters(productsArr);
      } catch (err) {
          console.error(err);
      }
  };
  
  const displayCharacters = (characters) => {
      const htmlString = characters
          .map((character) => {
              return `
              <li class="character">
                  <h2>${character.name}</h2>
                  <p>House: ${character.house}</p>
                  <img src="${character.image}"></img>
              </li>
          `;
          })
          .join('');
      charactersList.innerHTML = htmlString;
  };
  
  loadCharacters();
  