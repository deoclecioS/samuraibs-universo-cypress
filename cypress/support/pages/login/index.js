
import { localizador } from "./elements"
import toast from "../../componentes/alertatoast"

class loginPage {

    constructor() {
        this.toast = toast
    }


    acessarHomepage() {
        cy.visit('/')
    }

    preencherCampos(user) {
        cy.get(localizador.email)
            .clear()
            .type(user.email)
            
        cy.get(localizador.senha)
            .clear()
            .type(user.password)
    }

    clicarEntrar() {
        cy.contains(localizador.botaoacessar).click();
    }

    alertaemailinvalido(textoalertaemail) {
        cy.contains(localizador.alertaemailInvalido, textoalertaemail).should('be.visible')
    }
}

export default new loginPage()