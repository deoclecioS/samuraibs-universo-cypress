

import { localizador } from './elements'

class Toast {
    validamensagemtoastAlerta(mensagemesperada) {

        cy.get(localizador.alertaToast, { timeout: 10000 })
            .should('be.visible')
            .find('p')
            .should('have.text', mensagemesperada)
    }
}
export default new Toast()