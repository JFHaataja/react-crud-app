describe('Add, edit and delete products', () => {
    it('user can first add a new product, then edit and finally delete it', () => {
        // login
        cy.visit('http://localhost:3000/');
        cy.findByPlaceholderText(/username/i).type('[INSERT-HERE-ADMIN-OR-BASIC-USER-USERNAME]');
        cy.findByPlaceholderText(/password/i).type('[INSERT-HERE-ADMIN-OR-BASIC-USER-PASSWORD]');
        cy.findByRole('button', { name: /login/i }).click();
        // click navbar's Products link
        cy.findByRole('link', { name: /products/i }).click();
        cy.wait(1000);
        // // search by product name to check if product already exists
        cy.findByRole('searchbox').type('Fanta Lemon');
        cy.findByRole('gridcell', { name: /Fanta Lemon/i }).should('not.exist');
        cy.findByRole('searchbox').clear();
        cy.wait(1000);
        // click Add new product
        cy.findByRole('button', { name: /add new product/i }).click();
        cy.wait(1000);
        // fill in product details, click confirm and save to submit form
        cy.findByPlaceholderText(/product name/i).type('Fanta Lemon');
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
        cy.findByRole('searchbox').type('Fanta Lemon');
        cy.findByText('Fanta Lemon').should('be.visible');
        // click edit product
        cy.get('[data-cy="btnEdit"]').click();
        // make changes, click confirm and save
        cy.findByPlaceholderText(/product name/i).type(' Ginger');
        cy.findByRole('button', { name: /confirm and save/i }).click();
        cy.wait(6000);
        // search by new product name to verify that the product edits were saved
        cy.findByRole('searchbox').clear();
        cy.findByRole('searchbox').type('Fanta Lemon Ginger');
        cy.findByText('Fanta Lemon Ginger').should('be.visible');
        // click delete product
        cy.get('[data-cy="btnDelete"]').click();
        // confirm that the product was deleted
        cy.findByRole('searchbox').clear();
        cy.findByRole('searchbox').type('Fanta Lemon Ginger');
        cy.findByText('Fanta Lemon Ginger').should('not.exist');
    });
});
