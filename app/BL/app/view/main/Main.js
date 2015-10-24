/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('backlog.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'backlog.view.main.MainController',
        'backlog.view.main.MainModel',
        'backlog.view.backlog.Backlog'
    ]

    ,controller: 'main'
    ,viewModel: 'main'
    ,items: [
        {xtype : 'backlog-grid'}
    ]
});
