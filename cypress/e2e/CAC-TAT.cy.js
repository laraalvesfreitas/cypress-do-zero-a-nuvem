describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o Titulo da aplicação', () => {

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    const longtext = Cypress._.repeat('Teste CAC-TAT com cypress.', 10)
    cy.get('#firstName').type('Lara')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('laraalves624@gmail.com')
    cy.get('#open-text-area').type(longtext, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('Lara')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('laraalvesgmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')

  })

  it(' validar que um valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('#phone')
      .type('abcndndjdkd')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Lara')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('laraalves624@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Lara')
      .should('have.value', 'Lara')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Alves')
      .should('have.value', 'Alves')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('laraalves624@gmail.com')
      .should('have.value', 'laraalves624@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('319586965')
      .should('have.value', '319586965')
      .clear()
      .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')


  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    const data = {
      firstName: 'Lara',
      lastName: 'Alves',
      email: 'laraalves624@gmail.com',
      texto: 'Teste'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')


  })

  it('alterar todos os locais onde identificamos o botão para posterior clique', () => {
    cy.get('#firstName').type('Lara')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('laraalves@gmail.com')
    cy.get('#open-text-area').type('Teste')

    cy.contains('button', 'Enviar').click()
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[value="feedback"]').check().should('be.checked')
    cy.get('input[value="elogio"]').check().should('be.checked')
    cy.get('input[value="ajuda"]').check().should('be.checked')

  })

  it('marca cada tipo de atendimento 2 ', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')

    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  Cypress._.times(5, () => {
    it('preenche os campos obrigatórios e envia o formulário', () => {
      cy.clock()
      const longtext = Cypress._.repeat('Teste CAC-TAT com cypress.', 10)
      cy.get('#firstName').type('Lara')
      cy.get('#lastName').type('Alves')
      cy.get('#email').type('laraalves624@gmail.com')
      cy.get('#open-text-area').type(longtext, { delay: 0 })
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })
  })


  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Área de texto preenchida com o comando invoke')
      .should('have.value', 'Área de texto preenchida com o comando invoke')
  })

  it('faz uma requisição HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(response.body).to.include('CAC TAT');
    })
  })

  it('Faz uma requisição HTTP 2', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('Encontre o gato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu ❤️ Gatos')
  })
})