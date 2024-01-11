import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const detailedPokemonList = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailedResponse = await axios.get(pokemon.url);
            return detailedResponse.data;
          })
        );
        setPokemonList(detailedPokemonList);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    }

    fetchPokemon();
  }, []);

  return (
    <div className="App">
      <header>
        <img src="/path/to/your/logo.png" alt="Pokedex Logo" />
      </header>
      <main>
        <div className="pokemon-list">
          {pokemonList.map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
              <div className="types">
                {pokemon.types.map((type, index) => (
                  <span key={index} className="type">
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
