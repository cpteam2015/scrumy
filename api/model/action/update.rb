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
		put '/mockups/backlog/:id' do |id|
		    pp "Put backlog #{id}"
		    pp request.body.read
		    halt 200
  		end

  		put '/projects' do
		    content_type :json
		    connector = settings.project_connector
		    doc = JSON.parse(request.body.read)
		    halt 200, connector.replace(doc).to_json
  		end
	end
end