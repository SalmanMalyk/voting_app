const Ziggy = {"url":"http:\/\/localhost:1000","port":1000,"defaults":{},"routes":{"debugbar.openhandler":{"uri":"_debugbar\/open","methods":["GET","HEAD"]},"debugbar.clockwork":{"uri":"_debugbar\/clockwork\/{id}","methods":["GET","HEAD"]},"debugbar.assets.css":{"uri":"_debugbar\/assets\/stylesheets","methods":["GET","HEAD"]},"debugbar.assets.js":{"uri":"_debugbar\/assets\/javascript","methods":["GET","HEAD"]},"debugbar.cache.delete":{"uri":"_debugbar\/cache\/{key}\/{tags?}","methods":["DELETE"]},"haddcustommenu":{"uri":"harimayco\/\/addcustommenu","methods":["POST"]},"hdeleteitemmenu":{"uri":"harimayco\/\/deleteitemmenu","methods":["POST"]},"hdeletemenug":{"uri":"harimayco\/\/deletemenug","methods":["POST"]},"hcreatenewmenu":{"uri":"harimayco\/\/createnewmenu","methods":["POST"]},"hgeneratemenucontrol":{"uri":"harimayco\/\/generatemenucontrol","methods":["POST"]},"hupdateitem":{"uri":"harimayco\/\/updateitem","methods":["POST"]},"scribe":{"uri":"apps\/api\/docs","methods":["GET","HEAD"]},"scribe.postman":{"uri":"apps\/api\/docs.postman","methods":["GET","HEAD"]},"scribe.openapi":{"uri":"apps\/api\/docs.openapi","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.update":{"uri":"reset-password","methods":["POST"]},"register":{"uri":"register","methods":["GET","HEAD"]},"user-profile-information.update":{"uri":"user\/profile-information","methods":["PUT"]},"user-password.update":{"uri":"user\/password","methods":["PUT"]},"password.confirmation":{"uri":"user\/confirmed-password-status","methods":["GET","HEAD"]},"password.confirm":{"uri":"user\/confirm-password","methods":["POST"]},"two-factor.login":{"uri":"two-factor-challenge","methods":["GET","HEAD"]},"two-factor.enable":{"uri":"user\/two-factor-authentication","methods":["POST"]},"two-factor.confirm":{"uri":"user\/confirmed-two-factor-authentication","methods":["POST"]},"two-factor.disable":{"uri":"user\/two-factor-authentication","methods":["DELETE"]},"two-factor.qr-code":{"uri":"user\/two-factor-qr-code","methods":["GET","HEAD"]},"two-factor.secret-key":{"uri":"user\/two-factor-secret-key","methods":["GET","HEAD"]},"two-factor.recovery-codes":{"uri":"user\/two-factor-recovery-codes","methods":["GET","HEAD"]},"terms.show":{"uri":"terms-of-service","methods":["GET","HEAD"]},"policy.show":{"uri":"privacy-policy","methods":["GET","HEAD"]},"profile.show":{"uri":"user\/profile","methods":["GET","HEAD"]},"api.invoices":{"uri":"api\/v1\/invoices\/{invoice}\/update","methods":["PATCH"]},"api.customersdiscount.index":{"uri":"api\/get-customersdiscount-list","methods":["GET","HEAD"]},"api.customers.index":{"uri":"api\/get-customers-list","methods":["GET","HEAD"]},"api.getUsersByParam":{"uri":"api\/get-users-by-param","methods":["GET","HEAD"]},"api.getUserByRole":{"uri":"api\/get-users-by-role","methods":["GET","HEAD"]},"api.getAllUsersList":{"uri":"api\/getAllUsersList","methods":["GET","HEAD"]},"api.getCustomerTypes":{"uri":"api\/getCustomerTypes","methods":["GET","HEAD"]},"api.getMembershipTypes":{"uri":"api\/getMembershipTypes","methods":["GET","HEAD"]},"api.getTowns":{"uri":"api\/getTowns","methods":["GET","HEAD"]},"api.getTownBlocks":{"uri":"api\/getTownBlocks","methods":["GET","HEAD"]},"api.getAllProducts":{"uri":"api\/getAllProducts","methods":["GET","HEAD"]},"api.customers.show":{"uri":"api\/customers\/{customer}","methods":["GET","HEAD"]},"api.getTownByNullZone":{"uri":"api\/getTownByNullZone","methods":["GET","HEAD"]},"api.zones.index":{"uri":"api\/zones\/list","methods":["GET","HEAD"]},"api.customers.customerLedgerInfo":{"uri":"api\/customer-ledger-info\/{branch}","methods":["GET","HEAD"]},"api.invoices.getInvoiceDetails":{"uri":"api\/{invoice}\/get-invoice-details","methods":["GET","HEAD"]},"api.invoices.updateInvoiceDetails":{"uri":"api\/{invoice}\/update-invoice-details","methods":["POST"]},"api.searchThroughAddress":{"uri":"api\/search-street-building","methods":["GET","HEAD"]},"api.invoices.existingInvoice":{"uri":"api\/{customerBranch}\/existing-invoice","methods":["GET","HEAD"]},"api.getScheduleVehicles":{"uri":"api\/getScheduleVehicles","methods":["GET","HEAD"]},"api.getVehicleInfo":{"uri":"api\/{vehicle}\/getVehicleInfo","methods":["GET","HEAD"]},"api.getDeliveryScheduleInfo":{"uri":"api\/{scheduleDelivery}\/getDeliveryScheduleInfo","methods":["GET","HEAD"]},"api.getPaymentTypes":{"uri":"api\/getPaymentTypes","methods":["GET","HEAD"]},"index":{"uri":"\/","methods":["GET","HEAD"]},"dashboard.loginView":{"uri":"admin\/login","methods":["GET","HEAD"]},"dashboard.login":{"uri":"admin\/login","methods":["POST"]},"dashboard.logout":{"uri":"admin\/logout","methods":["POST"]},"dashboard.index":{"uri":"admin","methods":["GET","HEAD"]},"dashboard.":{"uri":"admin\/logs","methods":["GET","HEAD"]},"dashboard.getModelAudits":{"uri":"admin\/audits","methods":["POST"]},"dashboard.password.update":{"uri":"admin\/update-user-password","methods":["POST"]},"dashboard.users.adminUser":{"uri":"admin\/users\/admins","methods":["GET","HEAD"]},"dashboard.users.updateStatus":{"uri":"admin\/users\/update-status","methods":["PATCH"]},"dashboard.users.index":{"uri":"admin\/users","methods":["GET","HEAD"]},"dashboard.users.create":{"uri":"admin\/users\/create","methods":["GET","HEAD"]},"dashboard.users.store":{"uri":"admin\/users","methods":["POST"]},"dashboard.users.show":{"uri":"admin\/users\/{user}","methods":["GET","HEAD"]},"dashboard.users.edit":{"uri":"admin\/users\/{user}\/edit","methods":["GET","HEAD"]},"dashboard.users.update":{"uri":"admin\/users\/{user}","methods":["PUT","PATCH"]},"dashboard.users.destroy":{"uri":"admin\/users\/{user}","methods":["DELETE"],"bindings":{"user":"id"}},"dashboard.config.menu_builder":{"uri":"admin\/general-configuration\/menu-builder","methods":["GET","HEAD"]},"dashboard.config.roles.index":{"uri":"admin\/general-configuration\/roles","methods":["GET","HEAD"]},"dashboard.config.roles.create":{"uri":"admin\/general-configuration\/roles\/create","methods":["GET","HEAD"]},"dashboard.config.roles.store":{"uri":"admin\/general-configuration\/roles","methods":["POST"]},"dashboard.config.roles.show":{"uri":"admin\/general-configuration\/roles\/{role}","methods":["GET","HEAD"]},"dashboard.config.roles.edit":{"uri":"admin\/general-configuration\/roles\/{role}\/edit","methods":["GET","HEAD"]},"dashboard.config.roles.update":{"uri":"admin\/general-configuration\/roles\/{role}","methods":["PUT","PATCH"]},"dashboard.config.roles.destroy":{"uri":"admin\/general-configuration\/roles\/{role}","methods":["DELETE"]},"dashboard.config.permissions.index":{"uri":"admin\/general-configuration\/permissions","methods":["GET","HEAD"]},"dashboard.config.permissions.create":{"uri":"admin\/general-configuration\/permissions\/create","methods":["GET","HEAD"]},"dashboard.config.permissions.store":{"uri":"admin\/general-configuration\/permissions","methods":["POST"]},"dashboard.config.permissions.show":{"uri":"admin\/general-configuration\/permissions\/{permission}","methods":["GET","HEAD"]},"dashboard.config.permissions.edit":{"uri":"admin\/general-configuration\/permissions\/{permission}\/edit","methods":["GET","HEAD"]},"dashboard.config.permissions.update":{"uri":"admin\/general-configuration\/permissions\/{permission}","methods":["PUT","PATCH"]},"dashboard.config.permissions.destroy":{"uri":"admin\/general-configuration\/permissions\/{permission}","methods":["DELETE"]},"dashboard.milestone.index":{"uri":"admin\/milestone","methods":["GET","HEAD"]},"dashboard.milestone.create":{"uri":"admin\/milestone\/create","methods":["GET","HEAD"]},"dashboard.milestone.store":{"uri":"admin\/milestone","methods":["POST"]},"dashboard.milestone.show":{"uri":"admin\/milestone\/{milestone}","methods":["GET","HEAD"]},"dashboard.milestone.edit":{"uri":"admin\/milestone\/{milestone}\/edit","methods":["GET","HEAD"]},"dashboard.milestone.update":{"uri":"admin\/milestone\/{milestone}","methods":["PUT","PATCH"],"bindings":{"milestone":"id"}},"dashboard.milestone.destroy":{"uri":"admin\/milestone\/{milestone}","methods":["DELETE"],"bindings":{"milestone":"id"}},"dashboard.administrator.authentication-logs.index":{"uri":"admin\/administrator\/authentication-logs","methods":["GET","HEAD"]},"dashboard.administrator.authentication-logs.create":{"uri":"admin\/administrator\/authentication-logs\/create","methods":["GET","HEAD"]},"dashboard.administrator.authentication-logs.store":{"uri":"admin\/administrator\/authentication-logs","methods":["POST"]},"dashboard.administrator.authentication-logs.show":{"uri":"admin\/administrator\/authentication-logs\/{authentication_log}","methods":["GET","HEAD"]},"dashboard.administrator.authentication-logs.edit":{"uri":"admin\/administrator\/authentication-logs\/{authentication_log}\/edit","methods":["GET","HEAD"]},"dashboard.administrator.authentication-logs.update":{"uri":"admin\/administrator\/authentication-logs\/{authentication_log}","methods":["PUT","PATCH"]},"dashboard.administrator.authentication-logs.destroy":{"uri":"admin\/administrator\/authentication-logs\/{authentication_log}","methods":["DELETE"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
