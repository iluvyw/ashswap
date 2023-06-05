describe('add-your-favored-flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('add-your-favored-successful', () => {
    cy.get('[data-cy=search-btn]').click();
    cy.get('[data-cy=recent-search]').should('have.text', 'Recent Search');
    cy.wait(1000);
    cy.get('[data-cy=add-btn-1]').click();
    cy.wait(500);
  });
});

describe('remove-your-favored-flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('add-your-favored-successful', () => {
    cy.get('[data-cy=search-btn]').click();
    cy.get('[data-cy=recent-search]').should('have.text', 'Recent Search');
    cy.wait(1000);
    cy.get('[data-cy=remove-btn-1]').click();
    cy.wait(500);
  });
});

describe('setting-flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('full-setting-flow', () => {
    cy.get('[data-cy=setting-btn]').click();
    cy.get('[data-cy=setting-text]').should('have.text', 'Settings');
    cy.wait(500);
    cy.get('[data-cy=setting-tab-dark]').click();
    cy.wait(500);
    cy.get('[data-cy=setting-tab-system]').click();
    cy.wait(500);
    cy.get('[data-cy=setting-tab-light]').click();
    cy.wait(500);
    cy.get('[data-cy=language-btn]').click();
    cy.get('[data-cy=language-text]').should('have.text', 'Languages');
    cy.wait(500);
  });
});

describe('arrange-the-information-flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('hide-information', () => {
    cy.get('[data-cy=more-btn]').click();
    cy.wait(500);
    cy.get('[data-cy=hide-eye-1]').click();
    cy.wait(500);
    cy.get('[data-cy=hide-eye-2]').click();
    cy.wait(500);
    cy.get('[data-cy=hide-eye-4]').click();
    cy.wait(500);
    cy.get('[data-cy=hide-eye-6]').click();
    cy.wait(500);
    cy.get('[data-cy=show-eye-1]').click();
    cy.wait(500);
    cy.get('[data-cy=show-eye-2]').click();
    cy.wait(500);
    cy.get('[data-cy=show-eye-4]').click();
    cy.wait(500);
    cy.get('[data-cy=show-eye-6]').click();
    cy.wait(500);
  });
});

describe('create-order-flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('create-buy-order-flow', () => {
    const rate = 0.0002; // 1 BNB = 0.00035 EGLD

    cy.get("[name='price']").type(0.234);
    cy.wait(500);
    cy.get("[name='spend']").type(2);
    cy.wait(500);
    cy.get("[name='buy']").should('have.value', 2 / rate);
    cy.wait(500);
    cy.get('[data-cy=submit-order-btn]').click();
    cy.wait(500);
  });

  it('create-sell-order-flow', () => {
    const rate = 0.0002; // 1 BNB = 0.00035 EGLD
    cy.get('[data-cy=sell-btn]').click();
    cy.wait(500);
    cy.get("[name='price']").type(0.234);
    cy.wait(500);
    cy.get("[name='spend']").type(200000);
    cy.wait(500);
    cy.get("[name='buy']").should('have.value', 200000 * rate);
    cy.wait(500);
    cy.get('[data-cy=submit-order-btn]').click();
    cy.wait(500);
  });

  it('delete-order-flow', () => {
    const rate = 0.0002; // 1 BNB = 0.00035 EGLD
    cy.get("[name='price']").type(0.234);
    cy.wait(500);
    cy.get("[name='spend']").type(2);
    cy.wait(500);
    cy.get("[name='buy']").should('have.value', 2 / rate);
    cy.wait(500);
    cy.get('[data-cy=submit-order-btn]').click();
    cy.wait(1000);
    cy.get('[data-cy=sell-btn]').click();
    cy.wait(500);
    cy.get("[name='price']").type(0.234);
    cy.wait(500);
    cy.get("[name='spend']").type(200000);
    cy.wait(500);
    cy.get("[name='buy']").should('have.value', 200000 * rate);
    cy.wait(500);
    cy.get('[data-cy=submit-order-btn]').click();
    cy.wait(500);
    cy.get('[data-cy=submit-order-btn]').click();
    cy.wait(500);
    cy.get('[data-cy=submit-order-btn]').click();
    cy.wait(1000);
    cy.get('[data-cy=delete-order-btn-2]').click();
    cy.wait(500);
    cy.get('[data-cy=yes-delete-btn]').click();
    cy.wait(500);
    cy.get('[data-cy=delete-order-btn-1]').click();
    cy.wait(500);
    cy.get('[data-cy=yes-delete-btn]').click();
    cy.wait(500);
  });
});
