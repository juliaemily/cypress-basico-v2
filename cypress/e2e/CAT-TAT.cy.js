//// <reference types= "Cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


  it('Preenche os campos obrigatórios e envia o formulário', function () {
    const longText = 'Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste'
    cy.get('#firstName').type('Júlia')
    cy.get('#lastName').type('Emily')
    cy.get('#email').type('juliaemilydca@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Júlia')
    cy.get('#lastName').type('Emily')
    cy.get('#email').type('juliaemilydca@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com valor não numérico', function () {
    cy.get('#phone')
    .type('abcdefghijk')
    .should('have.value' , '')
  })

  it('Exibe mensagem de erro quando o telefone é obrigatório mas não é preenchido', function () {
    cy.get('#firstName').type('Júlia')
    cy.get('#lastName').type('Emily')
    cy.get('#email').type('juliaemilydca@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  
  it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
    .type('Júlia')
    .should('have.value', 'Júlia')
    .clear().should('have.value' , '')
    cy.get('#lastName')
    .type('Emily')
    .should('have.value', 'Emily')
    .clear().should('have.value' , '')
    cy.get('#email')
    .type('juliaemilydca@gmail.com')
    .should('have.value', 'juliaemilydca@gmail.com')
    .clear().should('have.value' , '')
    cy.get('#phone')
    .type('1234567890')
    .should('have.value', '1234567890')
    .clear().should('have.value' , '')
  })

  it('Erro ao submeter o formulário sem os campos obrigatórios', function () {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Seleciona um arquivo da pasta fixtures' , function() {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    //console.log($input) // para verificar no log as informações que precisamos do arquivo para usar nas linhas abaixo
    .should(function($input){
      expect($input[0].files[0].name).to.equal("example.json")
    })
  })

  it("Seleciona um arquivo simulando drag and drop" , function () {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    //console.log($input) // para verificar no log as informações que precisamos do arquivo para usar nas linhas abaixo
    .should(function($input){
      expect($input[0].files[0].name).to.equal("example.json")
  })
})

  it("Seleciona um arquivo utilizando uma fixture a qual foi dada um alias", function (){
    cy.fixture('example.json').as('sampleFile') //as cria um alias (como)
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function($input){
      expect($input[0].files[0].name).to.equal("example.json")
  })
  })

    it("Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique", function (){
      cy.get('#privacy a').should('have.attr', 'target', '_blank') //pega o ancora no get, e verifica se existe um atributo target 
    })
  
    it.only("acessa a pagina de politica de privacidade removendo o target e entao clicando no link", function (){
      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
    })

})

