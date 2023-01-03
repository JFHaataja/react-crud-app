/* eslint-disable no-undef */

describe('Add, edit and delete products', () => {
 it('user can first add a new product, then edit and finally delete it', () => {
  // login
  cy.visit('http://localhost:3000/');
  cy.findByLabelText(/username/i).type('johndoe');
  cy.findByLabelText(/password/i).type('johndoe');
  cy.findByRole('button', { name: /login/i }).click();
  // click navbar's Products link
  cy.findByRole('link', { name: /products/i }).click();
  cy.wait(1000);
  // // search by product name to check if product already exists
  cy.findByRole('searchbox').type('Jaffa Jouluomena');
  cy.findByRole('gridcell', { name: /Jaffa Jouluomena/i }).should('not.exist');
  cy.findByRole('searchbox').clear();
  cy.wait(1000);
  // click Add new product
  cy.findByRole('button', { name: /add new product/i }).click();
  cy.wait(1000);
  // fill in product details, click confirm and save to submit form
  cy.findByPlaceholderText(/product name/i).type('Jaffa Jouluomena');
  cy.findByPlaceholderText(/supplier id/i).type('1');
  cy.findByPlaceholderText(/category id/i).type('1');
  cy.findByPlaceholderText(/quantity per unit/i).type('12/box');
  cy.findByPlaceholderText(/unit price/i).type('3.00');
  cy.findByPlaceholderText(/units in stock/i).type('0');
  cy.findByPlaceholderText(/units on order/i).type('0');
  cy.findByPlaceholderText(/reorder level/i).type('2');
  cy.findByRole('radio', { name: /true/i }).click();
  cy.findByRole('button', { name: /confirm and save/i }).click();
  cy.wait(6000);
  // search by product name to verify that the product was saved
  cy.findByRole('searchbox').type('Jaffa Jouluomena');
  cy.findByText('Jaffa Jouluomena').should('be.visible');
  // click edit product
  cy.get('[data-cy="btnEdit"]').click();
  // make changes, click confirm and save
  cy.findByPlaceholderText(/product name/i).type('-inkivääri');
  cy.findByRole('button', { name: /confirm and save/i }).click();
  cy.wait(6000);
  // search by new product name to verify that the product edits were saved
  cy.findByRole('searchbox').clear();
  cy.findByRole('searchbox').type('Jaffa Jouluomena-inkivääri');
  cy.findByText('Jaffa Jouluomena-inkivääri').should('be.visible');
  // click delete product
  cy.get('[data-cy="btnDelete"]').click();
  // confirm that the product was deleted
  cy.findByRole('searchbox').clear();
  cy.findByRole('searchbox').type('Jaffa Jouluomena-inkivääri');
  cy.findByText('Jaffa Jouluomena-inkivääri').should('not.exist');
 });
});
