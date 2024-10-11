// amiibo.cy.js

describe('Amiibo SPA Tests', () => {
  // Run before each test
  beforeEach(() => {
    // Visit the app URL
    cy.visit('http://localhost:8080');
  });

  it('should load and display a list of Amiibos', () => {
    // Check if the main title is displayed
    cy.contains('Amiibo Catalog').should('be.visible');

    // Wait for amiibos to load and ensure the list is not empty
    cy.get('.amiibo-item').should('have.length.greaterThan', 0);
  });

  it('should display details when clicking on "Read More"', () => {
    // Click on the first "Read More" button
    cy.get('.read-more').first().click();

    // Ensure the details view is shown
    cy.get('#detailsView').should('not.have.class', 'hidden');

    // Check if some basic information about the amiibo is displayed
    cy.get('#detailsView h2').should('be.visible');
    cy.get('#detailsView img').should('be.visible');
    cy.contains('Game Series:').should('be.visible');
  });
});