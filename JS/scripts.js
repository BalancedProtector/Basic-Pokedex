let pokemonList = [
    {name:'Bulbasaur', height: '2\' 04\"', types:['Grass','poison']},
    {name:'Charmander', height: '2\'', types:['Fire']},
    {name:'Squirtle', height: '1\' 08\"', types:['Water']},
] // Type format = name: 'string'; height: number; types: [arrayItem1, arrayItem2];
let i = null;
for (i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i]);
}