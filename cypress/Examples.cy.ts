import { AppComponent } from '../src/app/app.component';

describe('Examples.cy.ts', () => {
  it('playground', () => {
    // cy.mount()
  });
});

describe('Product list', () => {
  beforeEach(() => {
    cy.mount(AppComponent);
    cy.visit('/products');
  });

  it('should load and render at least one product in the product list', () => {
    cy.get('.product-list').should('have.length.at.least', 1);
  });

  it('should allow add one product to the shopping cart', () => {
    cy.get('.product-list').first().find('.add-to-cart').click();
    cy.get('.cart-count').should('contain', '1');
  });

  it('should get the product list from the mock service', () => {
    cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as(
      'productsMock'
    );
    cy.visit('/products');
    cy.wait('@productsMock');
    cy.get('.product-list').should('have.length', 2);
  });
});

/*

<div class="product-list">

  <div class="product">
    <span>Nombre del product</span>
    ...
    ...
    ...
    <button class="add-to-cart">Agregar al carrito</button> 
  </div>

</div>

*/
