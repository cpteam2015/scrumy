Ext.define('Scrumy.view.main.sprints.Sprints', {
    extend: 'Ext.grid.Panel'
    ,requires : ['Scrumy.view.main.sprints.SprintModel']
    ,controller : 'sprints'
    ,title: 'Sprints'
    ,alias: 'widget.sprints'
    ,viewModel : {type: 'sprints'}
    ,layou : 'border'
    ,items :[
		{
			xtype: 'button'
			,text : 'add Sprint' 
		}
		,{
			xtype: 'panel'
			,region: 'center'
			,tbar : [
				{	
					xtype: 'textfield'
					,name: 'id:'
					,fieldLabel: 'sprint_ID:'
					,hidden : true
					,value: ' '
				}
				,{
					xtype: 'dateField' 
					,name: 'start'
					,fieldLAbel: 'Start'
					,hidden : true
				}
			]
		}
		,{
			xtype: 'grid'
			,reference: 'gridSprint'
			,forceFit: true
			,pugins : {
				ptype : 'rowediting'
				,clicksToEdit: 2
				,puglinId : 'rowediting'
			}
			,bind:{store: '{sprints}'}
			,columns: [
				{header:'#', dataIndex:'id'}
				,{header:'Description',dataIndex:'description'
                    ,editor:{
                        xtype : 'textfield'
                        ,allowBlank :false
                    }
                }
                ,{header:'US',dataIndex:'us'
                    ,editor:{
                        xtype : 'textfield'
                        ,allowBlank :false
                    }
                }
                ,{header:'Time',dataIndex:'time'
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
