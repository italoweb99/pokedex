import { useEffect, useState } from "react";
import './PokemonPage.css';
import { FaPlus } from "react-icons/fa";
interface PokePagProps{
    id: any;
    onClose: (name: string) =>void;
}
interface PokeData {
    sprites: string;
    name: string;
    height: number;
    weight: number;
}
const PokemonPage = ({ id, onClose}:PokePagProps) => {
    const [pokeData, setPokeData] = useState<PokeData>();
    const [isLoading, setIsLoading] = useState(true);
    const [types, setTypes] = useState<{ tipo: string; id: number; sprite: string,}[]>([]);
    const [search, setSearch] = useState(id);

    const toCap=(e: string|undefined) =>{
        return e ? e.charAt(0).toUpperCase() + e.slice(1) : ""
      }

    const getTypes = async (urls: string[]) => {
        try {
            const typeData = await Promise.all(
                urls.map(async (url) => {
                    const res = await fetch(url);
                    const json = await res.json();
                    return { tipo: json.name, id: json.id, sprite: json.sprites['generation-iii']?.emerald?.name_icon };
                })
            );
            setTypes(typeData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchPokemons = async () => {
            setIsLoading(true);
         
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const json = await response.json();
                setPokeData({name: json.name, sprites: json.sprites.front_default, height: json.height, weight: json.weight});
                const urls = json.types.map((pokemon: { type: string }) => pokemon.type).map((type: { url: string }) => type.url);
                await getTypes(urls);
            } catch (error) {
                console.error(error);
                setSearch('notFound');
            } finally {
                setIsLoading(false);
            }
        };

        if (search !== " ") {
            fetchPokemons();
        }
    }, []);

    return (
        <div className="Page">
            {
                search !== ' ' ? (
                    isLoading ? (
                        <div className="loading">
                        <img src="/pokebola.svg"/>
                        <h2>Loading...</h2> 
                        </div>
                    ) : (
                    search !== 'notFound' ? (
                        <div className="contiener">
                            <img className="pokeImage" src={pokeData?.sprites} alt={pokeData?.name} />
                            <div className="tipos">
                                {types.map((type) => (
                                    <img key={type.id} src={type.sprite} alt={type.tipo} />
                                ))}
                            </div>
                            <div className="text">
                                <p>Nome: {toCap(pokeData?.name)}</p>
                                <p>Altura: {pokeData?.height? (pokeData?.height) / 10: "indefinido"} m</p>
                                <p>Peso: {pokeData?.weight? (pokeData?.weight) / 10: "indefinido"} kg</p>
                                <div onClick={()=>onClose(id)}><FaPlus/></div>
                            </div>
                        </div>
                    ) : (
                        <p>Pokemon não encontrado</p>
                    )
                )
                ) : (
                    <div className="selectPokemon">
                        <p>Selecione um Pokémon</p>
                        <img className="pokebola" src="/pokebola.svg" alt="Pokebola" />
                        <img className="pokedexLogo" src="/Pokédex.svg" alt="Pokedex Logo" />
                    </div>
                )
            
            }
        </div>
    );
};

export default PokemonPage;