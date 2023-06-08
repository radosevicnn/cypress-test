/// <reference types='cypress' />

import { loginPage } from '../page_objects/LoginPage';
import { deleteBoardPage } from '../page_objects/DeleteBoardPage';

describe('Delete board test', () => {
  beforeEach(() => {
    let email = Cypress.env('EMAIL');
    let password = Cypress.env('PASSWORD');

    cy.intercept({
      url: Cypress.env('API_URL') + '/login',
      method: 'POST',
    }).as('login');

    cy.visit('/login');
    loginPage.login(email, password);

    cy.wait('@login').then((intercept) => {
      const response = intercept.response;
      expect(response.statusCode).to.equal(200);
      cy.url().should('not.include', '/login');
    })
  })

  it('Delete existing board', () => {
	let organizationId = 30132;
	cy.visit(`/organizations/${organizationId}/boards`);
	cy.get('button').contains('OK').click();

	cy.intercept({
		method: 'DELETE',
		url: Cypress.env('API_URL') + '/boards/*'
	}).as('deleteBoard')

	deleteBoardPage.deleteBoard();

	cy.wait('@deleteBoard').then(interception => {
		expect(interception.response.statusCode).to.equal(200);
	});
  });
});
