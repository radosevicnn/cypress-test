class DeleteBoardPage {
	get selectedBoard() {
		return cy.get('.vs-c-organization-boards__item').first();
	}

	get settingsButton() {
		return cy.get('a[class="vs-c-site-logo"]').eq(8);
	}

	get deleteButton() {
		return cy.get('.vs-c-btn--warning');
	}

	get confirmButton() {
		return cy.get('button[name="save-btn"]');
	}

	deleteBoard() {
		this.selectedBoard.click();
		this.settingsButton.click();
		this.deleteButton.click();
		this.confirmButton.click();
	}
}

export const deleteBoardPage = new DeleteBoardPage();
