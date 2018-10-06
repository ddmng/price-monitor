import selectors from '../../../support/selectors'

describe('Login', function () {


    before(() => {
        cy.visit('/')
        cy.get(selectors.login.username, {timeout: 8000})
    })

    it('login screen check errors and redirects to realtime on success', () => {
        cy.title().should('include', 'Genesi X')

        cy.get(selectors.login.username).should('have.attr', 'placeholder', 'Username')
        cy.get(selectors.login.password).should('have.attr', 'placeholder', 'Password')

        cy.get(selectors.login.username).type('{enter}')
        cy.get(selectors.login.usernameMissingError).should('be.visible')
        //---test

        cy.get(selectors.login.password).type('{enter}')
        cy.get(selectors.login.passwordMissingError).should('be.visible')

        //---test

        // test wrong login
        cy.get(selectors.login.username).type('wronguser')
        cy.get(selectors.login.usernameMissingError).should('not.be.visible')

        cy.get(selectors.login.password).type('wrongpassword')
        cy.get(selectors.login.passwordMissingError).should('not.be.visible')

        cy.get(selectors.login.password).type('{enter}')
        cy.get(selectors.login.loginAlert).should('be.visible')

        // test good and redirect to realtime screen
        cy.fixture('users').then(function (users) {
            cy.get(selectors.login.username).clear().type(users[0].username)
            cy.get(selectors.login.password).clear().type(users[0].password)
            cy.get(selectors.login.password).type('{enter}')
        })

        cy.location().should(loc => {
            expect(loc.hash).to.eq('#/realtime')
        })

        // -- logout
        cy.get(selectors.navbar.avatar).click()
        cy.get(selectors.navbar.logout).click()
        cy.url().should('match', /login/)
    })


})