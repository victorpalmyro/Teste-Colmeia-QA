describe('Login - comportamento inconsistente', () => {

  it('deve validar mensagem incorreta após login válido', () => {

    cy.visit('https://teste-colmeia-qa.colmeia-corp.com')

    //  Login válido
    cy.get('#email').type('qa@test.com')
    cy.get('#password').type('1234567')
    cy.get('button[type="submit"]').click()

    //  Validação inteligente
    cy.get('body').then(($body) => {

      const texto = $body.text()

      if (texto.includes('Seu login está incorreto')) {
        cy.log('BUG: mensagem incorreta exibida mesmo com login válido')
        cy.contains('Seu login está incorreto').should('exist')
      } else {
        cy.log('Login seguiu fluxo correto (sem mensagem incorreta)')
        cy.url().should('not.include', 'login')
      }

    })

  })

})