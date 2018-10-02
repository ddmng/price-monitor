/* TODO:
 
 * filter textbox
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


    it('shoud contain', () => {
        cy.expect(cy.get(':nth-child(10) > .nav-item > .p-1 > #idTargetName').contains('Mario Rossi'))
        cy.expect(cy.get('.sidebar-nav > :nth-child(4) > :nth-child(1) > .col > #idWarrantName').contains('Banda della Magliana'))
        cy.expect(cy.get('.sidebar-nav > :nth-child(6) > :nth-child(4) > .col > #idCriminalCaseName').contains('Omicidio a Roma'))
    })

    it('check the text search', () => {
        cy.log('TEST - should returns the value for the finded record in the list')
        cy.get('#idSidebarSearch').clear().type('sav')
        cy.contains('Pietro Savastano')

        cy.log('TEST - should returns a message if the search did not produce results')
        cy.get('#idSidebarSearch').clear().type('xxx')
        cy.expect(cy.get('#idNoItems').contains('Nessun risulato trovato'))
    })


    it.only('click on icon that close and minimize the sidebar and select a target at the same time', () => {
        let minimizerButton = cy.get('#idSidebarButton');
        cy.expect(minimizerButton.click())
    })

})