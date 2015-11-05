################################################
# Context 		: Université Bordeaux (M2 GL)
#
# Author		: @nureynisow
#
# Licence		:
#
# Description 	: All methods to delete data
#
################################################

module Scrumy
	class Model
		def deleteUS(p_id,us_id)
			pp us_id
			c = @@project_connector
			project = c.find p_id
			bl = project['backlog']
			for u in bl
				if(us_id == u['id'])
					pp u
					bl.delete(u)
					break
				end
			end
			project['backlog'] = bl
			pp c.replace(project)
			[]
		end
	end
end