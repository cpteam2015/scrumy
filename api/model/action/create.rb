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
			newUS = {
				id: us['id'],
				description: us['description'],
				cost: us['cost'],
				priority: us['priority'],
				req: us['req']
			}
			project['backlog'].push newUS
			c.replace(project)
			[]
		end
		
		def createTask(us_id, task)
			c = @@project_connector
			us = c.find us_id
			newTask = {
				id: task['id'],
				description: task['description'],
				us: task['us'],
				time: task['time'],
				required: task['required']
			}
			us['task'].push newTask
			c.replace(us)
			[]
		end
	end
end
