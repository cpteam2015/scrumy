################################################
# Context 		: Université Bordeaux (M2 GL)
#
# Author		: @nureynisow
#
# Licence		:
#
# Description 	: HTTP GET operations 
#
################################################

module Scrumy
	class APP < Sinatra::Base
		get '/project' do
			@@model.getProject
		end
	end
end