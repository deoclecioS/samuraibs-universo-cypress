

import { localizador } from './elements'

class Toast {
    validamensagemtoastAlerta(mensagemesperada) {

        cy.get(localizador.alertaToast, { timeout: 10000 })
            .should('be.visible')
            .should('have.css', 'opacity', '1', { timeout: 15000 })
            .find('p')
            .should('have.text', mensagemesperada)
    }
}
export default new Toast()