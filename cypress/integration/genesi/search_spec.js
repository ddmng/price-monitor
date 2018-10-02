import selectors from '../../support/selectors'

describe('Search page', function () {

  before('Login and route to search page', function () {
    cy.visit('/')
    cy.get(selectors.login.username, {
      timeout: 8000
    })

    cy.fixture('users').then(function (users) {
      cy.get(selectors.login.username).type(users[0].username)
      cy.get(selectors.login.password).type(users[0].password)
      cy.get(selectors.login.loginBtn).click()
    })

    cy.get(selectors.navbar.search).click()
    cy.url().should('match', /\/search/)
  })


  beforeEach('restore local storage and search all', () => {
    cy.restoreLocalStorage();
    cy.reload()
    cy.server()
    cy.route('POST', '**/search/simple/*').as('search')
    cy.wait('@search', {
      timeout: 10000
    })
  })

  afterEach(() => {
    cy.saveLocalStorage();
  });


  it('should search pressing enter', function () {
    cy.server()
    cy.route('POST', '**/search/simple/*').as('search')

    cy.get(selectors.search.searchField).type('target1{enter}')

    cy.wait('@search')
    cy.contains('target1')

    cy.route('**/targets/1').as('target1')
    cy.get(selectors.search.searchField).clear().type('{enter}')
    cy.get(selectors.search.searchField).clear().type('target1')
    cy.get(selectors.search.searchButton).click()

    cy.wait('@target1')
    cy.contains('target1')
  })


  it('should search only targets, warrants and criminalcases', () => {
    cy.get(selectors.search.filterButton).click()

    // remove warrants filter
    cy.get(selectors.search.warrantsToggle).click()
    // remove criminal cases filter
    cy.get(selectors.search.ccToggle).click()
    // remove groups filter
    cy.get(selectors.search.groupsToggle).click()

    cy.get(selectors.search.boxTarget).should('have.length', 5)
    cy.get(selectors.search.boxWarrant).should('have.length', 0)
    cy.get(selectors.search.boxCC).should('have.length', 0)
    cy.get(selectors.search.boxGroup).should('have.length', 0)

    // remove target filter
    cy.get(selectors.search.targetsToggle).click()
    // set warrants filter
    cy.get(selectors.search.warrantsToggle).click()
    cy.get(selectors.search.boxTarget).should('have.length', 0)
    cy.get(selectors.search.boxWarrant).should('have.length', 2)
    cy.get(selectors.search.boxCC).should('have.length', 0)
    cy.get(selectors.search.boxGroup).should('have.length', 0)

    // remove warrants filter
    cy.get(selectors.search.warrantsToggle).click()
    // set criminalcases filter
    cy.get(selectors.search.ccToggle).click()
    cy.get(selectors.search.boxTarget).should('have.length', 0)
    cy.get(selectors.search.boxWarrant).should('have.length', 0)
    cy.get(selectors.search.boxCC).should('have.length', 2)
    cy.get(selectors.search.boxGroup).should('have.length', 0)

    // remove cc filter
    cy.get(selectors.search.ccToggle).click()
    // set criminalcases filter
    cy.get(selectors.search.groupsToggle).click()
    cy.get(selectors.search.boxTarget).should('have.length', 0)
    cy.get(selectors.search.boxWarrant).should('have.length', 0)
    cy.get(selectors.search.boxCC).should('have.length', 0)
    cy.get(selectors.search.boxGroup).should('have.length', 2)
    
  })

  it('should change pagination parameter', () => {
    cy.server()
    cy.route('POST', '**/search/simple/*').as('search')

    cy.get(selectors.search.totals).contains('11')
    cy.get(selectors.search.changeNumPages).contains('10')
    cy.get(selectors.search.lastPage).click()
    cy.wait('@search')

    cy.get(selectors.search.activePage).contains('2')
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


  it('should deactivate filters clicking on the badges', () => {
    cy.server()
    cy.route('**/targets/1').as('target1')

    cy.get(selectors.search.targetBadge).click()
    cy.get(selectors.search.warrantBadge).click()
    cy.get(selectors.search.ccBadge).click()
    cy.get(selectors.search.groupBadge).click()
    cy.expect(cy.get('.text-muted').contains('lbl_noResults'))

    // open filters sidebar
    cy.get(selectors.search.filterButton).click()

    // enables targets
    cy.get(selectors.search.targetsToggle).click()
    cy.expect(cy.get(selectors.search.targetsToggle).checked === false)

    cy.get(selectors.search.lowBatt).click()
    cy.expect(cy.get(selectors.search.lowBattBadge).contains('Low battery'))

    cy.wait('@target1')
    cy.expect(cy.get('.battery-empty').should('have.length', 1))
    cy.get(selectors.search.statusSelect).select('1').contains('Active')
  })

  it('loads a target clicking on its name', () => {
    cy.get(selectors.search.boxTarget + ' > :nth-child(1) > .card > .card-body > :nth-child(1) > .col > .h5 > a', {timeout: 8000}).first().click()
    cy.url().should('match', /gps-hq/)
  })


})