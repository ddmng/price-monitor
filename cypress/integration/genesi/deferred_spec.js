import selectors from '../../support/selectors'

/* TODO:

    see realtime tests!

    * all labels present
    * datepicker
    * play, stop, pause
    * map toggles
    * add/modify/delete note
    * view note in timeline
    * zoom timeline
    * reset timeline zoom

    */



describe('Deferred page', function () {

    context('Calendar component', function () {
        const date2String = d => d.format("DD/MM/YYYY")

        const today = date2String(Cypress.moment())
        const yesterday = date2String(Cypress.moment().add(-1, 'days'))
        const mondayOfThisWeek = date2String(Cypress.moment().startOf('isoWeek'))
        const sundayOfLastWeek = date2String(Cypress.moment().startOf('isoWeek').add(-1, 'days'))
        const mondayOfLastWeek = date2String(Cypress.moment().startOf('isoWeek').add(-7, 'days'))

        before('Login and route to target1\'s deferred page', function () {
            cy.visit('/')
            cy.get(selectors.login.username, {
                timeout: 8000
            })

            cy.fixture('users').then(function (users) {
                cy.get(selectors.login.username).type(users[0].username)
                cy.get(selectors.login.password).type(users[0].password)
                cy.get(selectors.login.loginBtn).click()
            })

            cy.get(selectors.sidebar.target1).click()
            cy.url().should('match', /\/gps-hq/)
        })


        beforeEach('restore local storage', () => {
            cy.restoreLocalStorage();
        })

        afterEach(() => {
            cy.saveLocalStorage();
        });


        it('>Today', () => {
            cy.get(selectors.deferred.datePicker).click()
            cy.get(selectors.deferred.today).click()

            expect(cy.get(selectors.deferred.selectedDate).contains(`${today}`))
        })

        it('>Yesterday', () => {
            cy.get(selectors.deferred.datePicker).click()
            cy.get(selectors.deferred.yesterday).click()

            expect(cy.get(selectors.deferred.selectedDate).contains(`${yesterday}`))
        })

        it('>Last 2 days', () => {
            cy.get(selectors.deferred.datePicker).click()
            cy.get(selectors.deferred.lastTwoDays).click()

            expect(cy.get(selectors.deferred.selectedDate).contains(`${today}`))
            expect(cy.get(selectors.deferred.selectedDate).contains(`${yesterday}`))
        })

        it('>This week', () => {
            cy.get(selectors.deferred.datePicker).click()
            cy.get(selectors.deferred.thisWeek).click()

            expect(cy.get(selectors.deferred.selectedDate).contains(`${today}`))
            expect(cy.get(selectors.deferred.selectedDate).contains(`${mondayOfThisWeek}`))
        })

        it('>Last week', () => {
            cy.get(selectors.deferred.datePicker).click()
            cy.get(selectors.deferred.lastWeek).click()

            expect(cy.get(selectors.deferred.selectedDate).contains(`${mondayOfLastWeek}`))
            expect(cy.get(selectors.deferred.selectedDate).contains(`${sundayOfLastWeek}`))
        })

    })

})