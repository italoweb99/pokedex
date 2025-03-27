import { useEffect, useState } from "react"
import './FullPage.css'
import Slider from "./Slider";
import { FaArrowLeft } from "react-icons/fa";

interface FullPageProps{
    id: any;
    onClick: (name:string) =>void;
}
const FullPage = ({id, onClick}:FullPageProps) =>{
    const [pokeData,setPokeData] = useState<{nome: string; sprite: string; stats: any[]; types: any[]; evoChain: any[],}>()
    const [isLoading,setIsLoading] = useState(true);
    
    const getTypes = async (urls: string[]) => {
        try {
            const typeData = await Promise.all(
                urls.map(async (url) => {
                    const res = await fetch(url);
                    const json = await res.json();
                    return { tipo: json.name, id: json.id, sprite: json.sprites['generation-iii']?.emerald?.name_icon };
                })
            );
            return typeData;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchImgs = async(url: string) =>{
        try{
            const res2 = await fetch(url)
            const json2 = await res2.json();
            return(json2.sprites.front_default);
        }
       catch(error){
        console.log("erro",error);
       }
    }
    const getImgs = async(urls: string[]) =>{
        const imgs = await Promise.all(
            urls.map(async (url)=>{
               try{
                const res = await fetch(url);
                const json = await res.json();
                const img = await fetchImgs(json.varieties[0].pokemon.url);
                return {url: img};
               }
               catch(error){
                console.log('Erro imagem', error);
               }
            })
        )
        return imgs;
    }
    const parseEvolutionChain = (chain: any, list: {name: string, url: string}[] = []) => {
      
        if (!chain) return list; // Caso base: se não houver cadeia, só retorna a lista
        list.push({
          name: chain.species.name,
          url: chain.species.url
        });
        // Se houver evoluções, fazemos uma chamada recursiva
        if (chain.evolves_to.length > 0) {
          // Se tiver mais de uma evolução, pode ser necessário iterar, aqui pegamos a primeira
          chain.evolves_to.forEach((evo: any) => {
            parseEvolutionChain(evo, list);
          });
        }
        return list;
      };
    
    const getEvoTree = async (url: string) =>{
     
            try{
                let aux: any[] = [];
                const res = await fetch(url);
                const json =await res.json();
               // console.log(json);
              const list = await parseEvolutionChain(json.chain);
              const urls = list.map((pokemon: {url: string})=> pokemon.url);
              const img = await getImgs(urls)
              list.map((pokemon,index)=>{
                aux.push({name: pokemon.name, img: img[index]?.url})
              })
              return aux;
            }
            catch(error){
                console.log('Erro getTree', error);
                
            }
                
    }
    const  getSpecies = async (url: string) =>{
        try{
            const res = await fetch (url);
            
            const json = await res.json();
            const result = await getEvoTree (json.evolution_chain.url);
            return result;
        }
        catch(error){
            console.log('Erro getSpecies', error);
        }
    }
    const toCap=(e: string|undefined) =>{
        return e ? e.charAt(0).toUpperCase() + e.slice(1) : ""
      }
      
    useEffect(()=>{
        const fetchPokeData = async () =>{
           try{
            const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
            const json = await res.json();
            const evoChain = await getSpecies (json.species.url);
            const urls = json.types.map((pokemon: { type: string }) => pokemon.type).map((type: { url: string }) => type.url);
             const types =   await getTypes(urls);
             if(types && evoChain)
            setPokeData ({nome: json.name, sprite: json.sprites.front_default, stats: json.stats, types: types, evoChain: evoChain});
            setIsLoading(false);
           
           }
           catch(error){
            console.log('Erro getpokedata', error);
           // console.log('ssss');
        }
        }
        fetchPokeData();
    },[id])
    //console.log(pokeData);
    return(
    <div className="conteiner2">
        {
          !isLoading ? (
            <>
           <FaArrowLeft className='seta' onClick={()=>window.location.reload()} size={24}/>
            <div className="images">

            <img src={pokeData?.sprite}/>
            <p>{toCap(pokeData?.nome)}</p>
            <div className="tipo">
            {
                pokeData?.types.map((type) =>(
                    <img key={type.id} src={type.sprite}/>
                 ) )
            }
            </div>
            </div>
            <div className="stats">
            <h1>Estatísticas</h1>
           {
            pokeData?.stats.map((stat) =>(
            <div key={stat.stat.name}>
               <p>{stat.stat.name}</p>
               <Slider value={stat.base_stat}/>
            </div>
            ) )
           }
            </div>
            <div className="evolution">
            <h1>Evoluções</h1>
            <div className="evoChain"> 
            {
                pokeData?.evoChain.map((url)=>(
                    <div onClick={()=>onClick(url!.name)} key={url.name}>
                    <img src={url.img}/>
                    <p>{toCap(url.name)}</p>
                    </div>
                ))
            }
            </div>
            </div>
            </>
          ):(
            <>
            <div className="loading">
            <img src="pokebola.svg"/>
            <h2>Loading...</h2> 
            </div>
            </>
          )
        }
    </div>
    )
}
export default FullPage