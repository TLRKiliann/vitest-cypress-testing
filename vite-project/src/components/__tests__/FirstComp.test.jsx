import React from 'react'
import { test, expect } from 'vitest'
import { fireEvent, screen, render } from '@testing-library/react'
import { create } from "react-test-renderer"
import "@testing-library/jest-dom"
import FirstComp from '../FirstComp.jsx'
import ThirdComp from '../FirstComp.jsx'
import { handleSubmit } from '../FirstComp.jsx'
import { handleEventChange } from '../FirstComp.jsx'
import { handleReverse } from '../FirstComp.jsx'

/*
test("mocking useState", () => {
  vi.mock("../ThirdComp.jsx", () => {
    const actual = vi.importActual("../ThirdComp.jsx")
    return actual;
  })
});
*/

test('MatchSnapShot FirstComp', () => {
  const tree = create(
  	<FirstComp />
  )
  expect(tree.toJSON()).toMatchSnapshot()
});

describe("testing children FirstComp", () => {
  test('testing function handleSubmit', () => {
    const beverage = {...["abc"], id: 2, name: "Doug", editor: false }
    const handleSubmit = vi.fn(beverage => beverage)
    handleSubmit(beverage)
    render(
      <FirstComp>
        <button data-testid="testid">
          Enter
        </button>
      </FirstComp>
    )
    fireEvent.submit(screen.getByTestId('testid'))
    expect(handleSubmit).toHaveReturnedWith({ 
      ...['abc'], id: 2, name: "Doug", editor: false 
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
});

//Submit Form
test("submit form test", () => {
  const beverage = {id: 3, name: "doug", editor: false};
  const handleSubmit = vi.fn(beverage => beverage.id);
  handleSubmit(beverage);
  render(
    <FirstComp>
      <form 
        data-testid="testid-form"
        onSubmit={handleSubmit}
      >  
      </form>
    </FirstComp>
  );
  fireEvent.submit(screen.getByTestId("testid-form"));
  expect(handleSubmit).toHaveReturnedWith(3);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

describe("testing children FirstComp", () => {
  test('testing function handleReverse', () => {
    const beverage = {id: 2, id: 3}
    const handleReverse = vi.fn(beverage => beverage.id)
    handleReverse(beverage)
    render(
      <FirstComp>
        <button data-testid="testid-reverse">
          Reverse
        </button>
      </FirstComp>
    )
    fireEvent.click(screen.getByTestId('testid-reverse'))
    expect(handleReverse).toHaveReturnedWith(3, 2)
    expect(handleReverse).toHaveBeenCalledTimes(1)
    expect(handleReverse).toBeDefined();
  })
});

describe("captures event from FirstComp", async () => {
  test('testing function handleEventChange', () => {
    function handleEventChange(evt) {
      expect(evt.target.value).toEqual("changedvalue");
    }
    render(
      <FirstComp>
        <input
          data-testid="testid-event"
          type="text"
          value=""
          onChange={(evt) => handleEventChange(evt)}
        />
      </FirstComp>
    )
    const node = screen.getByTestId("testid-event");
    fireEvent.change(node, { target: { value: "changedvalue" }});
    expect(handleEventChange).toBeDefined();
  })
});

test("captures nbr of btn", () => {
  const { getByRole } = render(
    <FirstComp />
  );
  const button = screen.getAllByRole('button');
  expect(button).toHaveLength(2);
});

test('handleSubmit updates display state and clears inputValue', () => {
  const setDisplay = vi.fn();
  
  const { getByTestId } = render(<FirstComp setDisplay={setDisplay} />);
  
  const form = getByTestId('testid-form');
  const input = getByTestId('testid-event');
  
  // Simuler une saisie dans le champ de texte
  fireEvent.change(input, { target: { value: 'Test input' } });
  
  // Soumettre le formulaire
  fireEvent.submit(form);
  
  // Vérifier si setDisplay a été appelé avec les bons arguments
  
  // Vérifier si l'état inputValue a été effacé
  expect(input.value).toBe('');
});


test('renders component with "cyan" color when showing is true', () => {
  render(
    <FirstComp showing={true} setShowing={vi.fn()} />
  );
  const heading = screen.getByTestId('first-comp');
  expect(heading).toHaveStyle({ color: 'cyan' });
});

test('renders component with "hotpink" color when showing is false', () => {
  render(
    <FirstComp showing={false} setShowing={vi.fn()} />
  );
  const heading = screen.getByTestId('first-comp');
  expect(heading).toHaveStyle({ color: 'hotpink' });
});

/*
test("getByTestId will throw with multiple testIDs", () => {
  const {getAllByTestId, getByTestId} = render(
    <ThirdComp>
      <input data-testid="testid-datestr">a</input>
      <input data-testid="testid-datestr">b</input>
    </ThirdComp>
  );
  expect(getAllByTestId("testid-eventedit")).toHaveLength(2); // OK
  getByTestId("testid-datestr"); // => Error: Found multiple elements with testID: foo
});

test("should find text content in all children", () => {
  const {getAllByTestId} = render(
    <div>
      {[..."abcd"].map((e, i) => 
        <input key={e + i} data-testid="testid-datestr">{e}</input>
      )}
    </div>
  );
  expect(getAllByTestId("testid-datestr")).toHaveLength(4);
  [..."abcd"].forEach((e, i) => {
    expect(getAllByTestId("testid-datestr")[i].textContent).toEqual(e);
  });
  // or:
  //const contents = getAllByTestId("foo").map(e => e.textContent);
  //expect(contents).toEqual([..."abcd"]);
});
*/