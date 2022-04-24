
import { localizador } from "./elements";

class loginPage {

    acessarHomepage() {
        cy.visit('/')
    }

    preencherCampos(user) {
        cy.get(localizador.email).type(user.email)
        cy.get(localizador.senha).type(user.password)
    }

    clicaRealizaLogin() {
        cy.contains(localizador.botaoacessar).click();
    }
}

export default new loginPage()