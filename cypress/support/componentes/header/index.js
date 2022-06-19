
import { localizador } from "./elements"

class Header {

    verificaUsuarioAutenticado(username) {
        cy.get(localizador.localnomeUsuario)
            .should('be.visible')
            .should('have.text', username)
    }
}

export default new Header()