/* eslint-disable no-undef */

describe('Add, edit and delete customers', () => {
  it('user can first add a new customer, then edit and finally delete it', () => {
    // login
    cy.visit('http://localhost:3000/');
    cy.findByLabelText(/username/i).type('johndoe');
    cy.findByLabelText(/password/i).type('johndoe');
    cy.findByRole('button', { name: /login/i }).click();
    // click navbar's Customers link
    cy.findByRole('link', { name: /customers/i }).click();
    // search by customer name to check if customer already exists
    cy.findByRole('button', { name: /show all customers/i }).click();
    cy.wait(1000);
    cy.findByRole('searchbox').type('Atria');
    cy.findByText('Atria').should('not.exist');
    cy.findByRole('searchbox').clear();
    cy.wait(1000);
    cy.findByRole('button', { name: /add new customer/i }).click();
    // fill in customer details, click confirm and save to submit form
    cy.wait(1000);
    cy.findByPlaceholderText(/id with 5 capital letters/i).type('atria');
    cy.findByPlaceholderText(/company name/i).type('Atria');
    cy.findByPlaceholderText(/contact name/i).type('John Doe');
    cy.findByPlaceholderText(/contact title/i).type('marketing executive');
    cy.findByPlaceholderText(/country/i).type('Finland');
    cy.findByPlaceholderText(/address/i).type('Kirkkokatu 4 A 5');
    cy.findByPlaceholderText(/city/i).type('Helsinki');
    cy.findByPlaceholderText(/region/i).type('Uusimaa');
    cy.findByPlaceholderText(/postal code/i).type('00100');
    cy.findByPlaceholderText(/phone number/i).type('+358404748949');
    cy.findByPlaceholderText(/fax number/i).type('3458028739');
    cy.findByRole('button', { name: /confirm and save/i }).click();
    cy.wait(1000);
    // search by customer name to verify that the customer was saved
    cy.findByRole('heading', { name: /Atria, Finland/i }).should('be.visible');
    cy.wait(2000);
    // click customer card to open it
    cy.findByRole('heading', { name: /Atria, Finland/i }).click();
    // click edit customer button
    cy.get('[data-cy="btnEdit"]').click();
    // make changes, click confirm and save
    cy.findByPlaceholderText(/company name/i).type(' Oy');
    cy.findByRole('button', { name: /confirm and save/i }).click();
    cy.wait(5000);
    // search by new customer name to verify that the customer edits were saved
    cy.findByRole('searchbox').clear();
    cy.findByRole('searchbox').type('Atria Oy');
    cy.findByRole('heading', { name: /Atria Oy, Finland/i }).should('be.visible');
    // click card to open it
    cy.findByRole('heading', { name: /Atria Oy, Finland/i }).click();
    // click delete customer
    cy.get('[data-cy="btnDelete"]').click();
    // confirm that the customer was deleted
    cy.findByRole('searchbox').clear();
    cy.findByRole('searchbox').type('Atria Oy');
    cy.findByText('Atria Oy').should('not.exist');
  });
});
