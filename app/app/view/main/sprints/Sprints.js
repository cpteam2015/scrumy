Ext.define('Scrumy.view.main.sprints.Sprints', {
    extend: 'Ext.panel.Panel'
    ,requires : ['Scrumy.view.main.sprints.SprintModel']
    ,controller : 'sprints'
    ,title: 'Sprints'
    ,alias: 'widget.sprints'
    ,viewModel : {type: 'sprints'}
    ,layou : 'border'
    ,items :[
		{
			xtype: 'panel'
			,tbar : [
				{
					text : 'Add a task'
					,reference : 'addTask'
				}
				,{
					text : 'Delete a task'
					,reference : 'delTask'
				}
			]
			,items : [
				{
					xtype: 'form'
					,defaultType : 'textfield'
					,items : [
						{				
							allowBlank: true,			
							fieldLabel: 'ID_Sprint: ',
							reference:'IdSprint',
							emptyText:'#id_Sprint',
							disabled: true

						}
						,{				
							xtype : 'datefield',				
							fieldLabel: 'Start: ',
							reference:'IdTime',
							emptyText:'Month/Day/Year',
							disabled: true

						}
					]
				}
			]
		}

		,{
			xtype: 'grid'
			,reference: 'gridSprint'
			,forceFit: true
			,plugins : {
				ptype : 'rowediting'
				,clicksToEdit: 2
				,pluginId : 'rowediting'
			}
			//~ ,bind:{store: '{sprints}'}
			,store : []
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
                        xtype : 'combobox'
                        ,allowBlank :false
                        ,queryMode : 'local'
                        //~ ,store : {type:'us'}
                        ,displayField : 'value'
                        ,valueField : 'value'
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
