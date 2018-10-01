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
        targetAlessio: ':nth-child(5) > .nav-item > .ng-star-inserted > .p-1 > .row > #idTargetName'
    },
    search: {
        searchField: '#idSearchField',
        searchButton: '#searchButton',
        filterButton: '#filterButton',
        warrantsToggle: '#idSwitchWarrants',
        ccToggle: '#idSwitchCriminalCases',
        targetsToggle: '#idSwitchTargets',
        boxTarget: 'gn-box-target',
        boxWarrant: 'gn-box-warrant',
        boxCC: 'gn-box-criminalcase',
        totals: '#idTotalItems',
        changeNumPages: '#idBtnChangeNumPages',
        lastPage: '.pagination-last > .page-link',
        activePage: '.active > .page-link',
        targetBadge: '#idBtnIncludeTarget',
        warrantBadge: '#idBtnIncludeWarrants',
        ccBadge: '#idBtnIncludeCriminalCases',
        groupBadge: '#idBtnIncludeGroup',
        lowBatt: '#idSwitchLowBattery',
        lowBattBadge: '#idBadgebatteryLevel',
        statusSelect: '#idInputStatusValue'
    }
}
