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
    cy.exec('docker stop fake_target_clark_kent_on_test')
    cy.exec('docker rm fake_target_clark_kent_on_test')

    cy.get('.toast-warning').click()

  })

  /** TESTS */

  it('Goes in fullscreen', () => {
    cy.get('.position > .fal').click()
    cy.exec('docker run -d -e SERVER_HOST=testbed.genesi.lan -e FAKE_DEVICE_SERIAL=21111 -e FAKE_PATH_RDJSON=path2.ndjson --name fake_target_clark_kent_on_test registry.genesi.lan/genesi/fake_targets:dev')
    // targets 21111
    //         21112
    //         21113
    cy.get('.toast-success', {timeout: 10000}).click()
    cy.get('#target_6', {timeout: 20000})
    cy.get('[style="font-size: 90%; background: greenyellow;"]').contains('1')
    cy.get('.divider > .ng-star-inserted > .c-pointer').click()
    cy.get('#idTargetNameRT').contains('target fake 1')


  })


})