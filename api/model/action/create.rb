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
		def createEmptyProject()
			c = @@project_connector
			newP = {
				name: 'Test',
				members: ['netty','psow'],
				description: 'blaaaa blaaa',
				backlog: [],
				sprints: []
			}
			pp c.insert(newP)
		end
	end
end