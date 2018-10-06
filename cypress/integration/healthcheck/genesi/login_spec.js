import selectors from '../../../support/selectors'


describe('Login', function () {


    before(() => {
        cy.visit('https://demogenesix.genesi.lan/')
        cy.get(selectors.login.username, {timeout: 8000})
    })

    it('login works', () => {
        cy.title().should('include', 'Genesi X')

        // test good and redirect to realtime screen
        cy.fixture('users').then(function (users) {
            cy.get(selectors.login.username).clear().type(users[0].username)
            cy.get(selectors.login.password).clear().type(users[0].password)
            cy.get(selectors.login.password).type('{enter}')
        })

        cy.location().should(loc => {
            expect(loc.hash).to.eq('#/realtime')
        })

        cy.wait(5000)

        // -- logout
        cy.get(selectors.navbar.avatar).click()
        cy.get(selectors.navbar.logout).click()
        cy.url().should('match', /login/)

    })


})