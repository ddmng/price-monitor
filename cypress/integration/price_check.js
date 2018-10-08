/// <reference types="Cypress" />

import * as selectors from '../support/selectors'

describe('Check prices', () => {
    let fixtures = [];

    before(() => {
        // TODO load from firebase
        cy.fixture('links.json').then(f => fixtures = f)
    })

    it('should take price for the item', () => {

        fixtures.forEach((element, i) => {
            cy.visit('' + element.url)
            
            cy.get(selectors.itemPage.originalPrice).should((t) => {
                fixtures[i].originalPrice = t && t.text()
            })            

            cy.get(selectors.itemPage.discountedPrice).should((t) => {
                fixtures[i].discountedPrice = t && t.text()
            })
        });
    })

    after(() => {
        // TODO push to firebase
        cy.log('Prices: ', fixtures)
        console.log(fixtures)
    })

})

