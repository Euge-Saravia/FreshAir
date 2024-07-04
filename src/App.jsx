import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card/card'
import Search from './components/card/card'

function App() {
  const [city, setCity] = useState('')

  return (
    <>
      <Card />
    </>
  );
};


export default App;
