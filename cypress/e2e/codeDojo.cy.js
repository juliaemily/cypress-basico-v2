
// Pré-requisito: O usuário precisa acessar o site https://coffee-cart.app/ 
// Passo a passo:
// Acessar a página inicial com as opções de café. ok
// Clicar com o botão esquerdo do mouse nos cafés para adicionar ao carrinho (Expresso e Expresso Macchiato).
// Clicar no componente de “Total” para abrir a tela “Payment Details”.
// Preencher os dados necessários (Nome e Email).
// Deixar o checkbox de comunicação promocional selecionado.


// Finalizar a compra.

it ('Visita site e seleciona opções de café' , function () {
    cy.visit('https://coffee-cart.app')
    cy.get('[data-cy="Espresso"]').click()
    cy.get('[data-test="checkout"]').should('have.text', 'Total: $10.00')
    cy.get('[data-cy="Espresso-Macchiato"]').click()
    cy.get('[data-test="checkout"]').should('have.text', 'Total: $22.00')
    cy.get('[data-test="checkout"]').click()
    cy.get('#name').type('Teste Automatizado')
    cy.get('#email').type('teste.automatizado@email.com.br')
    cy.get('#promotion').check().should('be.checked')
    cy.get('#submit-payment').click()
    cy.get('.snackbar').should('contain.text', 'Thanks for your purchase. Please check your email for payment.')
    cy.get('[data-test="checkout"]').should('have.text', 'Total: $0.00') 
})
