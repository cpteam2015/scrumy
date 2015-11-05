Ext.define('Scrumy.view.main.backlog.Backlog', {
    extend: 'Ext.panel.Panel'
    ,requires : ['Scrumy.view.main.backlog.BacklogModel']
    ,controller : 'backlog'
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
            ,reference : 'gridbl'
            ,forceFit: true
            ,plugins : {
                ptype : 'rowediting'
                ,clicksToEdit: 2
                ,pluginId : 'rowediting'
            }
            ,bind: {store: '{backlog}'}
            ,columns: [
                {header:'#',dataIndex:'id'}
                ,{header:'Description',dataIndex:'description'
                    ,editor:{
                        xtype : 'textfield'
                        ,allowBlank :false
                    }
                }
                ,{header:'Cout',dataIndex:'cost'
                    ,editor:{
                        xtype : 'textfield'
                        ,allowBlank :false
                    }
                }
                ,{header:'Priorité',dataIndex:'priority'
                    ,editor:{
                        xtype : 'textfield'
                        ,allowBlank :false
                    }
                }
                ,{header:'Dependances',dataIndex:'required'
                    ,editor:{
                        xtype : 'textfield'
                        ,allowBlank :false
                    }
                }
            ]
        }
    ]   
});
