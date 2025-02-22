import dados from '../dados/dados.json' //para importar o arquivo com os dados válidos de acesso

describe('Testes na tela de login da Youk', () => {

  beforeEach(() => {
    cy.visit('/') //a URL de acesso foi informada no arquivo "cypress.config.js"
    cy.get('.title').should('have.text', 'FAÇA LOGIN NA SUA CONTA')
  })

  it('Botão ENTRAR não pode habilitar sem email e senha', () => {
    cy.contains('button', 'ENTRAR').should('have.attr', 'disabled')
  })

  it('Botão ENTRAR só pode habilitar com email e senha preenchidos', () => {
    //Testando só com o email preenchido onde o botão ENTRAR ficará desabilitado
    cy.get('input[formcontrolname="email"]').type(dados.usuarios.email) //dados válidos de acesso foram colocados no arquivo "dados.json"
    cy.contains('button', 'ENTRAR').should('have.attr', 'disabled')
    //Testando só com a senha preenchida onde o botão ENTRAR ficará desabilitado
    cy.get('input[formcontrolname="email"]').clear()
    cy.get('input[formcontrolname="password"]').type(dados.usuarios.senha) //dados válidos de acesso foram colocados no arquivo "dados.json"
    cy.contains('button', 'ENTRAR').should('have.attr', 'disabled')
    //Testando tanto com email e senha preenchidos onde o botão ENTRAR ficará habilitado
    cy.get('input[formcontrolname="email"]').type(dados.usuarios.email) //dados válidos de acesso foram colocados no arquivo "dados.json"
    cy.contains('button', 'ENTRAR').should('not.have.attr', 'disabled')
  })

  it('Obrigatoriedade dos campos email e senha após clicar em tab', () => {
    cy.get('input[formcontrolname="email"]').click()
    cy.get('input[formcontrolname="password"]').focus()
    cy.get('input[formcontrolname="email"]').focus()
    cy.contains('#mat-error-1', 'E-mail é obrigatório').should('be.visible')
      .and('have.css', 'color', 'rgb(244, 67, 54)')
    cy.contains('#mat-error-0', 'Senha requerida').should('be.visible')
      .and('have.css', 'color', 'rgb(244, 67, 54)')
  })

  it('Tentativa de login com email que não está na base', () => {
    cy.get('input[formcontrolname="email"]').type('email1234@provedor.com.br')
    cy.get('input[formcontrolname="password"]').type(dados.usuarios.senha) //dados válidos de acesso foram colocados no arquivo "dados.json"
    cy.contains('button', 'ENTRAR').click()
    cy.contains('div', 'Tente Novamente').should('be.visible')
    //cy.contains('div', 'Muitas tentativas de login sem êxito.').should('be.visible')
  })

  it('Tentativa de login com email fora do padrão', () => {
    cy.get('input[formcontrolname="email"]').type('email1234provedor.com.br')
    cy.get('input[formcontrolname="password"]').type(dados.usuarios.senha) //dados válidos de acesso foram colocados no arquivo "dados.json"
    cy.contains('#mat-error-2', 'insira um endereço de e-mail válido').should('be.visible')
      .and('have.css', 'color', 'rgb(244, 67, 54)')
  })

  it('Tentativa de login com senha não cadastrada', () => {
    cy.get('input[formcontrolname="email"]').type(dados.usuarios.email) //dados válidos de acesso foram colocados no arquivo "dados.json"
    cy.get('input[formcontrolname="password"]').type('123456')
    cy.contains('button', 'ENTRAR').click()
    cy.contains('div', 'Tente Novamente').should('be.visible')
  })

  it('Login com dados válidos', () => {
    cy.get('input[formcontrolname="email"]').type(dados.usuarios.email) //dados válidos de acesso foram colocados no arquivo "dados.json"
    cy.get('input[formcontrolname="password"]').type(dados.usuarios.senha) //dados válidos de acesso foram colocados no arquivo "dados.json"
    cy.contains('button', 'ENTRAR').click()
    cy.wait(4000) // Tempo necessário devido a animação que ocorre na tela
    cy.contains('h2', 'Transmitir Recibos').should('be.visible')
    cy.logoff() //criei uma função de logoff para permitir rodar esses testes mais de uma vez
  })

  it('Testando a opção Esqueceu a senha?', () => {
    cy.get('.forgot-password').click()
    cy.get('.title').should('have.text', 'RECUPERAR SUA SENHA')
  })
})