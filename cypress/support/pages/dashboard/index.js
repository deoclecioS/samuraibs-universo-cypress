
import { localizador } from "./elements"
import header from "../../componentes/header"

class dashboardPage {

    constructor() {

        this.header = header
    }

    calendarioVisivel() {

        cy.get(localizador.calendario, { timeout: 5000 }).should('be.visible')
    }

    selecionaDia(agendamentoDia) {

        let hoje = new Date()
        let ultimodiames = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)

        if (hoje.getDate() === ultimodiames.getDate()) {

            //Ultimo dia do mes
            cy.get(localizador.botaoProxiMes)
                .should('be.visible')
                .click()

            // verifica troca de mes
            let nomeMes
            switch (agendamentoDia.getMonth()) {
                case 0:
                    nomeMes = 'Janeiro'
                    break;

                case 1:
                    nomeMes = 'Fevereiro'
                    break;

                case 2:
                    nomeMes = 'Março'
                    break;

                case 3:
                    nomeMes = 'Abril'
                    break;
                case 4:
                    nomeMes = 'Maio'
                    break;

                case 5:
                    nomeMes = 'Junho'
                    break;
                case 6:
                    nomeMes = 'Julho'
                    break;
                case 7:
                    nomeMes = 'Agosto'
                    break;

                case 8:
                    nomeMes = 'Setembro'
                    break;

                case 9:
                    nomeMes = 'Outubro'
                    break;
                case 10:
                    nomeMes = 'Novembro'
                    break;

                case 11:
                    nomeMes = 'Dezembro'
                    break;
            }


            cy.contains(localizador.NomeMes, nomeMes)
                .should('be.visible')

        } else {
            cy.log('Não é o ultimo dia do mês')
        }

        cy.log(hoje.toString())
        cy.log(ultimodiames.toString())

        const alvoclick = new RegExp('^' + agendamentoDia.getDate() + '$', 'g')
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