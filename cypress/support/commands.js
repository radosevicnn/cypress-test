// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginUser', (email, password) => {
	cy.request({
		url: Cypress.env('API_URL') + '/login',
		method: 'POST',
		body: {
			email: email,
			password: password
		}
	}).its('body').then((response) => {
		cy.log(response);
    window.localStorage.setItem('token', response.token);
    window.localStorage.setItem('user_id', response.user_id);
    // window.localStorage.setItem('user', response.user);
	})
});

Cypress.Commands.add('deleteBoard', (boardId) => {
	cy.request({
		url: Cypress.env('API_URL') + `/boards/${boardId}`,
		method: 'DELETE',
	}).then((response) => {
		expect(response.status).to.equal(200);
	})
});