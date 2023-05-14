# vitest-cypress-testing

testing todo

$ pnpm create vite

$ cd vite-project/

$ pnpm install

## Vitest + RTL + jestdom

└─ $ ▶ pnpm add --save-dev vitest

└─ $ ▶ pnpm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer

└─ $ ▶ pnpm add --save-dev @testing-library/react @testing-library/jest-dom

└─ $ ▶ pnpm install --save-dev jsdom

## Configuration

```
vite.config.js

/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/setupTest.js']
    },
});
```

```
src/setupTest.js

import '@testing-library/jest-dom'
```

**To run test :**

$ pnpm test

$ pnpm coverage

## Cypress

$ pnpm install cypress --save-dev

$ pnpm dlx cypress open

```
 % Coverage report from c8
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |   93.91 |    93.18 |   84.21 |   93.91 |                   
 src             |     100 |      100 |     100 |     100 |                   
  App.jsx        |     100 |      100 |     100 |     100 |                   
 src/components  |    93.3 |    93.02 |   83.33 |    93.3 |                   
  FirstComp.jsx  |     100 |      100 |     100 |     100 |                   
  SecondComp.jsx |      92 |    92.85 |   83.33 |      92 | 16,33-35,46-49    
  ThirdComp.jsx  |   88.23 |       90 |   71.42 |   88.23 | 24-25,35-40       
-----------------|---------|----------|---------|---------|-------------------
```

Cypress

```
====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  cypress/component/ComponentName.cy.       61ms        1        1        -        -        - │
  │    jsx                                                                                         │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  src/App.cy.jsx                           203ms        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  src/components/FirstComp.cy.jsx          114ms        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  src/components/SecondComp.cy.jsx         119ms        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  src/components/ThirdComp.cy.jsx          112ms        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        609ms        5        5        -        -        -  


───────────────────────────────────────────────────────────────────────────────────────────────────────
```