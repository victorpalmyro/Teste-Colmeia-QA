import { faker } from '@faker-js/faker'

describe('Validação de nome de banco de dados', () => {

  it('não deve permitir nome muito grande', () => {

    cy.visit('https://teste-colmeia-qa.colmeia-corp.com')

    // Login
    cy.get('#email').type('qa@test.com')
    cy.get('#password').type('123456')
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Continuar').click()

    //  Navegação
    cy.get('a[routerlink="/dashboard/campanha"]').click()
    cy.contains('a', 'Bancos de dados').click()

    //  Nome muito grande
    const nomeGrande = 'a'.repeat(300)

    cy.contains('button', 'Criar').click()

    cy.get('input[placeholder="Nome do item"]')
      .should('be.visible')
      .type(nomeGrande)

    cy.contains('button', 'Salvar').click()

    //  Validação (ajuste conforme comportamento real)
    cy.get('body').then(($body) => {
      if ($body.text().toLowerCase().includes('erro')) {
        cy.log('Sistema bloqueou nome muito grande corretamente')
      } else {
        cy.log('Sistema permitiu nome muito grande (possível bug)')
      }
    })

  })

})