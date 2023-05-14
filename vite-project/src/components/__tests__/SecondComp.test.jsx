import React, { useState } from 'react'
import { test, expect, vi } from 'vitest'
import { fireEvent, screen, render, waitFor } from '@testing-library/react'
//import userEvent from '@testing-library/user-event';
import { create } from "react-test-renderer"
import "@testing-library/jest-dom"
import SecondComp from '../SecondComp.jsx'
import { handleChange } from '../SecondComp.jsx'
import { handleChangeFirstName } from '../SecondComp.jsx'
import { handleChangePassword } from '../SecondComp.jsx'

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
  	<SecondComp />
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

describe('click + event', () => {
  test('click', () => {
    const bev = false;
    const handleChange = vi.fn(bev => !bev)
    handleChange(bev)
    render(
      <button data-testid="testid-two">
        Show password
      </button>
    );
    fireEvent.click(screen.getByTestId('testid-two'));
    expect(screen.getByText(/Show password/i)).toBeInTheDocument();
    expect(handleChange).toHaveReturnedWith(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  test("captures value from ThirdComp", () => {
    function handleChangePassword(evt) {
      expect(evt.target.value).toEqual("changedvalue");
    }
    render(
      <input 
        data-testid="testid-inputwo"
        onChange={(evt) => handleChangePassword(evt)}
      />
    );
    const node = screen.getByTestId("testid-inputwo");
    fireEvent.change(node, { target: { value: "changedvalue" } });
  });
});

test('conditional rendering test', () => {
  const count = 0;
  const bev_2 = {count: count + 1}
  const handleChange = vi.fn(bev_2 => bev_2)
  handleChange(bev_2)
  render (
    <button data-testid="testid-two">
      Show firstname
    </button>
  );
  fireEvent.click(screen.getByTestId('testid-two'));
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveReturnedWith({count: 1});
});

test("captures value from ThirdComp", () => {
  function handleChangeFirstName(evt) {
    expect({...['abc'], firstName: evt.target.value}).toEqual("Doug");
  }
  render(
    <input 
      data-testid="testid-inputone"
      onChange={(evt) => (evt)}
    />
  );
  const node = screen.getByTestId("testid-inputone");
  fireEvent.change(node, { target: { value: "Doug"}});
  expect(handleChangeFirstName).toBeDefined();
});

test('vérifie le rendu conditionnel', () => {
  const { queryByTestId } = render(
    <SecondComp isLoading={false} person={{ firstName: 'John' }}>
    </SecondComp>
  );
  const helloElement = queryByTestId('testid-hello');
  expect(helloElement).not.toBeInTheDocument();
});

test('console.log in useEffect', () => {
  const consoleSpy = vi.spyOn(console, 'log');
  render(
    <SecondComp />
  )
  expect(consoleSpy).toHaveBeenCalledWith('this will finish in 3 sec');
})

test('vérifie la fonction handleChangeFirstName', async () => {
  render(
    <SecondComp />
  );
  const inputElement = screen.getByTestId('testid-inputone');
  fireEvent.change(inputElement, { target: { value: 'John' } });
  await waitFor(() => {
    expect(inputElement.value).toBe('John');
  });
});

test('vérifie la fonction handleChangePassword', async () => {
  render(
    <SecondComp />
  );
  const inputElement = screen.getByTestId('testid-inputtwo');
  fireEvent.change(inputElement, { target: { value: '23562415' } });
  await waitFor(() => {
    expect(inputElement.value).toBe('23562415');
  });
});

test('affiche le nom d\'utilisateur ou le mot de passe en fonction de la valeur de showing', () => {
  // Cas où showing est vrai
  const { getByText } = render(<SecondComp showing={true} />);
  const usernameText = getByText(/firstname:/i);
  expect(usernameText).toBeInTheDocument();

  // Cas où showing est faux
  const { getByText: getByText2 } = render(<SecondComp showing={false} />);
  const passwordText = getByText2(/password:/i);
  expect(passwordText).toBeInTheDocument();
});

/*
describe("faketimer", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
});
*/
/*
test('testing style', () => {
  const isLoading = true;
  render(
    <SecondComp>
    {isLoading ? (
      <h2 
        data-testid="testid-hello" 
        style={{fontSize: "4rem"}}>Hello
      </h2>
      ) : (
        <>
        </>
      )
    }
    </SecondComp>
  );
  const element = screen.getByTestId("testid-hello");
  //expect(screen.getByText(/Hello/i)).toBeVisible();
  expect(element).toHaveStyle('fontSize: 4rem');
})
*/

/*
test('testing localStorage', () => {
  testData = [
      { Name: 'John', Result: true},
      { Name: 'Jane', Result: false}
  ];
  testData.forEach(function(testItem) {
      expect(setName(testItem.Name)).toBe(testItem.Result);
  }
});
*/