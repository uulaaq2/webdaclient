const apiServer = 'http://AUBOTD9X94HD2:3002'

module.exports = {
    showClientDevelopmentErros: true,
    localStorageType: 'cookie',
    localStorageExpiresIn: 14,   
    app: {
        corporateTitle: 'Indorama Ventures Oxide Pty Ltd',
        name: 'IBOS'
    },
    theme: {
        
    },
    urls: {
        home: {
            path: '/',
            name: 'Home'
        },
        user : {
            signIn: {
                path: '/signin',
                name: 'Sign in'
            },
            signOut: {
                path: '/signout',
                name: 'Sign Out'
            },
            changePassword: {
                path: '/me/changepassword',
                name: 'Change password'
            }
        },
        drawings: { 
            path: '/drawings',
            name: 'Loop PDFs',
            permissionName: 'Drawings'
        },
        error: {
            path: '/error',
            name: 'Error'
        },
        public: {
            path: '/public',
            name: 'Public'
        },
        noPermission: {
            path: '/nopermission',
            name: 'Sorry, you don\'t have access'
        },
        settings: {
            id: 'Settings',
            name: 'Settings',
            path: '/settings',
            groups: {
                id: 'settings.groups',
                path: '/settings/groups',
                name: 'Groups',                
                new: {
                    id: 'groups',
                    name: 'New group'
                }
            },
            departments: {
                id: 'Settings.Departments',
                path: '/settings/departments',
                name: 'Departments'
            },  
            users: {
                id: 'Settings.Users',
                path: '/settings/users',
                name: 'Users'
            },                      
            sites: {
                id: 'Settings.Sites',
                path: '/sites',
                name: 'Sites'
            }
        },   
        config: {               
            id: 'Config',
            path: '/config',
            name: 'Config',
            permissionActions: {
                id: 'Config.Permission Actions',
                path: '/config/permissions/actions',
                name: 'Permission actions'
            },
            permissionMenus: {
                id: 'Config.Permission Menus',
                path: '/config/permissions/menus',
                name: 'Permission menus'
            },
            permissionDefinitions: {
                id: 'Config.Permission Definitions',
                path: '/config/permissions/definitions',
                name: 'Permission definitions'
            }
        }         
    },
    api: {
        urls: {
            user: {
                signIn: apiServer + '/signin',
                verifyPassword: apiServer + '/user/me/verifypassword',
                changePassword: apiServer + '/user/me/changepassword',
                emailResetPasswordLink: apiServer + '/user/me/emailpasswordresetlink',
                generateToken: apiServer + '/user/me/generatetoken',
                verifyToken: apiServer + '/user/me/verifytoken',
                userProfile: apiServer + '/users'
            },
            groups: {
                get: apiServer + '/groups/get',
                new: apiServer + '/groups/new',
            },
            permissions: {
                getPermissionsWithActionsList: apiServer + '/permissions/getpermissionswithactionslist',
                getActions: apiServer + '/permissions/getactions'
            },
            getDrawings: apiServer + '/getdrawings',
            verifyToken: apiServer + '/verifytoken',
        }

    }
}