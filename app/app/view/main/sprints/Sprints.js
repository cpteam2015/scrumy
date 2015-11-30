Ext.define('Scrumy.view.main.sprints.Sprints', {
    extend: 'Ext.panel.Panel'
    ,requires : ['Scrumy.view.main.sprints.SprintsModel']
    ,controller : 'sprints'
    ,title: 'Sprints Tab'
    ,alias: 'widget.sprints'
    ,viewModel : {type: 'sprints'}
    ,items :[
		{
			xtype: 'panel'
			,tbar : [
				{
					xtype : 'combobox'
					,reference : 'comboSp'
		    		,editable : false
		    		,fieldLabel: 'Choose a sprint'
		    		,name:'id'
		    		,displayField: 'id'
		    		,valueField: 'id'
		    		,bind:{
		    			store: '{sprints}'
		    		}
				}
				,{
					xtype : 'button'
					,text : 'Create a sprint'
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
						,{
							text : 'Add a task'
							,reference : 'addTask'
							,xtype : 'button'
						}
						,{
							text : 'Delete a task'
							,reference : 'delTask'
							,xtype : 'button'
						}
						,{
							text : 'Show Kanban'
							,reference : ''
							,xtype : 'button'
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
				,pluginId : 'rowediting2'
			}
			,bind:{store: '{tasks}'}
			,columns: [
				{header:'Code', dataIndex:'id',editor:{
                        xtype : 'textfield'
                        ,allowBlank :false
                    }
                }
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
