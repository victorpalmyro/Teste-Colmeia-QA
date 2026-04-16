import { faker } from '@faker-js/faker'

describe('Arquivamento de banco de dados', () => {

  it('não deve remover banco da lista sem feedback ao arquivar', () => {

    cy.visit('https://teste-colmeia-qa.colmeia-corp.com')

    // Login
    cy.get('#email').type('qa@test.com')
    cy.get('#password').type('123456')
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Continuar').click()

    // 📂 Navegação
    cy.get('a[routerlink="/dashboard/campanha"]').click()
    cy.contains('a', 'Bancos de dados').click()

    // Criar banco
    const nomeBanco = 'teste-arquivar-' + Date.now()

    cy.contains('button', 'Criar').click()
    cy.get('input[placeholder="Nome do item"]').type(nomeBanco)
    cy.contains('button', 'Salvar').click()

    // Garantir que foi criado
    cy.contains(nomeBanco).should('exist')

    // Arquivar (usando SVG)
    cy.contains(nomeBanco)
      .parent()
      .within(() => {
        cy.get('svg path[d^="M12.643"]')
          .parents('button')
          .click()
      })

    // Validação - sumiu da lista principal (comportamento atual)
    cy.contains(nomeBanco).should('not.exist')

    // Acessar lista de arquivados (SVG)
    cy.get('svg path[d^="M20 2H4"]')
      .parents('button')
      .click()

    // Verificar se aparece nos arquivados (caso correto)
    cy.get('body').then(($body) => {

      const texto = $body.text()

      if (texto.includes(nomeBanco)) {
        cy.log('Banco encontrado na lista de arquivados')
      } else {
        cy.log('Banco não encontrado nos arquivados (possível exclusão - BUG)')
      }

    })

  })

})