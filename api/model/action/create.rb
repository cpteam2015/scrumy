################################################
# Context 		: Université Bordeaux (M2 GL)
#
# Author		: @nureynisow
#
# Licence		:
#
# Description 	: All methods to create data
#
################################################

module Scrumy
	class Model
		def createEmptyProject(p)
			c = @@project_connector
			newP = {
				name: p['name'],
				members: p['members'],
				description: p['description'],
				git_repo: p['git_repo'],
				backlog: [],
				sprints: []
			}
			pp newP
			c.insert(newP)
			[]
		end
		def createUS(project_id, us)
			c = @@project_connector
			project = c.find project_id
			if project['backlog'].length <= 0
				id = 1
			else	
				id = project['backlog'][project['backlog'].length-1]['id'] + 1
			end
			newUS = {
				id: id,
				description: us['description'],
				cost: us['cost'],
				priority: us['priority'],
				req: us['required']
			}
			project['backlog'].push newUS
			c.replace(project)
			[]
		end
		
		def createTask(p,s, task)
			c = @@project_connector
			p = c.find p
			newTask = {
				id: task['id'],
				description: task['description'],
				us: task['us'],
				time: task['time'],
				required: task['required']
			}
			for s in p['sprints']
				if s['id'] = s
					s['tasks'].push newTask
				end
			end
			c.replace(p)
			[]
		end
	end
end
