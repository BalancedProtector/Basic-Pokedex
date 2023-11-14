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
function printArrayDetails() {
    for (i = 0; i < pokemonList.length; i++) {
        document.write(pokemonList[i].name + ' (height in meters: ' + pokemonList[i].height + ') ');
        if (pokemonList[i].height > '1') {
            document.write(' - Wow, that\'s a big one! ');
        }
        document.write('<br>');
    }
}
/*
pokemonList.forEach(pokemon => {
    document.write(pokemon.name + ' (height in meters: ' + pokemon.height + ') ');
    if (pokemon.height > '1\' 05\"') {
        document.write(' - Wow, that\'s a big one! ');
    }
    document.write('<br>');
});
function pokedexStructure() {
    
}
*/