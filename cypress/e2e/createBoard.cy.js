/// <reference types='cypress' />

import { loginPage } from '../page_objects/LoginPage';
import { createBoardPage } from '../page_objects/CreateBoardPage';

describe('Create board test', () => {

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

  it('Create a new board in existing organization - positive test case', () => {
    let organizationId = 30132;

    cy.visit(`/organizations/${organizationId}/boards`);
    cy.get('button').contains('OK').click();

    cy.intercept({
      method: 'POST',
      url: Cypress.env('API_URL') + '/boards'
    }).as('createBoard');

    createBoardPage.createBoard('Moj board');

    cy.wait('@createBoard').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(201);
      cy.url().should('contain', '/boards')
    });
  });

});
