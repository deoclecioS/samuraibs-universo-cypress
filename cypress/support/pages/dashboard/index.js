
import { localizador } from "./elements"
import header from "../../componentes/header"

class dashboardPage {

    constructor() {

        this.header = header
    }

    calendarioVisivel() {

        cy.get(localizador.calendario, { timeout: 5000 }).should('be.visible')
    }

    selecionaDia(dia) {

        const alvoclick = new RegExp('^' + dia + '$', 'g')
        cy.contains(localizador.diafuturo, alvoclick).click({ force: true });

    }

    agendamentoVisivel(custom, hora) {

        cy.contains('div', custom.name)
            .should('be.visible')
            .parent()
            .contains(localizador.horaagenda, hora)
            .should('be.visible')
    }
}

export default new dashboardPage()