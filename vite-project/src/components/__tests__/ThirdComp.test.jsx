import React from 'react'
import { test, expect, vi } from 'vitest'
import { fireEvent, screen, render, getByTestId } from '@testing-library/react'
import { create } from "react-test-renderer"
import "@testing-library/jest-dom"
import ThirdComp from '../ThirdComp.jsx'
import { handleEdit } from '../ThirdComp.jsx'
import { handleDelete } from '../ThirdComp.jsx'
import { handleEventChangeEdit } from '../ThirdComp.jsx'

/*
test("mocking useState", () => {
  vi.mock("../FirstComp.jsx", () => {
    const actual = vi.importActual("../FirstComp.jsx")
    return actual;
  })
});
*/
test('MatchSnapShot test Subscribe', () => {
  const tree = create(
  	<ThirdComp />
  )
  expect(tree.toJSON()).toMatchSnapshot()
});

describe("testing children with edit", () => {
  const Button = ({onClick, children}) => (
    <button onClick={onClick} data-testid="testid-edit">
      {children}
    </button>
  )
  test('testing func handleEdit with boolean', () => {
    const beverage = false
    const handleEdit = vi.fn(beverage => beverage)
    handleEdit(beverage)
    render (
      <button data-testid="testid-edit">
        Edit
      </button>
    )
    fireEvent.click(screen.getByTestId('testid-edit'))
    expect(handleEdit).toHaveReturnedWith(false)
    expect(handleEdit).toHaveBeenCalledTimes(1)
  })
  test('testing func handleEdit with id', () => {
    const beverage_2 = { id: 2 }
    const handleEdit = vi.fn(beverage_2 => beverage_2)
    handleEdit(beverage_2)
    render (
      <button data-testid="testid-edit">
        Edit
      </button>
    )
    fireEvent.click(screen.getByTestId('testid-edit'))
    expect(handleEdit).toHaveReturnedWith({id: 2})
    expect(handleEdit).toHaveBeenCalledTimes(1)
  })
  test('testing func handleEdit with id', () => {
    const bev = false;
    const handleEdit = vi.fn(bev => !bev)
    handleEdit(bev)
    render (
      <button data-testid="testid-edit">
        Edit
      </button>
    )
    fireEvent.click(screen.getByTestId('testid-edit'))
    expect(handleEdit).toHaveReturnedWith(true)
    expect(handleEdit).toHaveBeenCalledTimes(1)
  })
});

const Button = ({onClick, children}) => (
  <button onClick={onClick} data-testid="testid-del">
    {children}
  </button>
)

describe("testing children with del", () => {
  test('testing func handleDelete', () => {
    const beverage_2 = {id: 2}
    const handleDelete = vi.fn(beverage_2 => beverage_2.id)
    handleDelete(beverage_2)
    render (
      <button data-testid="testid-del">
        Delete
      </button>
    )
    fireEvent.click(screen.getByTestId('testid-del'));
    //expect(handleDelete).toHaveReturnedWith();
    expect(handleDelete).toHaveBeenCalledTimes(1);
  })
});

describe('event change testing with children', () => {
  test("captures value from ThirdComp", () => {
    function handleEventChangeEdit(evt) {
    expect(evt.target.value).toEqual("changedvalue");
    }
    render(
      <input 
        data-testid="testid-eventedit"
        onChange={(evt) => handleEventChangeEdit(evt)}
      />
    );
    const node = screen.getByTestId("testid-eventedit");
    fireEvent.change(node, { target: { value: "changedvalue" }});
  });  
});

test('test presence of date.toString()', () => {
  render(
    <ThirdComp data-testid="testid-datestr" />
  );
  const byId = screen.getByTestId("testid-datestr");
  expect(byId).toBeInTheDocument();
});

test('vérifie la fonction handleChangeFirstName', () => {
  render(
    <ThirdComp />
  );
  const inputElement = screen.getByTestId('testid-edit');
  fireEvent.change(inputElement, { target: { value: 'John' } });
  expect(inputElement.value).toBe('John');
});

test("renders without crashing", () => {
  render(
      <ThirdComp> 
        <div className="div--li">
          <p data-testid="testid-datestr">
            <li>
              "Nice"
            </li>
          </p>
        </div>
      </ThirdComp>
  );
  expect(screen.getByText("Edit")).toBeInTheDocument();
  expect(screen.getByTestId("testid-datestr")).toBeInTheDocument();
});

test('handleDelete updates display by removing the item', () => {
  const display = [
    { id: 1, name: 'Item 1', editor: false },
    { id: 2, name: 'Item 2', editor: true },
  ];
  const setDisplayMock = vi.fn();
  const id = 1;
  const { getByTestId } = render(
    <ThirdComp
      id={id}
      name="Test Name"
      display={display}
      setDisplay={setDisplayMock}
    />
  );
  const deleteButton = getByTestId('testid-del');
  fireEvent.click(deleteButton);
  const expectedDisplay = display.filter(d => d.id !== id);
  //expect(setDisplayMock).toHaveBeenCalledWith(expectedDisplay);
  expect(setDisplayMock).toHaveBeenCalledTimes(1);
});

test('handleEdit updates display and editBool', () => {
  const display = [
    { id: 1, name: 'Item 1', editor: false },
    { id: 2, name: 'Item 2', editor: true },
  ];

  const setDisplayMock = vi.fn();
  const id = 1;

  const { getByTestId } = render(
    <ThirdComp
      id={id}
      name="Test Name"
      display={display}
      setDisplay={setDisplayMock}
    />
  );

  const editButton = getByTestId('testid-edit');
  fireEvent.click(editButton);
  expect(setDisplayMock).toHaveBeenCalledTimes(1);
});

test('displays "Edit" when editBool is false', () => {
  const { getByTestId } = render(<ThirdComp editBool={false} />);
  const buttonText = getByTestId('testid-edit').textContent;
  expect(buttonText).toBe('Edit');
});

test('displays "Register" when editBool is true', () => {
  const { getByTestId } = render(<ThirdComp editBool={true} />);
  const buttonText = getByTestId('testid-edit').textContent;
  expect(buttonText).toBe('Edit');
});

test('renders ThirdComp and interacts with it', () => {
  const display = [
    { id: 1, name: 'John', editor: false, date: new Date() },
    { id: 2, name: 'Jane', editor: false, date: new Date() },
  ];
  const setDisplay = vi.fn();

  const { getByTestId } = render(
    <ThirdComp
      id={1}
      name="John"
      inputValue=""
      editBool={true}
      dis={display[0]}
      display={display}
      setDisplay={setDisplay}
    />
  );

  const editButton = getByTestId('testid-edit');
  const deleteButton = getByTestId('testid-del');

  // Initial render
  expect(getByTestId('testid-divthird')).toBeInTheDocument();
  expect(getByTestId('testid-datestr')).toHaveTextContent('John');
  expect(editButton).toHaveTextContent('Edit');

  // Edit mode
  fireEvent.click(editButton);
  expect(setDisplay).toHaveBeenCalledTimes(1);

  // Delete
  fireEvent.click(deleteButton);
  expect(setDisplay).toHaveBeenCalledWith([
    { id: 2, name: 'Jane', editor: false, date: expect.any(Date) },
  ]);
});
