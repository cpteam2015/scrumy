Ext.define('Scrumy.view.main.backlog.Backlog', {
    extend: 'Ext.panel.Panel'
    ,requires : ['Scrumy.view.main.backlog.BacklogModel','Scrumy.store.Priority','Scrumy.store.Cost']
    ,controller : 'backlog'
    ,title: 'Backlog'
    ,alias: 'widget.backlog'
    ,viewModel : {type: 'backlog'}
    
    ,items: [
        {
            xtype: 'panel'
            ,tbar: [
                {
                    text : 'Add a User Story'
                    ,reference : 'addUSbtn'
                }
                ,{
                    text : 'Delete a User Story'
                    ,reference : 'delUSbtn'
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
                        xtype : 'combobox'
                        ,allowBlank :false
                        ,queryMode : 'local'
                        ,store : {type:'cost'}
                        ,displayField : 'value'
                        ,valueField : 'value'
                    }
                }
                ,{header:'Priorité',dataIndex:'priority'
                    ,editor:{
                        xtype : 'combobox'
                        ,allowBlank :false
                        ,queryMode : 'local'
                        ,store : {type:'priority'}
                        ,displayField : 'value'
                        ,valueField : 'value'
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
