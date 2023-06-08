/// <reference types='cypress' />

import { loginPage } from '../page_objects/LoginPage';

describe('Login test', () => {
  beforeEach(() => {
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage();
    })

  it('Valid login', () => {
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
  });

  it('Invalid email - negative case', () => {
    let email = 'nepostojecimejl@mail.com';
    let password = Cypress.env('PASSWORD');

    cy.intercept({
      url: Cypress.env('API_URL') + '/login',
      method: 'POST',
    }).as('login');

    cy.visit('/login');
    loginPage.login(email, password);

    cy.wait('@login').then((intercept) => {
      const response = intercept.response;
      expect(response.statusCode).to.equal(401);
      cy.url().should('include', '/login');
    })
  });

  it('Invalid password - negative case', () => {
    let email = Cypress.env('EMAIL');
    let password = 'password';

    cy.intercept({
      url: Cypress.env('API_URL') + '/login',
      method: 'POST',
    }).as('login');

    cy.visit('/login');
    loginPage.login(email, password);

    cy.wait('@login').then((intercept) => {
      const response = intercept.response;
      expect(response.statusCode).to.equal(401);
      cy.url().should('include', '/login');
    })
  });
});
