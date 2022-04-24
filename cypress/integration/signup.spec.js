/// <reference types="cypress"/> 

import signuPage from "../support/pages/signup";

describe('Cadastro na plataforma', () => {


    context('que o usuário é um novo cadastro', () => {

        const user = {
            name: 'Juvenal Silva',
            email: 'juvenal@silva.com.br',
            password: '123456'
        }

        before(() => {
            cy.task('removeUser', user.email).then(function (result) {
                console.log(result)
            })
        });
        it('Realiza um cadastro de usuário novo', () => {

            signuPage.acessarpagina()
            signuPage.preencheformulario(user)
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

    context('que um usuário já possui cadastro', () => {
        const user = {
            email: "rita@anselmo.com",
            is_provider: true,
            name: "Rita Anselmo",
            password: "123456"
        }

        before(() => {
            cy.postUser(user)
        });

        it('Não deverá realizar um cadastro de usuário novo', () => {
            signuPage.acessarpagina()
            signuPage.preencheformulario(user)
            signuPage.clicaremcadastrar()
            signuPage.alertatoast.validamensagemtoastAlerta('Email já cadastrado para outro usuário.')
        });

        //cy.wait(2000)
        //cy.get('body') pegar toast alerta
        //delete from public.users where email = 'juvenal@silva.com.br'
    });

    context('quando o email é incorreto', () => {

        const user = {
            email: "manuelaanselmo.com",
            name: "manuel anselmo",
            password: "123456"
        }
        it('deve exibir alerta para email inválido', () => {
            signuPage.acessarpagina()
            signuPage.preencheformulario(user)
            signuPage.clicaremcadastrar()
            signuPage.mensagemalerta('Informe um email válido')
        });
    });

    context('quando senha não possuir 6 caracteres', () => {

        const senhas = ['1', '1a', '1ab']

        beforeEach(function () {
            signuPage.acessarpagina()
        })

        senhas.forEach(senha => {
            it('Deve emitir alerta de senha invalida para: ' + senha, () => {

                const user = {
                    email: "manuela@anselmo.com.br",
                    name: "manuel anselmo",
                    password: senha
                }
                signuPage.preencheformulario(user)
                signuPage.clicaremcadastrar()
            });
        });

        afterEach(function () {
            signuPage.mensagemalerta('Pelo menos 6 caracteres')
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
            it('Deve emitir ' + msgalert.toLowerCase(), function() {

                signuPage.mensagemalerta(msgalert)
            });

        })

    });
});