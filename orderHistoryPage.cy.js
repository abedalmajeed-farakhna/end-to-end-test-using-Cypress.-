const email = "asd5655@gmail.com";
const password = "1235577";

("login Test", () => {
  beforeEach(() => {
    cy.login(email, password);
  });

  it("Verify the list of orders.", () => {
    cy.get(".BuildControl_More__1MY7B:first").click(); // click on more
    cy.get(".BuildControls_OrderButton___M-Du").click(); // click on Order Button
    cy.wait(1000);
    cy.get(".Modal_Modal__1-5dN").contains("Your Order");
    cy.get(
      ".Modal_Modal__1-5dN button.Button_Button__3gFiX.Button_Success__2Rka1"
    ).click(); // click on confirm button
    cy.get(".CheckoutSummary_CheckoutSummary__3PsXi").contains(
      "We hope it tastes well!"
    );
    cy.get(".Button_Button__3gFiX.Button_Success__2Rka1").click(); // click on Confirm

    cy.fillOrderForm(
      "ahmad",
      "mdescribeain street",
      "00000",
      "ramallah",
      email,
      "Cheapest"
    );

    cy.get("nav li").eq(1).click(); // click on Orders
    cy.get(".Order_Order__3kYZJ").eq(0).contains("Ingredients: "); //  check if at least exsit one order
  });

  it("Verify the empty list behavior.", () => {
    cy.login("asd55@gmail.com", "1235577");
    cy.get("nav li").eq(1).click(); // click on Orders
    cy.wait(1000);
    cy.get(".Order_Order__3kYZJ").should("not.exist"); //  check if orders embty
  });

  it("Verify the long list behavior.", () => {
    cy.get("nav li").eq(1).click(); // click on Orders
    cy.wait(1000);
    //cy.get(".Order_Order__3kYZJ:last-child").should('not.visible'); //
    cy.get(".Order_Order__3kYZJ:last-child")
      .scrollIntoView()
      .should("be.visible");
  });
});
