import selectors from './selectors'
describe('Routes are correct', function () {

    before(() => {
        cy.visit('/')
        cy.get(selectors.login.username, {timeout: 8000})

        cy.clearLocalStorage()

        cy.fixture('users').then(function (users) {
            cy.get(selectors.username).type(users[0].username)
            cy.get(selectors.password).type(users[0].password)
            cy.get(selectors.loginBtn).click()
        })
    })

    it('Check some url pages', function () {
        cy.get(selectors.search).click()
        cy.url().should('match', /\/search/)

        cy.get(selectors.realtime).click()
        cy.url().should('match', /\/realtime/)

        cy.get(selectors.target).click()
        cy.url().should('match', /\/gps-hq/)

    })

})