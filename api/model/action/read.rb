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
	end
end