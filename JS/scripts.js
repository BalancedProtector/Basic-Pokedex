let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }
    function getAll() {
        return pokemonList;
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            let modalContainer = document.querySelector("#pokedexInfo");
            modalContainer.innerHTML = "";
            let modal = document.createElement("div");
            modal.classList.add("modal");
            let closeButtonElement = document.createElement("button");
            closeButtonElement.classList.add("modal-close");
            closeButtonElement.innerText = "X";
            closeButtonElement.addEventListener("click", hideModal);
            let titleElement = document.createElement("h1");
            titleElement.innerText = pokemon.name;
            let contentElement = document.createElement("p");
            contentElement.innerText = "Height: " + pokemon.height;
            let imageElement = document.createElement("img");
            imageElement.src = pokemon.imageUrl;
            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imageElement);
            modalContainer.appendChild(modal);
            modalContainer.classList.add("is-visible");
            document.querySelector("#pokedexEntry").addEventListener("click", function(e) {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            });
            document.addEventListener("keydown", e => {
                if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                    hideModal();
                }
            });
            function hideModal() {
                modalContainer.classList.remove("is-visible");
            }
        });
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemonList");
        let listpokemon= document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokedexEntry");
        button.addEventListener("click", function(event){
            showDetails(pokemon);
        });
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }
    function loadList() {
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e){
            console.error(e);
        });
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});