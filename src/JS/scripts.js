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

            // Add close button to modal
            let closeButtonElement = document.createElement("button");
            closeButtonElement.classList.add("pokedexClose");
            closeButtonElement.innerText = "X";
            closeButtonElement.addEventListener("click", hideModal);

            // Add title to modal content
            let titleElement = document.createElement("h1");
            titleElement.innerText = pokemon.name;

            // Add height, weight, types, and abilities to modal content
            let contentElement = document.createElement("p");
            contentElement.innerHTML += "Height: " + pokemon.height + "<br>";

            // Append height, weight, types, and abilities to content element
            contentElement.innerHTML += "\nWeight: " + pokemon.weight + "<br>";
            let typesString = "Types: " + " ";
            for (let i = 0; i < pokemon.types.length; i++) {
                typesString += pokemon.types[i];
                if (i !== pokemon.types.length - 1) {
                    typesString += ", ";
                }
            }
            contentElement.innerHTML += "\n" + typesString;            
            let abilitiesString = "Abilities: ";
            for (let i = 0; i < pokemon.abilities.length; i++) {
                abilitiesString += pokemon.abilities[i];
                if (i !== pokemon.abilities.length - 1) {
                    abilitiesString += ", ";
                }
            }            
            contentElement.innerText += "\n" + abilitiesString;
            // Add image to modal content
            let imageElement = document.createElement("img");
            imageElement.src = pokemon.imageUrlFront; 
            let imageElementBack = document.createElement("img");
            imageElementBack.src = pokemon.imageUrlBack;
            // Append modal to webpage
            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imageElement);
            modal.appendChild(imageElementBack);
            modalContainer.appendChild(modal);
            modalContainer.classList.add("is-visible");
            // Close modal by clicking outside of it
            document.querySelector("#pokedexEntry").addEventListener("click", function(e) {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            });
            // Close modal by pressing escape key
            document.addEventListener("keydown", e => {
                if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                    hideModal();
                }
            });
            // Close modal by clicking close button
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
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types.map(function(type){
                return type.type.name;
            });
            item.weight = details.weight;
            item.abilities = details.abilities.map(function(ability){
                return ability.ability.name;
            });
        }).catch(function(e){
            console.error(e);
        });
    }
    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");
        // Clear all existing modal content
        modalHeader.empty();
        modalTitle.empty();
        modalBody.empty();
        // Creating elements for name, height, weight, types, and abilities in modal content
        let nameElement = $("<h1>" + pokemon.name + "<h1>");       
        let imageElementFront = $("<img class='model-img' style='width:100%'>");
        imageElementFront.attr("src", pokemon.imageUrlFront);    
        let imageElementBack = $("<img class='model-img' style='width:100%'>");
        imageElementBack.attr("src", pokemon.imageUrlBack);      
        let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
        let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");
        let typesElement = $("<p>" + "Types: " + pokemon.types.join("<br>") + "</p>");
        let abilitiesElement = $("<p>" + "Abilities: " + pokemon.abilities.join("<br>") + "</p>");
        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
    };
})();
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});