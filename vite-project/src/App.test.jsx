import React from 'react'
import { test, expect, vi } from 'vitest'
import { screen, render } from '@testing-library/react'
import { create } from "react-test-renderer"
import "@testing-library/jest-dom"
import App from './App.jsx'
import FirstComp from './App.jsx'
import SecondComp from './App.jsx'

/*
test("mocking useState", () => {
  vi.mock("./App.jsx", () => {
    const actual = vi.importActual("./App.jsx")
    return actual;
  })
});
*/

test('MatchSnapShot test Subscribe', () => {
  const tree = create(
  	<App />
  )
  expect(tree.toJSON()).toMatchSnapshot()
});

test('FirstComp test', () => {
  const { getByTestId } = render(
    <FirstComp data-testid="testid-form" />
  );
  const testFirstId = screen.getByTestId("testid-form");
  expect(testFirstId).toBeInTheDocument();
});

test('SecondComp test', () => {
  const { getByTestId } = render(
    <SecondComp data-testid="testid-inputone" />
  );
  const testFirstId = screen.getByTestId("testid-inputone");
  expect(testFirstId).toBeInTheDocument();
});

test('passes setShowing prop to FirstComp and SecondComp', () => {
  render(
    <App />
  );
  const firstComp = screen.getByTestId('first-comp');
  const secondComp = screen.getByTestId('second-comp');
  expect(firstComp.getAttribute('setShowing')).toBeNull();
  expect(secondComp.getAttribute('setShowing')).toBeNull();
});