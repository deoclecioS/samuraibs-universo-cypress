/// <reference types="cypress"/>

import esqueciSenha from "../support/pages/esquecisenha"
import recuperaSenha from "../support/pages/recuperasenha"

describe('Recuperar senha', () => {


    before(function () {
        cy.fixture('recuperar').then(function (recuperar) {
            this.data = recuperar

        })
    })

    context('Quando usuario esquece senha', function () {

        before(function () {
            cy.postUser(this.data)
        })
        it('Deve ser enviado email para recuperar a senha', function () {

            esqueciSenha.visitarpagina()
            esqueciSenha.formularioemail(this.data.email)
            esqueciSenha.clicarecupera()

            const msgenviada = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            esqueciSenha.alertatoast.validamensagemtoastAlerta(msgenviada)
        })
    })


    context('Quando usuário solicita a troca de senha', function () {

        before(function () {
            cy.postUser(this.data)
            cy.recuperaPass(this.data.email)
        });
        it('deverá poder cadastrar uma nova senha', function () {

            const token = Cypress.env('tokenRecuperado')

            recuperaSenha.visitapagina(token)
            recuperaSenha.formsenhas('pwd1234' , 'pwd1234')
            recuperaSenha.clickalteraSenha()

            const msgsenharecupera = 'Agora você já pode logar com a sua nova senha secreta.'
            recuperaSenha.alertatoast.validamensagemtoastAlerta(msgsenharecupera)

        })
    })
})