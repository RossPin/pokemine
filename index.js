const request = require('superagent')
const path = require('path')
const fs = require('fs')

let number = 70
let count = 0
let pokemonList = []

getList().then(() =>{
  pokemonList.forEach(pokemon => getPokemon(pokemon))
})

function getList() {
    return request
        .get('https://pokeapi.co/api/v2/pokemon/?limit='+number)
        .then(res => {           
            let list = res.body.results            
            pokemonList = list.map(pokemon => {return {name: pokemon.name}})          
        }) 
}

function getPokemon(pokemon) {    
    request
        .get('https://pokeapi.co/api/v2/pokemon/'+pokemon.name)
        .then(res => {                      
            let types = res.body.types.map(x => x.type.name)
            pokemon.types = types
            count++
            console.log(count)
            if (count === number) writeJson()
            
        })
}

function writeJson(){
    const filepath = path.join(__dirname, 'pokemon.json')
    fs.writeFile(filepath, JSON.stringify(pokemonList, null, 2), 'utf-8', function(err) {
    if (err) throw err
    console.log('JSON written')
  })
}

