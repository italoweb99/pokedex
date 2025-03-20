import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Original from './components/Originals';
import PokemonPage from './components/PokemonPage';
function App() {
  const [showOriginal, setShowOriginal] = useState(true);
  const [id, setId] = useState(1);
  const [search,setSearch] = useState('');
  const handleClose = (e) =>{
    setShowOriginal(false);
    setId(e)
  }
  const handleChange = (e) =>{
    setSearch(e.target.value)
    console.log(search);
  }
  const sumit = () =>{
    setId(search);
    setShowOriginal(false);
  }
  return(
    <>
    <div className='screen'>
    <div>
      <input type='text' value={search} onChange={handleChange} />
      <button onClick={sumit}>Pesquisar</button>
    </div>
    {showOriginal ? (
      <Original onClose={handleClose}/>
    ) : (
      <PokemonPage key={id} id = {id}/>
    )}
    </div>
    </>
  )
}

export default App
