import {useEffect, useState} from 'react'

export default function Card(props) {
    
    const [pokemon, setPokemon] = useState({'name': "placeholder", 'image-uri': "placeholder"});

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonName}`)
        .then(response => response.json())
        .then(pokemonData => {
            fetch(pokemonData.species.url)
            .then(response => response.json())
            .then(speciesData => {
                const name = speciesData.names.find(element => element.language.name === "en");
                setPokemon({'name': name.name, 'image-url': pokemonData.sprites.front_default});
            })
            .catch(error => {
                console.error("Failed to parse JSON:", error);
            });
        })
        .catch(error => {
            console.error("Failed to parse JSON:", error);
        });
    },[]);

    return (
        <div className="card" onClick={props.onChildClick}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon['image-url']} />
        </div>
    );
}