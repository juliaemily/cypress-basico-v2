describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Michel')
        cy.get('#lastName').type('Augusto')
        cy.get('#email').type('michel.email@email.com')
        cy.get('#phone').type('11999999999')
        cy.get('#open-text-area').type('Teste 123. Teste 123. Teste 123. Teste 123. Teste 123. Teste 123.', {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('verifica se ao adicionar um email inválido uma mensagem de erro é disparada', function() {
        cy.get('#firstName').type('Michel')
        cy.get('#lastName').type('Augusto')
        cy.get('#email').type('michel.email@email,com')
        cy.get('#phone').type('11999999999')
        cy.get('#open-text-area').type('Teste 123. Teste 123. Teste 123. Teste 123. Teste 123. Teste 123.', {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })
    
    it('verifica se é possível adicionar letras no campo de telefone', function() {
        cy.get('#phone')
            .type('asdasdasdas')
            .should('have.value' , '')

    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Michel')
        cy.get('#lastName').type('Augusto')
        cy.get('#email').type('michel.email@email,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste 123. Teste 123. Teste 123. Teste 123. Teste 123. Teste 123.', {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Michel')
        .should('have.value', 'Michel')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Augusto')
        .should('have.value', 'Augusto')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('michel.email@email.com')
        .should('have.value', 'michel.email@email.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('11999999999')
        .should('have.value', '11999999999')
        .clear()
        .should('have.value', '')

        cy.get('#open-text-area')
        .type('Teste 123. Teste 123. Teste 123. Teste 123. Teste 123. Teste 123.', {delay: 0})
        .should('have.value', 'Teste 123. Teste 123. Teste 123. Teste 123. Teste 123. Teste 123.')
        .clear()
        .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it.only('uso do cy.contains()', function() {
        cy.get('#firstName').type('Michel')
        cy.get('#lastName').type('Augusto')
        cy.get('#email').type('michel.email@email.com')
        cy.get('#phone').type('11999999999')
        cy.get('#open-text-area').type('Teste 123. Teste 123. Teste 123. Teste 123. Teste 123. Teste 123.', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })




    

}) 

