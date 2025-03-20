import { useEffect, useState } from "react";
import "./Originals.css";
const Original = ({onClose}) => {
  const [pokemons, setPokemons] = useState<{ id: number; name: string; sprites: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [hasLoaded, setHasLoaded] = useState(false);
  const [offset, setOffset] = useState(0);

  const loadPokemons = async (urls: string[]) => {
    try {
      const pokemonData = await Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          const json = await response.json();
          return { id: json.id, name: json.name, sprites: json.sprites.front_default };
        })
      );
      setPokemons(pokemonData); 
    } catch (error) {
      console.error(error);
    }
  };




useEffect(() => {
    const fetchPokemons = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`);
            const json = await response.json();
            const urls = json.results.map((pokemon: { url: string }) => pokemon.url);
            await loadPokemons(urls);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchPokemons();
}, [offset]);

const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 10);
};

const handlePrevious = () => {
    setOffset((prevOffset) => Math.max(prevOffset - 10, 0));
};

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2> 
      ) : (
        <>
        <div className="dexConteiner">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} onClick={() => onClose(pokemon.name)}>
                <img src={pokemon.sprites} alt={pokemon.name} />
                <h1>N° {pokemon.id}</h1>
              <h1>{pokemon.name}</h1>
              
            </div>
          ))}
        </div>
        <div className="buttons">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        </>
      )}
    </div>
  );
};

export default Original;
