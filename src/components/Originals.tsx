import { useEffect, useState } from "react";
import "./Originals.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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


const toCap=(e:string)=>{
  return e.charAt(0).toUpperCase() + e.slice(1);
}

useEffect(() => {
    const fetchPokemons = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);
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
    <div className="conteiner">
      {isLoading ? (
        <>
        <div className="loading">
        <img src="pokebola.svg"/>
        <h2>Loading...</h2> 
        </div>
        </>
      ) : (
        <>
        <div className="dexConteiner">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} onClick={() => onClose(pokemon.name)}>
                <img src={pokemon.sprites} alt={pokemon.name} />
               
                <p>{`N° ${pokemon.id} ${toCap(pokemon.name)}`}</p>
            </div>
          ))}
        </div>
        <div className="buttons">
        <FaChevronLeft onClick={handlePrevious} size={26}/>
          <FaChevronRight onClick={handleNext} size={26}/>
        </div>
        </>
      )}
    </div>
  );
};

export default Original;
