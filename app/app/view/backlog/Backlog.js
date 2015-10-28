
Ext.define('Scrumy.view.backlog.Backlog', {
    extend: 'Ext.panel.Panel'
    ,requires : ['Scrumy.view.backlog.BacklogModel',]
    ,title: 'Backlog'
    ,alias: 'widget.backlog'
    ,viewModel : {type: 'backlog'}
    ,layou : 'border'
    ,items: [
        {
            xtype: 'panel'
            ,tbar: [
                {
                    text : 'Add a User Story'
                }

            ]
        }
        ,{
            xtype: 'grid'
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
