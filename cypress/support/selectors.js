export default {
    login: {
        username: '[name=username]',
        password: '[name=password]',
        usernameMissingError: '.mt-3 > .help-block',
        passwordMissingError: '[ng-reflect-klass="form-group"] > .help-block',
        loginBtn: '#idLoginButton',
        loginAlert: '.alert'
    },
    realtime: {
        map: '[style="width: 100%; height: 100%; display: block;"]',
        newZoneName: ':nth-child(1) > .mr-2',
        saveNewZoneBtn: '.p-2 > .btn-outline-primary',
        searchZone: '.ml-2',
        zonesList: '.dropdown-item',
        deleteZoneBtn: '.btn-outline-danger',
        confirmZoneDelete: '.btn-danger',
        closeZoneMenu: '.sidebar-map-detail > .dismiss',
        closeSideMenu: '.sidebar-map > .dismiss',
        drawNewZoneBtn: '.pr-2 > .d-flex > .btn-sm',
        manageZones: '.pr-1 > :nth-child(1) > .btn',
        openSideMenu: '.open-btn'
    },
    navbar: {
        search: ':nth-child(3) > :nth-child(2) > .nav-link',
        realtime: ':nth-child(3) > :nth-child(1) > .nav-link',
        avatar: '.img-avatar',
        logout: '[href*=login]'
    },
    sidebar: {
        target1: ':nth-child(3) > .nav-item > .ng-star-inserted > .p-1',
        targetList: '.sidebar-nav',
        q: '#idSidebarSearch',
        rows: '.row',
        minimizer: '#idSidebarButton',
        sidebar: '.sidebar'
    },
    search: {
        // common fields
        searchField: '#idSearchField',
        searchButton: '#searchButton',
        
        // side filters
        filterButton: '#filterButton',
        
        warrantsToggle: '#idSwitchWarrants',
        ccToggle: '#idSwitchCriminalCases',
        targetsToggle: '#idSwitchTargets',
        groupsToggle: '#idSwitchTargetGroups',
        lowBatt: '#idSwitchLowBattery',
        statusSelect: '#idInputStatusValue',

        boxTarget: 'gn-box-target',
        boxWarrant: 'gn-box-warrant',
        boxCC: 'gn-box-criminalcase',
        boxGroup: 'gn-box-group',
        
        // pagination
        totals: '#idTotalItems',
        noResults: '.text-muted',
        changeNumPages: '#idBtnChangeNumPages',
        lastPage: '.pagination-last > .page-link',
        activePage: '.active > .page-link',
        
        // badges
        targetBadge: '#idBtnIncludeTarget',
        warrantBadge: '#idBtnIncludeWarrants',
        ccBadge: '#idBtnIncludeCriminalCases',
        groupBadge: '#idBtnIncludeGroup',
        lowBattBadge: '#idBadgebatteryLevel',
        emptyBatteryIcon: '.battery-empty'
    },
    deferred: {
        datePicker: '[name=daterangeInput]',
        today: '[data-range-key=Today]',
        yesterday: '[data-range-key=Yesterday]',
        lastTwoDays: '[data-range-key="Last 2 days"]',
        thisWeek: '[data-range-key="This week"]',
        lastWeek: '[data-range-key="Last week"]',
        selectedDate: '[name=daterangeInput]'
    }
}
