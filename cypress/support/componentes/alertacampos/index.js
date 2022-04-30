
import { localizador } from "./elements"

class alertaErro {


    possuitexto(alertacampo) {
        cy.contains(localizador.error, alertacampo)
            .should('be.visible')
    }

}

export default new alertaErro()