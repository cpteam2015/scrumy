################################################
# Context 		: Université Bordeaux (M2 GL)
#
# Author		: @nureynisow
#
# Licence		:
#
# Description 	: All methods to read data
#
################################################

module Scrumy
	class Model
		def getAllProjects()
			connector = @@project_connector
    		r = connector.find_all
    		pp r
    		r
		end
		def getProject(id)
			connector = @@project_connector
    		r = connector.find(id)
    		r
		end
		def getProjectSp(p_id)
			connector = @@project_connector
    		r = connector.find(p_id)
    		r['sprints']
		end
		def getTasks(p_id,sp_id)
			connector = @@project_connector
    		r = connector.find(p_id)
    		for sp in r['sprints'] 
    			pp sp,sp_id
    			if sp['id'] === sp_id
                    pp "eq"
    				return sp['tasks']
    			end
    		end
    		return []
		end
        def getPert(p_id,sp_id)
            connector = @@project_connector
            r = connector.find(p_id)
            for sp in r['sprints'] 
                pp sp,sp_id
                if sp['id'] === sp_id.to_i
                    return computePert(sp['task'])
                end
            end
            return []
        end

	end
end