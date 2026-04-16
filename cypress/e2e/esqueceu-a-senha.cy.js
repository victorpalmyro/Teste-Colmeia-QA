describe('Recuperação de senha', () => {

  it('não deve executar ação ao clicar em "Esqueceu sua senha?"', () => {

    cy.visit('https://teste-colmeia-qa.colmeia-corp.com')

    //  Login (não precisa logar, mas mantém padrão dos testes)
    cy.get('#email').should('be.visible')

    // Guarda URL atual
    cy.url().then((urlAntes) => {

      // Ação
      cy.contains('Esqueceu sua senha?')
        .should('be.visible')
        .click()

      // Validação (BUG)
      cy.url().should('eq', urlAntes)

    })

  })

})