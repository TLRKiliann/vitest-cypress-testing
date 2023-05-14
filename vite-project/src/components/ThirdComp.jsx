import { useState, useRef, useEffect } from 'react'

const ThirdComp = ({id, name, inputValue, dis, display, setDisplay}) => {

  const [editBool, setEditBool] = useState(false)
  const [edit, setEdit] = useState(name)

  const myRef = useRef()

  const handleEdit = (e, id) => {
    e.preventDefault()
    setDisplay(display?.map((dis) => dis.id === id 
      ? {...dis, name: edit, editor: true}
      : dis ))
    setEditBool((editBool) => !editBool)
  }

  const handleDelete = (id) => {
    const delId = display.filter((d) => d.id !== id)
    setDisplay(delId)
  }

  const handleEventChangeEdit = (e) => {
    setEdit(e.target.value);
  }

  useEffect(() => {
    myRef?.current?.focus();
  }, [edit])

  return (
    <>
      <div data-testid="testid-divthird">
        {editBool === true && dis?.editor === true ? (
          <input
            data-testid="testid-eventedit"
            ref={myRef}
            value={edit} 
            onChange={(e) => handleEventChangeEdit(e)}
          />
          ) : (
          <div className="div--li">
            <p data-testid="testid-datestr">
              <li>
                {dis?.date?.toDateString()} - {name}
              </li>
            </p>
          </div>
        )}      
        <button 
          data-testid="testid-edit"
          type="button" 
          onClick={(e) => handleEdit(e, dis?.id)}
        >
          {editBool === false ? "Edit" : "Register"}
        </button>
        <button
          data-testid="testid-del"
          type="button"
          onClick={() => handleDelete(dis?.id)}
        >
          Delete
        </button>
      </div>
    </>
  )
}
export default ThirdComp;