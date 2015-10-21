################################################
# Context 		: Université Bordeaux (M2 GL)
#
# Author		: @nureynisow
#
# Licence		:
#
# Description 	: HTTP PUT operations 
#
################################################

class APP < Sinatra::Base
	put '/project' do
		@@model.addProject params
	end
end