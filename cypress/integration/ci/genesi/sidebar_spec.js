/// <reference types="Cypress" />

import selectors from '../../../support/selectors'

/* TODO:
 
 * open/close sidebar
 * number of targets in realtime
 * open/close realtime panel
 * open deferred on target click
 * open deferred at click on target from closed sidebar
 * realtime GPS target icon
 * HQ realtime target icon
 * play HQ audio
 */


describe('Sidebar', function () {

    before('Login', function () {
        cy.visit('/')
        cy.get(selectors.login.username, {
            timeout: 8000
        })

        cy.fixture('users').then(function (users) {
            cy.get(selectors.login.username).type(users[0].username)
            cy.get(selectors.login.password).type(users[0].password)
            cy.get(selectors.login.loginBtn).click()
        })
    })


    beforeEach('Restore local storage', () => {
        cy.restoreLocalStorage();
    })

    afterEach(() => {
        cy.saveLocalStorage();
    });


    it('should filter target list', () => {
        cy.get(selectors.sidebar.q).clear().type('1')
        cy.get(selectors.sidebar.targetList).contains('target1')
        cy.get(selectors.sidebar.targetList).contains('group1')
        cy.get(selectors.sidebar.targetList).find(selectors.sidebar.rows).should('have.length', 2)

        cy.get(selectors.sidebar.q).clear().type('2')
        cy.get(selectors.sidebar.targetList).contains('target2')
        cy.get(selectors.sidebar.targetList).contains('group2')
        cy.get(selectors.sidebar.targetList).find(selectors.sidebar.rows).should('have.length', 2)

        cy.get(selectors.sidebar.q).clear()
        cy.get(selectors.sidebar.targetList).find(selectors.sidebar.rows).should('have.length', 7)

    })


    it('click on icon that close and minimize the sidebar and select a target at the same time', () => {
        cy.get(selectors.sidebar.minimizer).click()
        cy.get('body').should('have.class', 'sidebar-minimized')
        // TODO: mettere expect
    })

})