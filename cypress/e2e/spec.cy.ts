describe('Dragtest', () => {
  it('should dragndrop', () => {
    const space: number = 32;
    const arrowRight: number = 39;
    cy.visit('http://localhost:2010/')
    cy.get('[data-hook="grid-list-data"]').find('div[role="button"]').eq(1) 
    .focus()
      .trigger('keydown', { keyCode: space })
      .trigger('keydown', { keyCode: arrowRight, force: true }) 
      .wait(1000)
      .trigger('keydown', { keyCode: space, force: true });
  })
  it('should check index after drag and drop', () => {
    const space: number = 32;
    const arrowRight: number = 39;
    cy.visit('http://localhost:2010/')
    cy.get('[data-hook="grid-list-data"]').find('div[role="button"]').eq(1).should("contain", "Name") 
    .focus()
      .trigger('keydown', { keyCode: space })
      .trigger('keydown', { keyCode: arrowRight, force: true }) 
      .wait(1000)
      .trigger('keydown', { keyCode: space, force: true });
    cy.get('[data-hook="grid-list-data"]').find('div[role="button"]').eq(1).should("contain", "Position")
  })
})