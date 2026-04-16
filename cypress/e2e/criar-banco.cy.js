import { faker } from '@faker-js/faker'


describe('Criação de banco de dados', () => {

  it('deve criar um banco com sucesso', () => {
    cy.visit('https://teste-colmeia-qa.colmeia-corp.com')

    // Login
    cy.get('#email').type('qa@test.com')
    cy.get('#password').type('123456') // ajusta se necessário
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Continuar').click()

    // Navegar até bancos
      cy.get('a[routerlink="/dashboard/campanha"]').click()
      cy.contains('a', 'Bancos de dados').click()

    for (let i = 0; i < 3; i++) {

  // Criar novo banco
  cy.contains('button', 'Criar').click()

  const nomeBanco = faker.company.name() + '-' + i

  cy.log('Criando banco: ' + nomeBanco)

  cy.get('input[placeholder="Nome do item"]')
    .should('be.visible')
    .type(nomeBanco)

  cy.contains('button', 'Salvar').click()

  // Validação
  cy.contains(nomeBanco).should('exist')
}
  })

})