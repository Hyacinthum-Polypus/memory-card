import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card.jsx'

var pokemonsList = [
  "pikachu",
  "bulbasaur",
  "charmander",
  "squirtle",
  "jigglypuff",
  "meowth",
  "psyduck",
  "snorlax",
  "togepi",
  "eevee",
  "gengar",
  "magikarp"
]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const randomIndex = Math.floor(Math.random() * (i + 1));
      
      // Swap the elements at i and randomIndex
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function App() {

  const [pokemons, setPokemons] = useState(shuffleArray(pokemonsList));

  const [clickedPokemons, setClickedPokemon] = useState(new Set());

  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(0);

  return (
    <div className="game">
      <h2>Highscore: {highScore}</h2>
      <h2>Score: {score}</h2>
      <div className="cards">
        {pokemons.map(element => {
          return (
            <Card pokemonName={element} key={element} onChildClick={() => {
              if(clickedPokemons.has(element)) {
                if(score > highScore)
                  setHighScore(score);
                setScore(0);
                setClickedPokemon(new Set());
              } else {
                setScore(score + 1);
                setClickedPokemon(clickedPokemons.add(element));
              }
            }} />
          )
        })}
      </div>
    </div>
  )
}

export default App
