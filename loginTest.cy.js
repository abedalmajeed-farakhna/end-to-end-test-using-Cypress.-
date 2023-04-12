const url="www.test.com";

describe("login Test", () => {
  beforeEach(() => {
    cy.visit("url");
  });

  it("test1", () => {
    cy.title().should("eq", "React App");
  });

  it("Verify that a user can successfully login to the application.", () => {
    cy.login("asd@gmail.com", "1235577");
  });

  it("Verify that a user can create an account (signup) successfully.", () => {
    const randomNmber = Cypress._.random(0, 1e6);
    cy.visit(url);
    cy.get("#email").type(`majd_${randomNmber}@gmail.com`);
    cy.get("#password").type("1235577");
    cy.get(".Button_Button__3gFiX.Button_Success__2Rka1").click();
    cy.wait(1000);
    cy.get(".NavigationItems_NavigationItems__1fnFX").contains("Logout");
  });

  it("Verify invalid credentials handling. - empty user name and passwword", () => {
    cy.visit(url);
    cy.get(".Button_Button__3gFiX.Button_Danger__2ogZq").click();
    cy.get(".Button_Button__3gFiX.Button_Success__2Rka1").click();
    cy.wait(1000);
    cy.get(".Auth_error__3FEJx").contains("INVALID_EMAIL");
  });

  it("Verify invalid credentials handling. - true user name and false passwword", () => {
    cy.visit(url);
    cy.get(".Button_Button__3gFiX.Button_Danger__2ogZq").click();
    cy.get("#email").type("asd@gmail.com");
    cy.get("#password").type("1111444");
    cy.get(".Button_Button__3gFiX.Button_Success__2Rka1").click();
    cy.wait(1000);
    cy.get(".Auth_error__3FEJx").contains("INVALID_PASSWORD");
  });

  it("Verify invalid credentials handling. - not exist user name ", () => {
    cy.visit(url);
    cy.get(".Button_Button__3gFiX.Button_Danger__2ogZq").click();
    cy.get("#email").type("new@gmail.com");
    cy.get("#password").type("11111111");
    cy.get(".Button_Button__3gFiX.Button_Success__2Rka1").click();
    cy.wait(2000);
    cy.get(".Auth_error__3FEJx").contains("EMAIL_NOT_FOUND");
  });
});