const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"debugbar.openhandler":{"uri":"_debugbar\/open","methods":["GET","HEAD"]},"debugbar.clockwork":{"uri":"_debugbar\/clockwork\/{id}","methods":["GET","HEAD"]},"debugbar.assets.css":{"uri":"_debugbar\/assets\/stylesheets","methods":["GET","HEAD"]},"debugbar.assets.js":{"uri":"_debugbar\/assets\/javascript","methods":["GET","HEAD"]},"debugbar.cache.delete":{"uri":"_debugbar\/cache\/{key}\/{tags?}","methods":["DELETE"]},"haddcustommenu":{"uri":"harimayco\/\/addcustommenu","methods":["POST"]},"hdeleteitemmenu":{"uri":"harimayco\/\/deleteitemmenu","methods":["POST"]},"hdeletemenug":{"uri":"harimayco\/\/deletemenug","methods":["POST"]},"hcreatenewmenu":{"uri":"harimayco\/\/createnewmenu","methods":["POST"]},"hgeneratemenucontrol":{"uri":"harimayco\/\/generatemenucontrol","methods":["POST"]},"hupdateitem":{"uri":"harimayco\/\/updateitem","methods":["POST"]},"scribe":{"uri":"apps\/api\/docs","methods":["GET","HEAD"]},"scribe.postman":{"uri":"apps\/api\/docs.postman","methods":["GET","HEAD"]},"scribe.openapi":{"uri":"apps\/api\/docs.openapi","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.update":{"uri":"reset-password","methods":["POST"]},"register":{"uri":"register","methods":["GET","HEAD"]},"user-profile-information.update":{"uri":"user\/profile-information","methods":["PUT"]},"user-password.update":{"uri":"user\/password","methods":["PUT"]},"password.confirmation":{"uri":"user\/confirmed-password-status","methods":["GET","HEAD"]},"password.confirm":{"uri":"user\/confirm-password","methods":["POST"]},"two-factor.login":{"uri":"two-factor-challenge","methods":["GET","HEAD"]},"two-factor.enable":{"uri":"user\/two-factor-authentication","methods":["POST"]},"two-factor.confirm":{"uri":"user\/confirmed-two-factor-authentication","methods":["POST"]},"two-factor.disable":{"uri":"user\/two-factor-authentication","methods":["DELETE"]},"two-factor.qr-code":{"uri":"user\/two-factor-qr-code","methods":["GET","HEAD"]},"two-factor.secret-key":{"uri":"user\/two-factor-secret-key","methods":["GET","HEAD"]},"two-factor.recovery-codes":{"uri":"user\/two-factor-recovery-codes","methods":["GET","HEAD"]},"terms.show":{"uri":"terms-of-service","methods":["GET","HEAD"]},"policy.show":{"uri":"privacy-policy","methods":["GET","HEAD"]},"profile.show":{"uri":"user\/profile","methods":["GET","HEAD"]},"api-tokens.index":{"uri":"user\/api-tokens","methods":["GET","HEAD"]},"api.invoices":{"uri":"api\/v1\/invoices\/{invoice}\/update","methods":["PATCH"],"bindings":{"invoice":"id"}},"api.customersdiscount.index":{"uri":"api\/get-customersdiscount-list","methods":["GET","HEAD"]},"api.customers.index":{"uri":"api\/get-customers-list","methods":["GET","HEAD"]},"api.getUsersByParam":{"uri":"api\/get-users-by-param","methods":["GET","HEAD"]},"api.getUserByRole":{"uri":"api\/get-users-by-role","methods":["GET","HEAD"]},"api.getAllUsersList":{"uri":"api\/getAllUsersList","methods":["GET","HEAD"]},"api.getCustomerTypes":{"uri":"api\/getCustomerTypes","methods":["GET","HEAD"]},"api.getMembershipTypes":{"uri":"api\/getMembershipTypes","methods":["GET","HEAD"]},"api.getTowns":{"uri":"api\/getTowns","methods":["GET","HEAD"]},"api.getTownBlocks":{"uri":"api\/getTownBlocks","methods":["GET","HEAD"]},"api.getAllProducts":{"uri":"api\/getAllProducts","methods":["GET","HEAD"]},"api.customers.show":{"uri":"api\/customers\/{customer}","methods":["GET","HEAD"]},"api.getTownByNullZone":{"uri":"api\/getTownByNullZone","methods":["GET","HEAD"]},"api.zones.index":{"uri":"api\/zones\/list","methods":["GET","HEAD"]},"api.customers.customerLedgerInfo":{"uri":"api\/customer-ledger-info\/{branch}","methods":["GET","HEAD"],"bindings":{"branch":"id"}},"api.invoices.getInvoiceDetails":{"uri":"api\/{invoice}\/get-invoice-details","methods":["GET","HEAD"],"bindings":{"invoice":"id"}},"api.invoices.updateInvoiceDetails":{"uri":"api\/{invoice}\/update-invoice-details","methods":["POST"],"bindings":{"invoice":"id"}},"api.searchThroughAddress":{"uri":"api\/search-street-building","methods":["GET","HEAD"]},"api.invoices.existingInvoice":{"uri":"api\/{customerBranch}\/existing-invoice","methods":["GET","HEAD"],"bindings":{"customerBranch":"id"}},"api.getScheduleVehicles":{"uri":"api\/getScheduleVehicles","methods":["GET","HEAD"]},"api.getVehicleInfo":{"uri":"api\/{vehicle}\/getVehicleInfo","methods":["GET","HEAD"],"bindings":{"vehicle":"id"}},"api.getDeliveryScheduleInfo":{"uri":"api\/{scheduleDelivery}\/getDeliveryScheduleInfo","methods":["GET","HEAD"],"bindings":{"scheduleDelivery":"id"}},"api.getPaymentTypes":{"uri":"api\/getPaymentTypes","methods":["GET","HEAD"]},"api.dispatcher.login":{"uri":"api\/v1\/dispatcher\/login","methods":["POST"]},"api.dispatcher.":{"uri":"api\/v1\/dispatcher\/get-customer","methods":["POST"]},"api.customer.":{"uri":"api\/v1\/customer\/recent-orders","methods":["GET","HEAD"]},"dashboard.index":{"uri":"\/","methods":["GET","HEAD"]},"dashboard.":{"uri":"users\/active-users","methods":["GET","HEAD"]},"dashboard.analytics.getSchedulePlanAnalytics":{"uri":"analytics\/schedule-plan-analytics","methods":["POST"]},"dashboard.analytics.getQuickAnalytics":{"uri":"analytics\/quick-analytics","methods":["POST"]},"dashboard.getModelAudits":{"uri":"audits","methods":["POST"]},"dashboard.password.update":{"uri":"update-user-password","methods":["POST"]},"dashboard.fetch-notifications":{"uri":"fetch-notifications","methods":["POST"]},"dashboard.users.activityLogs":{"uri":"users\/{hash}\/activity-logs","methods":["GET","HEAD"]},"dashboard.users.updateStatus":{"uri":"users\/update-status","methods":["PATCH"]},"dashboard.users.index":{"uri":"users","methods":["GET","HEAD"]},"dashboard.users.create":{"uri":"users\/create","methods":["GET","HEAD"]},"dashboard.users.store":{"uri":"users","methods":["POST"]},"dashboard.users.show":{"uri":"users\/{user}","methods":["GET","HEAD"]},"dashboard.users.edit":{"uri":"users\/{user}\/edit","methods":["GET","HEAD"]},"dashboard.users.update":{"uri":"users\/{user}","methods":["PUT","PATCH"]},"dashboard.users.destroy":{"uri":"users\/{user}","methods":["DELETE"]},"dashboard.config.menu_builder":{"uri":"general-configuration\/menu-builder","methods":["GET","HEAD"]},"dashboard.config.roles.index":{"uri":"general-configuration\/roles","methods":["GET","HEAD"]},"dashboard.config.roles.create":{"uri":"general-configuration\/roles\/create","methods":["GET","HEAD"]},"dashboard.config.roles.store":{"uri":"general-configuration\/roles","methods":["POST"]},"dashboard.config.roles.show":{"uri":"general-configuration\/roles\/{role}","methods":["GET","HEAD"]},"dashboard.config.roles.edit":{"uri":"general-configuration\/roles\/{role}\/edit","methods":["GET","HEAD"],"bindings":{"role":"id"}},"dashboard.config.roles.update":{"uri":"general-configuration\/roles\/{role}","methods":["PUT","PATCH"],"bindings":{"role":"id"}},"dashboard.config.roles.destroy":{"uri":"general-configuration\/roles\/{role}","methods":["DELETE"],"bindings":{"role":"id"}},"dashboard.config.permissions.index":{"uri":"general-configuration\/permissions","methods":["GET","HEAD"]},"dashboard.config.permissions.create":{"uri":"general-configuration\/permissions\/create","methods":["GET","HEAD"]},"dashboard.config.permissions.store":{"uri":"general-configuration\/permissions","methods":["POST"]},"dashboard.config.permissions.show":{"uri":"general-configuration\/permissions\/{permission}","methods":["GET","HEAD"],"bindings":{"permission":"id"}},"dashboard.config.permissions.edit":{"uri":"general-configuration\/permissions\/{permission}\/edit","methods":["GET","HEAD"],"bindings":{"permission":"id"}},"dashboard.config.permissions.update":{"uri":"general-configuration\/permissions\/{permission}","methods":["PUT","PATCH"],"bindings":{"permission":"id"}},"dashboard.config.permissions.destroy":{"uri":"general-configuration\/permissions\/{permission}","methods":["DELETE"],"bindings":{"permission":"id"}},"dashboard.milestone.index":{"uri":"milestone","methods":["GET","HEAD"]},"dashboard.milestone.create":{"uri":"milestone\/create","methods":["GET","HEAD"]},"dashboard.milestone.store":{"uri":"milestone","methods":["POST"]},"dashboard.milestone.show":{"uri":"milestone\/{milestone}","methods":["GET","HEAD"]},"dashboard.milestone.edit":{"uri":"milestone\/{milestone}\/edit","methods":["GET","HEAD"]},"dashboard.milestone.update":{"uri":"milestone\/{milestone}","methods":["PUT","PATCH"],"bindings":{"milestone":"id"}},"dashboard.milestone.destroy":{"uri":"milestone\/{milestone}","methods":["DELETE"],"bindings":{"milestone":"id"}},"dashboard.administrator.authentication-logs.index":{"uri":"administrator\/authentication-logs","methods":["GET","HEAD"]},"dashboard.administrator.authentication-logs.create":{"uri":"administrator\/authentication-logs\/create","methods":["GET","HEAD"]},"dashboard.administrator.authentication-logs.store":{"uri":"administrator\/authentication-logs","methods":["POST"]},"dashboard.administrator.authentication-logs.show":{"uri":"administrator\/authentication-logs\/{authentication_log}","methods":["GET","HEAD"]},"dashboard.administrator.authentication-logs.edit":{"uri":"administrator\/authentication-logs\/{authentication_log}\/edit","methods":["GET","HEAD"]},"dashboard.administrator.authentication-logs.update":{"uri":"administrator\/authentication-logs\/{authentication_log}","methods":["PUT","PATCH"]},"dashboard.administrator.authentication-logs.destroy":{"uri":"administrator\/authentication-logs\/{authentication_log}","methods":["DELETE"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };