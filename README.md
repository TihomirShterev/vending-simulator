# Vending Machine

A responsive vending machine simulator built with React 18, TypeScript, and Material UI.

## Features

- **Product Inventory**: Initialized via mocked API. Supports up to 15 items per slot.
- **CRUD Operations**: Add, edit, and delete products in the application state.
- **Vending Logic**:
  - Accepts Euro coin denominations.
  - Validates stock and balance before purchase.
  - Calculates and returns change.
  - Can cancel purchase and return coins.

## Scripts

- `npm install` or `yarn`: Installs dependecies.
- `npm start` or `yarn start`: Runs the app in development mode.
- `npm test` or `yarn test`: Launches the test runner.

## Demo Examples

1. **Purchase**: Insert €2.00, click "Buy" on Juice (€1.60). Balance resets to 0, and the message shows "Change: €0.40".
2. **Cancel**: Insert €0.80 and click "Cancel & Return Coins" to see the balance reset and coins returned.
3. **Add**: Click "Add New Product" to open a form to add product's name, price, and quantity.
3. **Edit**: Click on product's "pencil" icon to open a form to edit its prop values.
3. **Remove**: Click on a product's "garbage can" icon to remove it from the inventory.
