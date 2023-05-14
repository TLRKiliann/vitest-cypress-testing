import { useState } from 'react'
import FirstComp from './components/FirstComp'
import SecondComp from './components/SecondComp'
import './App.css'

function App() {
  
  const [showing, setShowing] = useState(false)
  
  return (
    <>
      <FirstComp
        showing={showing}
        setShowing={setShowing}
      />
      <SecondComp
        showing={showing}
        setShowing={setShowing}
      />
    </>
  )
}

export default App