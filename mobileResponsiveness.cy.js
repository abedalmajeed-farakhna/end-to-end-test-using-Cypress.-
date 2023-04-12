const sizes = [
  "iphone-3",
  "iphone-4",
  "iphone-5",
  "iphone-6",
  "iphone-6+",
  "iphone-7",
  "iphone-8",
  "iphone-x",
  "iphone-xr",
  "iphone-se2",
  "samsung-note9",
  "samsung-s10",
];
const url="www.test.com";


describe("mobile Responsiveness", () => {
  it("signUp", () => {
    sizes.forEach((size) => {
      cy.visit(url);
      cy.viewport(size);

      const randomNmber = Cypress._.random(0, 1e6);

      const email = `abed_${randomNmber}@gmail.com`;
      cy.signUp(email, "1235577");
      // logout
      cy.get(".DrawerToggle_DrawerToggle__m405X").click();
      cy.wait(1000);
      cy.get(".NavigationItem_NavigationItem__2SpXc").eq(5).click();
    });
  });

  it("login", () => {
    sizes.forEach((size) => {
      cy.viewport(size);

      cy.login("abed@gmail.com", "abed123");

      // logout
      cy.get(".DrawerToggle_DrawerToggle__m405X").click();
      cy.wait(1000);
      cy.get(".NavigationItem_NavigationItem__2SpXc").eq(5).click(); // 5 because there are 3 items hidden for the large size screen
    });
  });
});
