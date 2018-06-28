const request = require('superagent')
const path = require('path')
const fs = require('fs')

let count = 0
let pokemon = []

getList()

function getList() {
    return request
        .get('https://pokeapi.co/api/v2/pokemon/?limit=151')
        .then(res => {           
            let list = res.body.results            
            pokemon = list.map(x => {return {name: x.name}})            
            getPokemon(0)
        }) 
}

function getPokemon(i) {
    return request
        .get('https://pokeapi.co/api/v2/pokemon/'+pokemon[i].name)
        .then(res => {
            console.log(res.body.name)            
            let type = res.body.types
            let typesArr = type.map(x => x.type.name)
            pokemon[i].types = typesArr
            console.log(i)
            if (i >= pokemon.length-1) writeJson()
            else getPokemon(i+1)
        })
}

function writeJson(){
    const filepath = path.join(__dirname, 'pokemon.json')
    fs.writeFile(filepath, JSON.stringify(pokemon, null, 2), 'utf-8', function(err) {
    if (err) throw err
    console.log('done')
  })
}

