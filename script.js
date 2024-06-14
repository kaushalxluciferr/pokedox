const pokemoncount=151;
var pokedex={};

window.onload=async function()
{
    for(let i=1;i<=pokemoncount;i++)
        {
         await getpokemon(i);
         let pokemonn=document.createElement("div");
         pokemonn.id=i;
         pokemonn.innerText= i.toString() + "." +pokedex[i]["name"].toUpperCase();
         pokemonn.classList.add("pokemon-name");
         pokemonn.addEventListener("click",()=>{
            document.getElementById("pokemon-img").src = pokedex[pokemonn.id]["img"];

            let typesdiv=document.getElementById("pokemon-types");
            while(typesdiv.firstChild)
                {
                    typesdiv.firstChild.remove();
                }
                let types=pokedex[pokemonn.id]["types"];
                for(let i=0;i<types.length;i++)
                    {
                        let type=document.createElement("span");
                        type.innerText=types[i]["type"]["name"].toUpperCase();
                        type.classList.add("type-box");
                        type.classList.add(types[i]["type"]["name"]);
                        typesdiv.append(type);
                    }
                    document.getElementById("pokemon-description").innerText=pokedex[pokemonn.id]["desc"];
         })
         document.getElementById("pokemon-list").append(pokemonn);
        }
    console.log(pokedex)
}
async function getpokemon(num)
{
let url="https://pokeapi.co/api/v2/pokemon/" + num.toString();
let res=await fetch(url);
let pokemon=await res.json();
// console.log(pokemon);
let pokemonname=pokemon["name"];
let pokemontype=pokemon["types"];
let pokemonimg=pokemon["sprites"]["front_default"];
res=await fetch(pokemon["species"]["url"]);
let pokemondesc=await res.json();
// console.log(pokemondesc);
pokemondesc=pokemondesc["flavor_text_entries"][9]["flavor_text"];
pokedex[num]={"name":pokemonname,"img":pokemonimg,"types":pokemontype,"desc":pokemondesc}
}