import { useState, useRef, useEffect } from 'react'
import ThirdComp from './ThirdComp'

let countId = 0;

export default function FirstComp({showing, setShowing}) {
  
  const [inputValue, setInputValue] = useState("")
  const [display, setDisplay] = useState([])
  const date = new Date()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue) {
      setDisplay([...display, {date, id: countId++, name: inputValue, editor: false}])
    }
    setInputValue("")
  }

  const handleEventChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleReverse = () => {
    const reversed = display.reverse()
    setDisplay([...reversed])
  }

  return (
    <>
      <h1 
        data-testid="first-comp"
        style={showing ? {color: "cyan"} : {color: "hotpink"}}>
        React-Dev
      </h1>

      <form data-testid="testid-form" onSubmit={handleSubmit}>
        <input
          data-testid="testid-event"
          type="text"
          value={inputValue}
          onChange={(e) => handleEventChange(e)}
        />
        <button
          data-testid="testid"
          type="submit">
          Enter
        </button>
      </form>

      <button
        data-testid="testid-reverse"
        type="button"
        onClick={handleReverse}>
        Reverse
      </button>

      {display.map((dis) => (
        <ThirdComp
          key={dis.id}
          inputValue={inputValue}
          dis={dis}
          name={dis.name}
          editor={dis.editor}
          display={display}
          setDisplay={setDisplay}
        />
      ))}
    </>
  )
}