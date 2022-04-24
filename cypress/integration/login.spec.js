/// <reference types="cypress"/> 

import dashboardPage from "../support/pages/dashboard";
import loginPage from "../support/pages/login"



describe('pagina de login', () => {


    context('quando o usuário é valido', () => {

        const user = {
            name: "Juvencio",
            email: "juvencio@samuraibs.com.br",
            password: "123456"
        }
        it('deverá realizar autenticação com sucesso', () => {

            loginPage.acessarHomepage()
            loginPage.preencherCampos(user)
            loginPage.clicarEntrar()

            dashboardPage.header.verificaUsuarioAutenticado(user.name)

        });
    });
});