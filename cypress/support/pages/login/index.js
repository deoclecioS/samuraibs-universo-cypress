
import { localizador } from "./elements"
import toast from "../../componentes/alertatoast"
import alert from "../../componentes/alertacampos"

class loginPage {

    constructor() {
        this.toast = toast
        this.alert = alert
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

}

export default new loginPage()