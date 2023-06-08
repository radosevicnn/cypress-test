class CreateBoardPage {
	get addNewBoardButton() {
		return cy.get('.vs-c-organization-boards__item--add-new');
	}

	get titleField() {
		return cy.get('input[name="name"]');
	}

	get nextButton() {
		return cy.get('button').contains('Next');
	}

	get scrumBoardRadioButton() {
		return cy.get('.vs-c-radio-check').eq(0);
	}

	get finishButton() {
		return cy.get('button').contains('Finish');
	}

	createBoard(board) {
		this.addNewBoardButton.click();
		this.titleField.type(board);
		this.nextButton.click();
		this.scrumBoardRadioButton.click();
		this.nextButton.click();
		this.nextButton.click();
		this.nextButton.click();
		this.finishButton.click();
	}
}

export const createBoardPage = new CreateBoardPage();
