import selectors from '../../../support/selectors'

let targets = {}

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

    cy.fixture('targets').then(ts => targets = ts)

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
    cy.stopTarget(targets[0].id)

  })

  /** TESTS */

  it('shows a green tooltip for realtime start', () => {
    cy.startTarget(targets[0].id)

    // new realtime toaster
    cy.get('.toast-success', {
      timeout: 20000
    }).contains(targets[0].name).click()

    // target's tooltip on map
    cy.get('#target_6', {
      timeout: 20000
    })

    // realtime panel in sidebar
    cy.get('[style="font-size: 90%; background: greenyellow;"]').contains('1')

    // open panel
    cy.get('.divider > .ng-star-inserted > .c-pointer').click()

    // search for target's name in opened panel
    cy.get('#idTargetNameRT').contains(targets[0].name)

    cy.stopTarget(targets[0].id)

    cy.get('.toast-warning', {
      timeout: 20000
    }).click()
  })

  it('lets you add a new zone', () => {
    // menu on map
    cy.get(selectors.realtime.openSideMenu).click()

    // manage zone button
    cy.get(selectors.realtime.manageZones).click()

    // click on draw new
    cy.get(selectors.realtime.drawNewZoneBtn).click()

    // draw a new area
    cy.get(selectors.realtime.map)
      .trigger('pointerdown', 250, 250).trigger('pointerup', 250, 250)
      .trigger('pointerdown', 250, 500).trigger('pointerup', 250, 500)
      .trigger('pointerdown', 500, 500).trigger('pointerup', 500, 500)
      .trigger('pointerdown', 500, 250).trigger('pointerup', 500, 250)
      .trigger('pointerdown', 250, 250).trigger('pointerup', 250, 250)

    // type a name for the zone
    cy.get(selectors.realtime.newZoneName).type('test zone 1')

    // save
    cy.get(selectors.realtime.saveNewZoneBtn).click()

    // click on search zones
    cy.wait(1000) // TODO: fix in another way
    cy.get(selectors.realtime.searchZone).click()

    // check if new zone exists and center on it
    cy.get(selectors.realtime.zonesList).contains('test zone 1').click()

    // click to delete zone
    cy.get(selectors.realtime.deleteZoneBtn).click()

    // confirm deletion
    cy.get(selectors.realtime.confirmZoneDelete).click()

    cy.get(selectors.realtime.closeZoneMenu).click()

    cy.get(selectors.realtime.closeSideMenu).click()

  })

})