/// <reference types="cypress"/> 

import signuPage from "../support/pages/signup";

describe('Cadastro na plataforma barbeiro de sevilha', () => {

    before(function () {
        cy.fixture('signup').then(function (signup) {

            this.sucess = signup.sucess
            this.email_duplicado = signup.email_duplicado
            this.email_incorreto = signup.email_incorreto
            this.senha_curta = signup.senha_curta
        })
    });

    context('que o usuário é um novo cadastro', function () {

        before(function () {
            cy.task('removeUser', this.sucess.email).then(function (result) {
                console.log(result)
            })
        });
        it('Realiza um cadastro de usuário novo', function () {

            signuPage.acessarpagina()
            signuPage.preencheformulario(this.sucess)
            signuPage.clicaremcadastrar()
            signuPage.alertatoast.validamensagemtoastAlerta('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        });
        //cy.get('.toast').should('be.visible')
        //    .find('p')
        //    .should('have.text', 'Email já cadastrado para outro usuário.')
        //cy.wait(2000)
        //cy.get('body') pegar toast alerta
        //delete from public.users where email = 'juvenal@silva.com.br'
    });

    context('que um usuário já possui cadastro', function () {

        before(function () {
            cy.postUser(this.email_duplicado)
        });

        it('Não deverá realizar um cadastro de usuário novo', function () {
            signuPage.acessarpagina()
            signuPage.preencheformulario(this.email_duplicado)
            signuPage.clicaremcadastrar()
            signuPage.alertatoast.validamensagemtoastAlerta('Email já cadastrado para outro usuário.')
        });

        //cy.wait(2000)
        //cy.get('body') pegar toast alerta
        //delete from public.users where email = 'juvenal@silva.com.br'
    });

    context('quando o email é incorreto', function () {

        it('deve exibir alerta para email inválido', function () {
            signuPage.acessarpagina()
            signuPage.preencheformulario(this.email_incorreto)
            signuPage.clicaremcadastrar()
            signuPage.alerta.possuitexto('Informe um email válido')
        });
    });

    context('quando senha não possuir no minímo 6 caracteres', function () {

        const passwords = ['1', '1a', '1ab', '1abc', '1abcd']

        before(() => {
            signuPage.acessarpagina()
        });

        passwords.forEach(function (senha) {
            it('Deve emitir alerta de senha invalida para: ' + senha, function () {

                this.senha_curta.password = senha

                signuPage.preencheformulario(this.senha_curta)
                signuPage.clicaremcadastrar()
            })
        })

        afterEach(function () {
            signuPage.alerta.possuitexto('Pelo menos 6 caracteres')
        })
    });

    context('campos obrigatórios não preenchidos', () => {


        const mensagensalerta = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signuPage.acessarpagina()
            signuPage.clicaremcadastrar()
        })

        mensagensalerta.forEach(function (msgalert) {
            it('Deve emitir ' + msgalert.toLowerCase(), function () {

                signuPage.alerta.possuitexto(msgalert)
            });

        })

    });
});