import selectors from '../../support/selectors'

/* TODO:

  * use same tests in deferred????
  * zoom in/out
  * pan
  * change map style
  * realtime target list is present
  * realtime target list open/collapse
  * fullscreen on/off
  * open/close menu
  * change map style
  * mapo toggles---> multiple
  * edit zones
  * edit pois
  */

describe('Realtime', () => {

  before('Login and route to realtime page', function () {
    cy.visit('/')
    cy.get(selectors.login.username, {
      timeout: 8000
    })

    cy.fixture('users').then(function (users) {
      cy.get(selectors.login.username).type(users[0].username)
      cy.get(selectors.login.password).type(users[0].password)
      cy.get(selectors.login.loginBtn).click()
    })

    cy.get(selectors.navbar.realtime).click()
    cy.url().should('match', /\/realtime/)
  })


  beforeEach('restore local storage', () => {
    cy.restoreLocalStorage();
  })

  afterEach(() => {
    cy.saveLocalStorage();
  });
  
  after(() => {
    cy.stopTarget(21111)

    cy.get('.toast-warning',{timeout: 20000}).click()
  })

  /** TESTS */

  it('', () => {
    cy.startTarget(21111)

    cy.get('.toast-success', {timeout: 20000}).click()
    cy.get('#target_6', {timeout: 20000})
    cy.get('[style="font-size: 90%; background: greenyellow;"]').contains('1')
    cy.get('.divider > .ng-star-inserted > .c-pointer').click()
    cy.get('#idTargetNameRT').contains('target fake 1')
  })


})