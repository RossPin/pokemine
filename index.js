const request = require('superagent')
const path = require('path')
const fs = require('fs')

let number = 4
let count = 0
let pokemon = []

getList().then(getPokemon)

function getList() {
    return request
        .get('https://pokeapi.co/api/v2/pokemon/?limit='+number)
        .then(res => {           
            let list = res.body.results            
            pokemon = list.map(poke => {return {name: poke.name}})          
        }) 
}

function getPokemon(i) {
    i = i || 0
    return request
        .get('https://pokeapi.co/api/v2/pokemon/'+pokemon[i].name)
        .then(res => {
            console.log(res.body.name)          
            let types = res.body.types.map(x => x.type.name)
            pokemon[i].types = types
            console.log(i+1)
            if (i >= pokemon.length-1) writeJson()
            else getPokemon(i+1)
        })
}

function writeJson(){
    const filepath = path.join(__dirname, 'pokemon.json')
    fs.writeFile(filepath, JSON.stringify(pokemon, null, 2), 'utf-8', function(err) {
    if (err) throw err
    console.log('JSON written')
  })
}

