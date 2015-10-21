################################################
# Context 		: Université Bordeaux (M2 GL)
#
# Author		: @nureynisow
#
# Licence		:
#
# Description 	: HTTP POST operations 
#
################################################

module Scrumy
	class APP < Sinatra::Base
		post '/project' do
			@@model.addProject params
		end

	end
end