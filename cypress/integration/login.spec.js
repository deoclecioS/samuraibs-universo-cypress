/// <reference types="cypress"/> 


import dashboardPage from "../support/pages/dashboard";
import loginPage from "../support/pages/login"



describe('pagina de login', () => {


    context('quando o usuário é valido', () => {

        const user = {
            name: "Juvencio Souza",
            is_provider: true,
            email: "juvencio@samuraibs.com.br",
            password: "123456"
        }

        before(() => {
            cy.postUser(user)
        });
        it('deverá realizar autenticação com sucesso', () => {

            loginPage.acessarHomepage()
            loginPage.preencherCampos(user)
            loginPage.clicarEntrar()

            dashboardPage.header.verificaUsuarioAutenticado(user.name)

        });
    });

    context('Quando usuário valido e a senha é inválida', () => {

        let user = {
            name: "Marquinho Relampago",
            is_provider: true,
            email: "relampago@samuraibs.com.br",
            password: "senha123"
        }

        before(() => {
            cy.postUser(user).then(function () {
                user.password = '1234556'
            })
        });
        it('deverá apresentar mensagem de senha inválida', () => {

            loginPage.acessarHomepage()
            loginPage.preencherCampos(user)
            loginPage.clicarEntrar()
            loginPage.toast.validamensagemtoastAlerta('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        });
    });

    context('Quando email é inválido', () => {

        const emails = [
            'email.com.br',
            'email@',
            'emailincorreto.com',
            'textoqualquer',
            '!@#$%%!@#%$',
            '123145646',
            '@outlook.com.br',
            'xpto!@#123'
        ]

        before(() => {
            loginPage.acessarHomepage()
        });

        emails.forEach(function (email) {
            it('deverá apresentar mensagem de o email inválido para: ' + email, () => {
                const user = { email: email, password: '123456' }

                loginPage.preencherCampos(user)
                loginPage.clicarEntrar()
                loginPage.alert.possuitexto('Informe um email válido')
            });
        })
    });


    context('campos obrigatórios não preenchidos', () => {


        const mensagensalerta = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            loginPage.acessarHomepage()
            loginPage.clicarEntrar()
        })

        mensagensalerta.forEach(function (msgalert) {
            it('Deve emitir ' + msgalert.toLowerCase(), function() {

                loginPage.alert.possuitexto(msgalert)
            });
        })
    });
});