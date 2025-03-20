import { useEffect, useState } from "react"
import './PokemonPage.css'
const PokemonPage = ({id}) => {
    const [pokeData,setPokeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [types,setTypes] = useState<{tipo: string; id: number; sprite: string}[]>([]);
    const [search,setSearch] = useState(id);
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
                setSearch('notFound')
            } finally {
                setIsLoading(false);
            }
        };
    if(search != " "){
        fetchPokemons();
    }
    
    }, [])
    
    return(
        <div className="Page">
{
    !isLoading && 
    
        
            search !=  ' ' ? (
            search != 'notFound' ?(
        <div className="contiener">
    <img className="pokeImage" src={pokeData.sprites.front_default} alt={pokeData.name} />
    <div className="tipos">
    {
        types.map((type)=>(
            <img key={type.id} src={type.sprite}/>
        ))
    }
    </div>
    <div className="text">
    <p>Nome: {pokeData.name}</p>
    <p>Altura: {(pokeData.height)/10} m</p>
    <p>Peso: {(pokeData.weight)/10} kg</p>
    </div>
    </div>
            ):(
                <p>Pokemon não encontrado</p>
            )
        ):(
            <p>Selecione um Pokemon</p>
        
    
    )
}
</div>
    )
}
export default PokemonPage