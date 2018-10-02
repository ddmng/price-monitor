export default {
    login: {
        username: '[name=username]',
        password: '[name=password]',
        usernameMissingError: '.mt-3 > .help-block',
        passwordMissingError: '[ng-reflect-klass="form-group"] > .help-block',
        loginBtn: '#idLoginButton',
        loginAlert: '.alert'
    },
    navbar: {
        search: ':nth-child(3) > :nth-child(2) > .nav-link',
        realtime: ':nth-child(3) > :nth-child(1) > .nav-link',
        avatar: '.img-avatar',
        logout: '[href*=login]'
    },
    sidebar: {
        target1: ':nth-child(3) > .nav-item > .ng-star-inserted > .p-1'
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
        changeNumPages: '#idBtnChangeNumPages',
        lastPage: '.pagination-last > .page-link',
        activePage: '.active > .page-link',
        
        // badges
        targetBadge: '#idBtnIncludeTarget',
        warrantBadge: '#idBtnIncludeWarrants',
        ccBadge: '#idBtnIncludeCriminalCases',
        groupBadge: '#idBtnIncludeGroup',
        lowBattBadge: '#idBadgebatteryLevel',
    }
}
