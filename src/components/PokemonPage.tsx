import { useEffect, useState } from "react"

const PokemonPage = ({id}) => {
    const [pokeData,setPokeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [types,setTypes] = useState<{tipo: string; id: number; sprite: string}[]>([]);
    const getTypes = async(urls) =>{
     try{
        const typeData = await Promise.all(
        urls.map(async(url)=>{
            const res = await fetch(url);
            const json =await res.json();
            //console.log(json.sprites['generation-iii'].emerald.name_icon)
            return {tipo: json.name, id: json.id, sprite: json.sprites['generation-iii'].emerald.name_icon}
        })
        )
        
     setTypes(typeData); 
    } catch (error) {
      console.error(error);
    }
    }
    useEffect(() => {
        const fetchPokemons = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const json = await response.json();
                setPokeData(json);
                const urls = json.types.map((pokemon: { type: string }) => pokemon.type).map((type: {url: string})=> type.url);
                //console.log(urls);
                await getTypes(urls);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchPokemons();
    }, [])
    
    return(
        <div>
{
    !isLoading &&
    (
        <>
    <button onClick={() => window.location.reload()}>Back</button>
    <img src={pokeData.sprites.front_default} alt={pokeData.name} />
    <h1>Nome: {pokeData.name}</h1>
    <h1>Altura: {pokeData.height} m</h1>
    <h1>Peso: {pokeData.weight} kg</h1>
    {
        types.map((type)=>(
            <img key={type.id} src={type.sprite}/>
        ))
    }
    </>
    )
}
</div>
    )
}
export default PokemonPage