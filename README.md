### Informações sobre o projeto

Esse projeto é o bônus para a segunda fase do processo seletivo para Qualidade de Software da **DirectOn Tecnologia**.

**Nesse projeto, foram feitos os seguintes testes:**

- Botão ENTRAR não pode habilitar sem email e senha;
- Botão ENTRAR só pode habilitar com email e senha preenchidos;
- Obrigatoriedade dos campos email e senha após clicar em tab;
- Tentativa de login com email que não está na base;
- Tentativa de login com email fora do padrão;
- Tentativa de login com senha não cadastrada;
- Login com dados válidos;
- Testando a opção Esqueceu a senha.

**Versões necessárias:**

- Node.js: 22.13.1 (ou superior);
- Npm: 10.9.2 (ou superior);
- Cypress: 10.9.2 (ou superior).

**Estrutura desse projeto:**

**- DIRECTON > .github > workflows > main.yml** = este arquivo define um workflow do GitHub Actions que automatiza a execução de testes end-to-end (E2E) utilizando o Cypress. O objetivo principal é garantir que as funcionalidades do projeto sejam validadas automaticamente em um ambiente controlado sempre que houver alterações no código.

***Observação:*** nem todos os testes seriam indicados entrar para um workflow. Indicaria colocar apenas os testes de maior e de moderada frequência de execução, como por exemplo: **"Tentativa de login com email que não está na base"**, **"Tentativa de login com email fora do padrão"**, **"Tentativa de login com senha não cadastrada"** e **"Login com dados válidos"**, definindo um "Smoke Test" (*). Os demais testes seriam realizados isoladamente (e de forma automática) quando houvesse ajuste em seus componentes ou comportamentos.

**- DIRECTON > cypress > dados > dados.json** = contém as **credenciais válidas de usuários** que são utilizadas nos testes automatizados. Nesse projeto, ele armazena dados de login (e-mail e senha) necessários para autenticar usuários durante a execução dos testes.

***Observação:*** para garantir segurança das informações (como credenciais de usuário), é recomendável armazenar esses dados em um arquivo separado e adicioná-lo ao ".gitignore", evitando que dados sensíveis sejam comitados em repositórios públicos.

***Atenção!!!*** Nesse projeto, como as credenciais são de uma base teste, optei por não colocar o arquivo "dados.json" no ".gitignore".

**- DIRECTON > cypress > e2e > login.cy.js** = contém os testes automatizados para a tela de login da aplicação Youk utilizando o Cypress.

***Observação:*** nesse arquivo, os dados de acesso (email e senha) são importados de um arquivo externo (dados.json) para garantir reutilização e segurança.

**- DIRECTON > cypress > support > e2e.js** = define um comando personalizado no Cypress chamado logoff, que realiza o logout da aplicação. Esse comando é reutilizável e simplifica a execução de testes que exigem sair do sistema após determinadas ações.

***Observação:*** a função logoff foi criada como um comando personalizado do Cypress e colocada fora do arquivo principal de testes porque, embora não faça parte do escopo principal dos testes, é essencial para garantir que cada teste comece em um estado limpo, já que, pelo que percebi, as credenciais da aplicação não expiram.

**Os demais arquivos são referentes a estrutura do Cypress, mas destaco:**

**- cypress.config.js** = nesse arquivo, coloquei três parâmetros:

1 - **"screenshotOnRunFailure: false"**: desabilita a captura de screenshots quando um teste falha;
2 - **"video: false"**: desabilita a gravação de vídeos durante a execução dos testes;
3 - **"baseUrl: 'https://youk-test.web.app'**: define a URL base para os testes simplificando a escrita de cy.visit() e facilita a manutenção, especialmente em projetos com URLs bem definidas.

***Atenção!*** Para gerar os sreenshots (em caso de teste falho) e os vídeos, ajuste a propriedade "false" para "true" nos respectivos parâmetros ou copie do código abaixo (para gerar os dois elementos).


```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    screenshotOnRunFailure: true,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://youk-test.web.app'
  },
});
```

**- package.json** = defini comandos personalizados que podem ser executados via terminal (usando o npm). Esses comandos automatizam tarefas comuns no desenvolvimento de projetos como rodar testes (como nesse caso).

Gerei dois scripts:

1 - **"open": "cypress open"**: abre a interface gráfica do Cypress (Test Runner) para executar e os testes de forma visual durante o desenvolvimento.
2 - **"test": "cypress run"**: executa os testes no modo headless (sem interface gráfica) e permite rodar os testes em ambientes de CI/CD.

Para criar scripts com a mesma funcionalidade, copie o código abaixo:


  ```json
  "scripts": {
    "open": "cypress open",
    "test": "cypress run"
  },
  ```

**Como rodar os testes realizados nesse projeto:**

Através dos comandos abaixo no próprio terminal (na pasta do projeto):

**Para abrir a interface gráfica do Cypress:**
- npx cypress open
- npm run open

**Para abrir em modo headless:**
- npx cypress run
- npm run test

***Atenção!*** Os testes poderão ser executados pelas opções apresentadas em **"NPM SCRIPTS"** (criadas pelas definições dos scripts no arquivo "package.json").

(*) **Smoke Test (ou "Teste de Fumaça"):** teste rápido que verifica se as funcionalidades básicas de um sistema estão funcionando corretamente após uma nova build ou deploy com o objetivo de detectar problemas críticos que impeçam o sistema de funcionar de forma mínima, antes de realizar testes mais detalhados e abrangentes.