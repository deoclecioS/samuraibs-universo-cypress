
import { localizador } from "./elements"

class Header {

    verificaUsuarioAutenticado(username) {
        cy.get(localizador.localnomeUsuario, { timeout: 10000 })
            .should('be.visible')
            .should('have.text', username)
    }
}

export default new Header()