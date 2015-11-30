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
		def deleteTask(sp,p,task)
			c = @@project_connector
			project = c.find p
			sprints = project['sprints']
			for s in sprints
				if s['id'].eql? sp
					for t in s['tasks']
						if t['id'].eql? task
							s['tasks'].delete(t)
							break
						end
					end
				end
			end
			# pp project
			# project['sprints'].collect! {|s|
			# 	if s['id'].eql? sp
			# 		s['tasks'].collect!{ |t|
			# 			if t['id'].eql? task
			# 				s['tasks'].delete(t)
			# 				pp project
			# 				break
			# 			end
						
			# 		}
			# 	end
			# }

			pp project
			c.replace(project)
			[]
		end
	end
end