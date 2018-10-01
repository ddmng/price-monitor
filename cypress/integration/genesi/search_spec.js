import selectors from './selectors'

describe('Search page queries work', function () {

  before('Login and route to search page', function () {
    cy.visit('/')
    cy.get(selectors.login.username, {
      timeout: 8000
    })
    //cy.wait(8000)

    cy.fixture('users').then(function (users) {
      cy.get(selectors.login.username).type(users[0].username)
      cy.get(selectors.login.password).type(users[0].password)
      cy.get(selectors.login.loginBtn).click()
    })

    cy.get(selectors.navbar.search).click()
    cy.url().should('match', /\/search/)
  })


  beforeEach('Search all', () => {
    cy.restoreLocalStorage();
    cy.reload()
    cy.server()
    cy.route('POST', '**/search/simple/*').as('search')
    cy.wait('@search', {
      timeout: 10000
    })

    //    cy.get(selectors.search.searchField).clear().type('{enter}')
  })

  afterEach(() => {
    cy.saveLocalStorage();
  });


  it('Searches pressing enter', function () {
    cy.server()
    cy.route('POST', '**/search/simple/*').as('search')

    cy.get(selectors.search.searchField).type('savastano{enter}')

    cy.wait('@search')
    cy.contains('Savastano')

    cy.route('**/targets/2').as('target1')
    cy.get(selectors.search.searchField).clear().type('daniele')
    cy.get(selectors.search.searchButton).click()

    cy.wait('@target1')
    cy.contains('Savastano')
  })


  it('should search only targets, warrants and criminalcases', () => {
    cy.get(selectors.search.filterButton).click()

    // remove warrants filter
    cy.get(selectors.search.warrantsToggle).click()

    // remove criminal cases filter
    cy.get(selectors.search.ccToggle).click()

    cy.get(selectors.search.boxTarget).should('have.length', 10)
    cy.get(selectors.search.boxWarrant).should('have.length', 0)
    cy.get(selectors.search.boxCC).should('have.length', 0)

    // remove target filter
    cy.get(selectors.search.targetsToggle).click()
    // set warrants filter
    cy.get(selectors.search.warrantsToggle).click()
    cy.get(selectors.search.boxTarget).should('have.length', 0)
    cy.get(selectors.search.boxWarrant).should('have.length', 6)
    cy.get(selectors.search.boxCC).should('have.length', 0)

    // remove warrants filter
    cy.get(selectors.search.warrantsToggle).click()
    // set criminalcases filter
    cy.get(selectors.search.ccToggle).click()
    cy.get(selectors.search.boxTarget).should('have.length', 0)
    cy.get(selectors.search.boxWarrant).should('have.length', 0)
    cy.get(selectors.search.boxCC).should('have.length', 6)

  })

  it('Should click on pagination and change elements for the page', () => {
    cy.server()
    cy.route('POST', '**/search/simple/*').as('search')

    cy.get(selectors.search.totals).contains('43')
    cy.get(selectors.search.changeNumPages).contains('10')
    cy.get(selectors.search.lastPage).click()
    cy.wait('@search')

    cy.get(selectors.search.activePage).contains('5')
    cy.get(selectors.search.changeNumPages).click({
      waitForAnimations: false
    });
    cy.wait('@search')

    cy.get(selectors.search.changeNumPages).contains('25')
    cy.get(selectors.search.changeNumPages).click({
      waitForAnimations: false
    });
    cy.wait('@search')

    cy.get(selectors.search.changeNumPages).contains('50')
    cy.get(selectors.search.changeNumPages).click({
      waitForAnimations: false
    });
    cy.wait('@search')

    cy.get(selectors.search.changeNumPages).contains('100')
    cy.get(selectors.search.changeNumPages).click({
      waitForAnimations: false
    });
    cy.wait('@search')

    cy.get(selectors.search.changeNumPages).contains('10')
  })


  it('Should check that by clicking on the badges, the filters are deactivated', () => {
    cy.server()
    cy.route('**/targets/20').as('target20')

    cy.get(selectors.search.targetBadge).click()
    cy.get(selectors.search.warrantBadge).click()
    cy.get(selectors.search.ccBadge).click()
    cy.get(selectors.search.groupBadge).click()
    cy.expect(cy.get('.text-muted').contains('No result found'))

    // open filters sidebar
    cy.get(selectors.search.filterButton).click()

    // enables targets
    cy.get(selectors.search.targetsToggle).click()
    cy.expect(cy.get(selectors.search.targetsToggle).checked === false)

    cy.get(selectors.search.lowBatt).click()
    cy.expect(cy.get(selectors.search.lowBattBadge).contains('Low battery'))

    cy.wait('@target20')
    cy.expect(cy.get(':nth-child(2) > div[_ngcontent-c3=""] > gn-box-target > :nth-child(1) > .card > .card-footer > .d-flex > .justify-content-flex-start > .ng-star-inserted > .battery-empty').should('have.class', 'battery-empty'))
    cy.get(selectors.search.statusSelect).select('1').contains('Active')
  })

  it.only('click on a target and verify that it loads its page', () => {
    cy.get(selectors.search.boxTarget + ' > :nth-child(1) > .card > .card-body > :nth-child(1) > .col > .h5 > a', {timeout: 8000}).first().click()
    cy.url().should('match', /gps-hq/)
  })


})