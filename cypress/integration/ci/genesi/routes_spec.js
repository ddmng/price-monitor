import selectors from '../../../support/selectors'
describe('Routes are correct', function () {

    before(() => {
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

    beforeEach('Search all', () => {
        cy.restoreLocalStorage();
    })

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('Navbar>Search', function () {
        cy.get(selectors.navbar.search).click()
        cy.url().should('match', /\/search/)
        cy.get(selectors.navbar.search).should('have.class', 'header-link-active')
    })

    it('Navbar>Realtime', function () {
        cy.get(selectors.navbar.realtime).click()
        cy.url().should('match', /\/realtime/)
        cy.get(selectors.navbar.realtime).should('have.class', 'header-link-active')
    })

    it('Sidebar>Target1', function () {
        cy.get(selectors.sidebar.target1).click()
        cy.url().should('match', /\/gps-hq/)
        cy.get(selectors.sidebar.target1).should('have.class', 'active')
    })

    it('Navbar>Logout', function () {
        cy.get(selectors.navbar.avatar).click()
        cy.get(selectors.navbar.logout).click()
        cy.url().should('match', /\/login/)
    })

})