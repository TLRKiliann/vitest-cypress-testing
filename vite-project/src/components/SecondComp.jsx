import { useState, useEffect } from 'react'

const SecondComp = ({showing, setShowing}) => {

  const [person, setPerson] = useState({
    firstName: "Henry",
    password: "Yohout"
  })
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    console.log("this will finish in 3 sec")
    const timer = setTimeout(() => {
      console.log("run into setTimeout(fn())")
    }, 3000)
    setIsLoading(false)
    return () => clearTimeout(timer)
  }, [])

  const [count, setCount] = useState(0)

  const handleChangeFirstName = (e) => {
    setPerson({...person, firstName: e.target.value})
  }

  const handleChangePassword = (e) => {
    setPerson({...person, password: e.target.value})
  }

  const handleChange = () => {
    setShowing(!showing)
    setCount(count => count + 1)
  }

  return (
    <>
      <h1
        data-testid="second-comp" 
        style={showing ? {color: "cyan"} : {color: "hotpink"}}>
        SecondComp
      </h1>

      {isLoading ? (
        <h2 
          data-testid="testid-hello" 
          style={{fontSize: "4rem"}}>Hello {person.firstName} !!!
        </h2>
        ) : (
          <>
          </>
        )
      }
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: "left",
          justifyContent: 'left',
          marginBottom: "20px"
        }}
      >
        <label style={{textAlign: "left"}}>username</label>
        <input
          data-testid="testid-inputone"
          name="username"
          type="text"
          value={person.firstName}
          onChange={(e) => handleChangeFirstName(e)}
          placeholder={person.firstName}
        />

        <label style={{textAlign: "left"}}>password</label>
        <input
          data-testid="testid-inputtwo"
          type="password"
          value={person.password}
          onChange={(e) => handleChangePassword(e)}
          required
        />
        
        <button
          data-testid="testid-two"
          type="button"
          onClick={handleChange}
        >
          {showing ? 'Show password' : 'Show firstname'} - {count}
        </button>
        {showing ? (
          <p>firstname: {person.firstName}</p>
          ) : (
          <p>password: {person.password}</p>
          )
        }
      </div>
    </>
  )
}
export default SecondComp;