const express = require('express');
const router = express.Router();
const Joi = require('joi');
const isEqual = require('lodash/isEqual');

const ROWS_COUNT = 10;
const COLUMNS_COUNT = 10;
const MAX_PRODUCTS_IN_CELL = 10;

const cells = Array(ROWS_COUNT)
  .fill()
  .map((entry) =>
    Array(COLUMNS_COUNT)
      .fill()
      .map((entry) => ({ types: ['other'], products: [] }))
  );

const types = {
  chilled: { types: ['chilled'] },
  hazardous: { types: ['hazardous'] },
  chilledAndHazardous: { types: ['chilled', 'hazardous'] },
  other: { types: ['other'] },
};

for (let i = 0; i < ROWS_COUNT; i++) {
  cells[i][9].types = ['hazardous'];
}

for (let i = 7; i < ROWS_COUNT; i++) {
  for (let j = 7; j < COLUMNS_COUNT; j++) {
    cells[i][j].types = [...cells[i][j].types, 'chilled'];
  }
}

const { chilled, hazardous, chilledAndHazardous, other } = types;

const products = {
  milk: chilled,
  yogurt: chilled,
  cheese: chilled,
  insultin: chilledAndHazardous,
  bleach: hazardous,
  stainRemoval: hazardous,
  bread: other,
  pasta: other,
  salt: other,
  bamba: other,
  apple: other,
};

const addProductToCell = ({ product, quantity, row, column }) => {
  // check input is valid
  const schema = Joi.object({
    product: Joi.string().min(3).required(), // add a check that the product is a valid one
    row: Joi.number()
      .min(0)
      .max(ROWS_COUNT - 1)
      .required(),
    column: Joi.number()
      .min(0)
      .max(COLUMNS_COUNT - 1)
      .required(),
  });
  const { error } = schema.validate({ product, row, column });
  if (error) {
    console.error('invalid product, row or cell');
    return false;
  }

  let cell = cells[row][column];

  // Check for space
  if (
    cell.products?.length === MAX_PRODUCTS_IN_CELL ||
    quantity + cell.products?.length > MAX_PRODUCTS_IN_CELL
  ) {
    console.error('No room to add another product');
    return false;
  }

  // Check cell types match those of passed product
  const productProps = products[product];
  const { types } = productProps;
  // do this by caomparing arrays (with the help of lodash)
  if (!isEqual(types, cell.types)) {
    console.error('Product types are different than cell types');
    return false;
  }

  // product can be placed at this cell
  cell.products.push(...Array(quantity).fill(product));
  return cell;
};

addProductToCell({ product: 'bread', quantity: 3, row: 0, column: 1 });
addProductToCell({ product: 'bamba', quantity: 5, row: 3, column: 3 });
addProductToCell({ product: 'bleach', quantity: 8, row: 0, column: 9 });

const allocateCell = ({ productId, quantity }) => {
  let foundRow = null;
  let foundColumn = null;

  for (let i = 0; i < ROWS_COUNT && !foundRow; i++) {
    for (let j = 0; j < COLUMNS_COUNT && !foundColumn; j++) {
      const successfulPlacement = addProductToCell({
        product: productId,
        quantity,
        row: i,
        column: j,
      });
      if (successfulPlacement) {
        foundRow = i;
        foundColumn = j;
      }
    }
  }

  if (foundRow !== null && foundColumn !== null) {
    return { foundCell: true, cell: `${foundRow},${foundColumn}` };
  }

  return { foundCell: false };
};

const reponse = allocateCell({ productId: 'bread', quantity: 2 });

module.exports = router;
