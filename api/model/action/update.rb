################################################
# Context 		: Université Bordeaux (M2 GL)
#
# Author		: @nureynisow
#
# Licence		:
#
# Description 	: All methods to modify data
#
################################################

module Scrumy
	class Model
		def updateProject(id,p)
			c = @@project_connector
			project = c.find id
			project['name'] = p['name']
			project['members'] = p['members']
			project['description'] = p['description']
			project['git_repo'] = p['git_repo']
			pp c.replace(project)
			[]
		end
		def updateUS(p_id,us)
			c = @@project_connector
			project = c.find p_id
			bl = project['backlog']
			for u in bl
				if(us['id']==u['id'])
					u.merge!(us)
					break
				end
			end
			project['backlog'] = bl
			pp c.replace(project)
			[]
		end

	end
end