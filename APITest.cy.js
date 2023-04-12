const email = "asd5655@gmail.com";
const password = "1235577";

describe("API Test", () => {
  const randomNmber = Cypress._.random(0, 1e6);
  const email = `abed.Farakhna${randomNmber}@gmail.com`;
  it("Verify that the API endpoints are returning the expected responses -signup 200 .", () => {
    // signup
    cy.request({
      method: "POST",
      url: "api/signup", // baseUrl is prepend to URL
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        email: email,
        password: "1235577",
        returnSecureToken: true,
      },
    }).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(200); // true
    });
  });

  it("Verify that the API endpoints are returning the expected responses -signup  400 .", () => {
    cy.request({
      method: "POST",
      url: "api/signup", // baseUrl is prepend to URL
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        email: "abed@gmail.com ",
        password: "abed123",
        returnSecureToken: true,
      },
      failOnStatusCode: false,
    }).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(400); // true
    });
  });

  it("Verify that the API endpoints are returning the expected responses -login  200 .", () => {
    const email = "asd5655@gmail.com";
    cy.request({
      method: "POST",
      url: "api/login", // baseUrl is prepend to URL
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        email: email,
        password: "1235577",
        returnSecureToken: true,
      },
      failOnStatusCode: false,
    }).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(200); // true
      expect(response.body.registered).to.eq(true); // true
      expect(response.body.email).to.eq(email); // true
    });
  });
});



var aa = new Date(date1).getDay- new Date(date2)