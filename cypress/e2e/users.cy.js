describe('Not see user related content', () => {
    it('Basic users can not see or access app user related content', () => {
        // login with regular user account details
        cy.visit('http://localhost:3000/');
        cy.findByPlaceholderText(/username/i).type('john');
        cy.findByPlaceholderText(/password/i).type('johndoe');
        cy.findByRole('button', { name: /login/i }).click();
        // verify that user can not access user tab in navbar
        cy.findByRole('link', { name: /users/i }).should('not.exist');
    });
});

describe('Add, edit and delete users', () => {
    it('Admin user can first add a new user, then edit and finally delete it', () => {
        // login
        cy.visit('http://localhost:3000/');
        cy.findByPlaceholderText(/username/i).type('[INSERT-HERE-ADMIN-USERNAME]');
        cy.findByPlaceholderText(/password/i).type('[INSERT-HERE-ADMIN-PASSWORD]');
        cy.findByRole('button', { name: /login/i }).click();
        // click navbar's Users link
        cy.findByRole('link', { name: /users/i }).should('be.visible');
        cy.findByRole('link', { name: /users/i }).click();
        cy.wait(1000);
        // // search by user's username to check if user already exists
        cy.findByRole('searchbox').type('janedoe');
        cy.findByRole('gridcell', { name: /janedoe/i }).should('not.exist');
        cy.findByRole('searchbox').clear();
        cy.wait(1000);
        // click Add new user
        cy.findByRole('button', { name: /add new user/i }).click();
        cy.wait(1000);
        // fill in user details, click confirm and save to submit form
        cy.findByPlaceholderText(/first name/i).type('Jane');
        cy.findByPlaceholderText(/last name/i).type('doe');
        cy.findByPlaceholderText(/email/i).type('jane.doe@gmail.com');
        cy.findByPlaceholderText(/access level/i).clear();
        cy.findByPlaceholderText(/access level/i).type('1');
        cy.findByPlaceholderText(/username/i).type('janedoe');
        cy.get('[data-cy="password1"]').type('janedoe');
        cy.get('[data-cy="password2"]').type('janedoe');
        cy.findByRole('button', { name: /confirm and save/i }).click();
        cy.wait(6000);
        // search by user name to verify that the new user was saved
        cy.findByRole('searchbox').type('janedoe');
        cy.findByText('janedoe').should('be.visible');
        // click edit user
        cy.get('[data-cy="btnEdit"]').click();
        // make changes, click confirm and save
        cy.findByPlaceholderText(/username/i).type('-88');
        cy.findByRole('button', { name: /confirm and save/i }).click();
        cy.wait(6000);
        // search by new user name to verify that the user edits were saved
        cy.findByRole('searchbox').clear();
        cy.findByRole('searchbox').type('janedoe-88');
        cy.findByText('janedoe-88').should('be.visible');
        // click delete user
        cy.get('[data-cy="btnDelete"]').click();
        // confirm that the user was deleted
        cy.findByRole('searchbox').clear();
        cy.findByRole('searchbox').type('janedoe-88');
        cy.findByText('janedoe-88').should('not.exist');
    });
});
