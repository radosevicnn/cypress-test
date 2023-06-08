class LoginPage {
	get emailField() {
		return cy.get('input[type="email"]');
	}

	get passwordField() {
		return cy.get('input[type="password"]');
	}

	get loginButton() {
		return cy.get('button[type="submit"]');
	}

	login(email, password) {
		this.emailField.type(email);
		this.passwordField.type(password);
		this.loginButton.click();
	}
}

export const loginPage = new LoginPage();