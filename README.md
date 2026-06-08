# Curso Cypress, do Zero à Nuvem

Repositório com os códigos e exercícios realizados durante o curso **Cypress do Zero à Nuvem**, abordando conceitos de testes automatizados, boas práticas de automação e execução de testes em diferentes resoluções de tela.

## Sobre o projeto

Este repositório contém os exercícios e exemplos desenvolvidos durante o curso, com o objetivo de praticar a automação de testes utilizando Cypress, desde os conceitos básicos até a execução dos testes em diferentes ambientes.

## Pré-requisitos

- Cypress instalado na versão 13.12.0
- Visual Studio Code instalado
- Node.js instalado
- Conta criada no GitHub

## Como instalar as dependências

Baixe as ferramentas necessárias:

- Node.js e npm: https://nodejs.org/pt-br/download
- Git: https://git-scm.com/install/windows
- Visual Studio Code: https://code.visualstudio.com/download

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd nome-do-projeto
```

Instale as dependências:

```bash
npm install
```

## Estrutura do projeto

```text
├── cypress
│   ├── e2e
│   ├── fixtures
│   ├── support
│   └── downloads
├── cypress.config.js
├── package.json
└── README.md
```

## Passos para executar os testes

1. Configure o arquivo `cypress.config.js` com as dimensões do viewport desejadas.
2. Adicione os scripts abaixo ao arquivo `package.json`.

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:open:mobile": "cypress open --config viewportWidth=410,viewportHeight=860",
    "test:mobile": "cypress run --config viewportWidth=410,viewportHeight=860",
    "test": "cypress run"
  }
}
```

## Scripts disponíveis

| Comando | Descrição |
|----------|------------|
| npm run cy:open | Abre o Cypress Runner |
| npm run cy:open:mobile | Abre o Cypress simulando um dispositivo mobile |
| npm run test | Executa todos os testes em modo headless |
| npm run test:mobile | Executa os testes em modo headless simulando um dispositivo mobile |

## Tecnologias utilizadas

- Cypress
- JavaScript
- Node.js
- Git
- GitHub

## Autora

**Lara Alves**

- Formada em Sistemas de Informação
- QA com experiência em testes manuais e estudos em automação de testes
- GitHub: https://github.com/laraalvesfreitas
- LinkedIn: https://www.linkedin.com/in/laraalvesfreitas


