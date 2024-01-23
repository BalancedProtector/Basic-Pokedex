let pokemonRepository = (function() {
    let pokemonList = [
        {
        name:'Bulbasaur', 
        height: '0.7', 
        types:['Grass','poison']
        },
        {
        name:'Charmander', 
        height: '1.7', 
        types:['Fire']
        },
        {
        name:'Squirtle', 
        height: '1', 
        types:['Water']
        },
    ] // Type format = name: 'string'; height: number; types: [arrayItem1, arrayItem2];
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    function showDetails(pokemon) {
        console.log(pokemon);
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemonList");
        let listpokemon= document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.addEventListener("click", function(event){
            showDetails(pokemon);
        });
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
    };
})();
/*console.log(pokemonRepository.getAll());*/
pokemonRepository.add({name:'Pikachu', height: '0.4', types:['Electric']});
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});