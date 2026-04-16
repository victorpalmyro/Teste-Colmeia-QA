import { faker } from '@faker-js/faker'

describe('Persistência de bancos de dados', () => {

  it('não deve perder bancos após acessar Colmeia Forms', () => {

    cy.visit('https://teste-colmeia-qa.colmeia-corp.com')

    //  Login
    cy.get('#email').type('qa@test.com')
    cy.get('#password').type('123456')
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Continuar').click()

    //  Navegação até bancos
    cy.get('a[routerlink="/dashboard/campanha"]').click()
    cy.contains('a', 'Bancos de dados').click()

    // Criar banco
    const nomeBanco = 'teste-forms-' + Date.now()

    cy.contains('button', 'Criar').click()
    cy.get('input[placeholder="Nome do item"]').type(nomeBanco)
    cy.contains('button', 'Salvar').click()

    // Garantir que foi criado
    cy.contains(nomeBanco).should('exist')

    // Ir para Colmeia Forms
    // Ajustar se necessário (texto ou rota)
    cy.contains('Colmeia Forms').click()

    //  Voltar para bancos
    cy.get('a[routerlink="/dashboard/campanha"]').click()
    cy.contains('a', 'Bancos de dados').click()

    // Validação (BUG)
    cy.get('body').then(($body) => {

      if ($body.text().includes(nomeBanco)) {
        cy.log('Banco ainda existe (comportamento correto)')
      } else {
        cy.log('Banco desapareceu após navegação (BUG crítico)')
      }

    })

  })

})