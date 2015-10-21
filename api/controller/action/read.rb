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


class APP < Sinatra::Base
	get '/project' do
		"hello"
	end
	get '/' do
		"hello"
	end

end
