import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Original from './components/Originals';
import PokemonPage from './components/PokemonPage';
import { FaSistrix } from 'react-icons/fa';
function App() {
 // const [showOriginal, setShowOriginal] = useState(true);
  const [id, setId] = useState(" ");
  const [search,setSearch] = useState('');
  const handleClose = (e) =>{
   // setShowOriginal(false);
    setId(e)
  }
  const handleChange = (e) =>{
    setSearch(e.target.value)
    console.log(search);
  }
  const sumit = () =>{
    setId(search);
    //console.log(id);
    //setShowOriginal(false);
  }
  return(
    <>
  <svg width="1446" height="836" viewBox="0 0 1446 836" fill="none" xmlns="http://www.w3.org/2000/svg" className='backplate'>
<path d="M1 138.12V825C1 830.523 5.47716 835 11 835H1434.5C1440.02 835 1444.5 830.523 1444.5 825V11C1444.5 5.47715 1440.02 1 1434.5 1H137.164C134.499 1 131.944 2.06396 130.067 3.95567L3.9023 131.076C2.04324 132.949 1 135.481 1 138.12Z" fill="#AAAAAA" />
</svg>

<svg width="214" height="1023" viewBox="0 0 214 1023" fill="none" xmlns="http://www.w3.org/2000/svg" className='detalhe'>
<g filter="url(#filter0_d_1_9)">
<path d="M6 0V263.5C6 373 208 449 208 521V1024.5" stroke="#F30506" stroke-width="2"/>
</g>

</svg>
<div className='rdButton'></div>
<div className='grill'>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<div className='btnMain'>
<div className='btnMainBaixo'>
<div className='btnMainCima'>
<div className='especular'></div>
</div>

</div>
</div>
<div className='btnSide'>
  <div className='btnSideRed'><div></div></div>
  <div className='btnSideYellow'><div></div></div>
  <div className='btnSideGreen'><div></div></div>
</div>
    <div className='screen'>
    <div className='searchBar'>
      <input type='text' placeholder='Pesquisar' value={search} onChange={handleChange} />
     <FaSistrix onClick = {sumit} size={18}/>
    </div>
    <div className='screenDiv'>
    <PokemonPage key={id} id={id}/>
   <Original onClose={handleClose}/>
   </div>
    </div>
    </>
  )
}

export default App
