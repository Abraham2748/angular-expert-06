import { AppComponent } from '../src/app/app.component';

describe('AppComponent.cy.ts', () => {
  it('should render title', () => {
    cy.mount(AppComponent);
    cy.get('h1').should('contain', 'Hello, angular-expert-06');
  });
});
