const orderButton =
  ".ContactData_ContactData__20AK_ button.Button_Button__3gFiX.Button_Success__2Rka1";
const url="www.test.com";

describe("Create Order", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("Create a new order for non-logged in users.", () => {
    const randomNmber = Cypress._.random(0, 1e6);

    cy.get(".BuildControl_More__1MY7B:first").click(); // click on more
    cy.get(".BuildControls_OrderButton___M-Du").click(); // click on order
    cy.wait(1000);
    cy.get(".Button_Button__3gFiX.Button_Danger__2ogZq").contains(
      "SWITCH TO SIGNIN"
    ); // to check if the user in the signup page

    const email = `ahmad${randomNmber}@gmail.com`;

    cy.signUp(email, "1235577");

    cy.get(".Button_Button__3gFiX.Button_Success__2Rka1").click(); // click on CONTINUE button
    cy.get(".ContactData_ContactData__20AK_").contains(
      "Enter your Contact Data"
    ); // check if i can see the form

    cy.fillOrderForm(
      `ahmad`,
      "dear jareer",
      "60650",
      "palestine",
      email,
      "Cheapest"
    );
    cy.wait(2000);
    cy.get(".Burger_Burger__10T8F p").contains(
      "Please start adding ingredients!"
    );
  });

  it("Create a new order as a logged-in user.", () => {
    const email = "asd5655@gmail.com";
    cy.login(email, "1235577");

    cy.get(".BuildControl_More__1MY7B:first").click(); // click on more
    cy.get(".BuildControls_OrderButton___M-Du").click(); // click on Order Button
    cy.wait(1000);
    cy.get(".Modal_Modal__1-5dN").contains("Your Order");
    cy.get(
      ".Modal_Modal__1-5dN button.Button_Button__3gFiX.Button_Success__2Rka1"
    ).click(); // click on CONTINUE button
    cy.get(".CheckoutSummary_CheckoutSummary__3PsXi").contains(
      "We hope it tastes well!"
    );

    cy.get(".Button_Button__3gFiX.Button_Success__2Rka1").click(); // click on CONTINUE button
    cy.get(".ContactData_ContactData__20AK_").contains(
      "Enter your Contact Data"
    ); // check if i can see the form

    cy.fillOrderForm(
      `ahmad`,
      "dear jareer",
      "60650",
      "palestine",
      email,
      "Cheapest"
    );

    cy.get(".Burger_Burger__10T8F p").contains(
      "Please start adding ingredients!"
    );
  });

  it("Verify price calculations.", () => {
    cy.login("asd5655@gmail.com", "1235577");

    let price = 4;

    cy.get(".BuildControl_More__1MY7B:first").click(); //  click on more
    cy.get("#price")
      .invoke("text")
      .then((text) => {
        expect(parseInt(text)).to.eq(++price);
      });

    cy.get(".BuildControl_More__1MY7B:first").click(); //  click on more
    cy.get("#price")
      .invoke("text")
      .then((text) => {
        expect(parseInt(text)).to.eq(++price);
      });

    cy.get(".BuildControl_Less__3Ttg8:first").click(); //  click on less
    cy.get("#price")
      .invoke("text")
      .then((text) => {
        expect(parseInt(text)).to.eq(--price);
      });
  });

  it("Verify form validation.", () => {
    const email = "asd5655@gmail.com";
    const randomNmber = Cypress._.random(0, 1e6);

    cy.login(email, "1235577");

    cy.get(".BuildControl_More__1MY7B:first").click(); // click on more
    cy.get(".BuildControls_OrderButton___M-Du").click(); // click on Order Button
    cy.wait(1000);
    cy.get(".Modal_Modal__1-5dN").contains("Your Order");
    cy.get(
      ".Modal_Modal__1-5dN button.Button_Button__3gFiX.Button_Success__2Rka1"
    ).click(); // click on CONTINUE button
    cy.get(".CheckoutSummary_CheckoutSummary__3PsXi").contains(
      "We hope it tastes well!"
    );

    cy.get(".Button_Button__3gFiX.Button_Success__2Rka1").click(); // click on CONTINUE button
    cy.get(".ContactData_ContactData__20AK_").contains(
      "Enter your Contact Data"
    ); // check if i can see the form

    // check if Order button is disabled
    cy.get(orderButton).should("be.disabled");

    /** fill valid data */
    cy.get("#name").type("abed");
    cy.get("#street").type("dear jareer");
    cy.get("#zipCode").type("60650");
    cy.get("#country").type("palestine");
    cy.get("#email").type(email);
    cy.get("#deliveryMethod").select("Cheapest");

    // fill invalid email

    cy.get("#email").clear().type(`ahmad${randomNmber}`);

    // check if Order button is disabled
    cy.get(orderButton).should("be.disabled");

    // fill valid email
    cy.get("#email").clear().type(`ahmad${randomNmber}@gmail.com`);

    // check if Order button is enabled
    cy.get(orderButton).should("not.be.disabled");

    // fill invalid zipCode

    cy.get("#zipCode").clear().type("6065");

    // check if Order button is disabled
    cy.get(orderButton).should("be.disabled");

    // fill valid zipCode
    cy.get("#zipCode").clear().type("60650");

    // check if Order button is enabled
    cy.get(orderButton).should("not.be.disabled");
  });
});