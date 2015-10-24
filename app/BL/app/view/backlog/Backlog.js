/**
 * This view is an example list of people.
 */
Ext.define('backlog.view.backlog.Backlog', {
    extend: 'Ext.panel.Panel'
    ,xtype: 'backlog-grid'
    ,requires: [
        'backlog.store.US'
    ]
    ,title: 'Your Backlog'
    ,items : [
        {
            xtype : 'combobox'
            ,fieldLabel : 'Choose a project'
            ,store : ['project 1','scrummy', 'java ee']
        }
        ,{
            xtype : 'grid'
            ,store : {type : 'us'}
            ,columns: [
                {header:'#',dataIndex:'id'}
                ,{header:'Description',dataIndex:'desc'}
                ,{header:'Cout',dataIndex:'cout'}
                ,{header:'Priorité',dataIndex:'prior'}
                ,{header:'Dependances',dataIndex:'deps'}
            ]
        }
    ]

});
