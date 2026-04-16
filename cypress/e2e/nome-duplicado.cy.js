import { faker } from '@faker-js/faker'

describe('Validação de nome duplicado', () => {

  it('não deveria permitir criar banco com nome duplicado', () => {

    cy.visit('https://teste-colmeia-qa.colmeia-corp.com')

    //  Login
    cy.get('#email').type('qa@test.com')
    cy.get('#password').type('123456')
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Continuar').click()

    //  Navegação
    cy.get('a[routerlink="/dashboard/campanha"]').click()
    cy.contains('a', 'Bancos de dados').click()

    //  Nome fixo (IMPORTANTE)
    const nomeBanco = 'banco-duplicado-teste'

    //  Primeira criação
    cy.contains('button', 'Criar').click()

    cy.get('input[placeholder="Nome do item"]')
      .should('be.visible')
      .type(nomeBanco)

    cy.contains('button', 'Salvar').click()

    cy.contains(nomeBanco).should('exist')

    // Segunda criação (duplicada)
    cy.contains('button', 'Criar').click()

    cy.get('input[placeholder="Nome do item"]')
      .should('be.visible')
      .type(nomeBanco)

    cy.contains('button', 'Salvar').click()

  })

})